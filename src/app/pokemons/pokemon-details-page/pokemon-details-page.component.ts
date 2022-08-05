import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models';
import { PokemonsApiService } from '../pokemons-api.service';
import { PokemonsMockStorageService } from '../pokemons-mock-storage.service';

@Component({
  selector: 'pkm-pokemon-details-page',
  templateUrl: './pokemon-details-page.component.html',
  styleUrls: ['./pokemon-details-page.component.scss']
})
export class PokemonDetailsPageComponent  {

  pokemon$: Observable<Pokemon> = this.pokemonApiS.getPokemon(this.route.snapshot.params['id']).pipe(
    map((pok) => {
      if (this.pokemonsStorage.getFavorites().includes(String(pok.id))) {
        pok.favorite = true;
      }
      return pok
    })
  );

  constructor(
    private pokemonApiS: PokemonsApiService,
    private route: ActivatedRoute,
    private pokemonsStorage: PokemonsMockStorageService) { }

}
