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
import { PokemonDetailsPageComponent } from './pokemon-details-page/pokemon-details-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonsFavoritesPageComponent } from './pokenons-favorites-page/pokemons-favorites-page.component';

const routes: Routes = [
  { path: '', component: PokemonsPageComponent },
  { path: 'details/:id', component: PokemonDetailsPageComponent},
  { path: 'favorites', component: PokemonsFavoritesPageComponent}
];

@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonsPageComponent,
    PokemonDetailsPageComponent,
    PokemonsFavoritesPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [PokemonsApiService]
})
export class PokemonsModule { }
