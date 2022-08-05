import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() withStats = false;

  @Output()
  pokemonLikeToggle: EventEmitter<number> = new EventEmitter();

  constructor(private pokemonsStorage: PokemonsMockStorageService) { }

  ngOnInit(): void {
  }

  toggleFavorite(event: Event , pokemon: Pokemon) {
    event.stopPropagation();
    pokemon.favorite = !pokemon.favorite; 
    this.pokemonsStorage.toggleFavorite(String(pokemon.id));
    this.pokemonLikeToggle.emit(pokemon.id);
  }

}
