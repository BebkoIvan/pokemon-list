import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonsPageComponent } from './pokemons-page/pokemons-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsApiService } from './pokemons-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: PokemonsPageComponent}
];

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonsPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [PokemonsApiService]
})
export class PokemonsModule { }
