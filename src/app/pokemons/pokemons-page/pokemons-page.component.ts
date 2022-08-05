import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Pokemon } from '../models';
import { PokemonsApiService } from '../pokemons-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'pkm-pokemons-page',
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.scss']
})
export class PokemonsPageComponent implements OnInit {

  pokemons$!: Observable<Pokemon[]>;
  isLoading = false;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(
     private pokemonApiS: PokemonsApiService,
     private route: ActivatedRoute,
     private router: Router
    ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (params['page'] && params['per']) {
        this.isLoading = true;
        this.fetchPokemons(params['per'], params['page'])
      }
    });

    const currentQueryParams = this.route.snapshot.queryParams;
    
    if (!currentQueryParams['page'] || !currentQueryParams['per']) {
      this.router.navigate([''], {
        queryParams: {
          page: currentQueryParams['page'] || 0,
          per: currentQueryParams['per'] || 10
        },
        queryParamsHandling: 'merge'
      });
    }

  }

  refresh() {
    this.fetchPokemons(this.pageSize, this.pageIndex);
  }

  fetchPokemons(per: number, page: number) {
    this.pokemons$ = this.pokemonApiS.getPokemons(per, page * per).pipe(
      catchError(() => of({count: this.length, pokemons: []})),
      tap((res) => {
        this.length = res.count;
        this.pageIndex = page;
        this.pageSize = per;
        this.isLoading = false;
      }),
      map((res) => res.pokemons)
    );
  }

  handlePageEvent(event: PageEvent) {
    this.router.navigate([''], {
      queryParams: {
        page: event.pageIndex,
        per: event.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }

}
