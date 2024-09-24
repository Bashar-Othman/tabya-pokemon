import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonResponse } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }
}