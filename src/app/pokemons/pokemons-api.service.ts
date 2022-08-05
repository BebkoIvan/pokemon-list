import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from './models';
import { PokemonsMockStorageService } from './pokemons-mock-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonsApiService {

  constructor(private http: HttpClient, private pokemonsStorage: PokemonsMockStorageService) { }

  getPokemons(limit: number, offset: number): Observable<{count: number, pokemons: Pokemon[]}> {
    return this.http.get<{next: string, count: number, previous: string, results: {name: string, url: string}[]}>(`${environment.apiUrl}pokemon`, {params: {limit, offset}}).pipe(
      switchMap(res => {
        return forkJoin(res.results.map(el => this.getPokemon((el.url.match(/(?<=pokemon\/).*?(?=\/)/g) || ['0'])[0]))).pipe(
          map((pokemons) => ({count: res.count, pokemons}))
        )
      }),
      map((res) => {
        const favorites = this.pokemonsStorage.getFavorites();
        res.pokemons.forEach(el => {
          if (favorites.includes(String(el.id))) el.favorite = true;
        });
        return res;
      })
    );
  }

  getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.apiUrl}pokemon/${id}`);
  }
}
