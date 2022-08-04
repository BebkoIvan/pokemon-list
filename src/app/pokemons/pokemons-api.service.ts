import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from './models';

@Injectable({
  providedIn: 'root'
})
export class PokemonsApiService {

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset: number): Observable<Pokemon[]> {
    return this.http.get<{next: string, count: number, previous: string, results: {name: string, url: string}[]}>(`${environment.apiUrl}pokemon`, {params: {limit, offset}}).pipe(
      switchMap(res => {
        return forkJoin(res.results.map(el => this.getPokemon((el.url.match(/(?<=pokemon\/).*?(?=\/)/g) || ['0'])[0])))
      })
    );
  }

  getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.apiUrl}pokemon/${id}`);
  }
}
