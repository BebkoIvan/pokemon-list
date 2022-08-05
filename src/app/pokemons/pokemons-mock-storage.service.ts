import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonsMockStorageService {

  storageKey = 'favorites_pokemons';

  constructor() { }

  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(id: string) {
    const favoritesListFromStorage = localStorage.getItem(this.storageKey);
    let favoritesList = [];
    if (favoritesListFromStorage) {
      favoritesList = JSON.parse(favoritesListFromStorage);
    }
    if (!favoritesList?.includes(id)) {
      localStorage.setItem(this.storageKey, JSON.stringify(favoritesList.concat(id)));
    } 
    else localStorage.setItem(this.storageKey, JSON.stringify(favoritesList.filter((el:string) => el !== id)));
  }

}
