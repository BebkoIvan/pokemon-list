import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Pokemon } from '../models';
import { PokemonsApiService } from '../pokemons-api.service';
import { PokemonsMockStorageService } from '../pokemons-mock-storage.service';

@Component({
  selector: 'pkm-pokemons-favorites-page',
  templateUrl: './pokemons-favorites-page.component.html',
  styleUrls: ['./pokemons-favorites-page.component.scss']
})
export class PokemonsFavoritesPageComponent implements OnInit {

  pokemons!: Pokemon[]; 

  constructor(private pokemonApiS: PokemonsApiService, private pokemonsStorage: PokemonsMockStorageService) { }

  ngOnInit(): void {
    const favorites = this.pokemonsStorage.getFavorites();
    forkJoin(favorites.map(el => this.pokemonApiS.getPokemon(el))).pipe(
      map((res) => {
        res.forEach(el => {
          if (favorites.includes(String(el.id))) el.favorite = true;
        });
        return res;
      })
    ).subscribe((res) => this.pokemons = res);
  }

  removeFromFavorite(id: number) {
    this.pokemons = this.pokemons.filter(el => el.id !== id);
  }


}
