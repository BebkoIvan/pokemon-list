import { Component, OnInit } from '@angular/core';
import { PokemonsApiService } from '../pokemons-api.service';

@Component({
  selector: 'pkm-pokemons-page',
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.scss']
})
export class PokemonsPageComponent implements OnInit {

  pokemons$ = this.pokemonApiS.getPokemons(10, 0);

  constructor(private pokemonApiS: PokemonsApiService) { }

  ngOnInit(): void {
  }

}
