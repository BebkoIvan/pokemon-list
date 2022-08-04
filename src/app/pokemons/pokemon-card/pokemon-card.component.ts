import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../models';
import { PokemonsMockStorageService } from '../pokemons-mock-storage.service';

@Component({
  selector: 'pkm-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input()
  pokemon!: Pokemon;

  constructor(private pokemonsStorage: PokemonsMockStorageService) { }

  ngOnInit(): void {
  }

  toggleFavorite(pokemon: Pokemon) {
    pokemon.favorite = !pokemon.favorite; 
  }

}
