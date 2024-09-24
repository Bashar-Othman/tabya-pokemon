import { Component, OnInit } from '@angular/core';
 import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Result, PokemonResponse } from '../models/pokemon.model';
import { PokemonService } from './pokemon.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Import necessary modules here
  standalone:true
})
export class PokemonListComponent implements OnInit {
  pokemonData: Result[] = [];
  filteredPokemon: Result[] = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 20;
  next: string = '';
  previous: string = '';

  searchControl = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPokemon();

    // Search functionality
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms pause in typing
      distinctUntilChanged() // Avoid duplicate searches
    ).subscribe(searchTerm => {
      this.filterPokemon(searchTerm);
    });
  }

  // Fetch Pokémon list
  fetchPokemon(offset: number = 0) {
    this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.limit}`)
      .subscribe((response: PokemonResponse) => {
        this.pokemonData = response.results;
        this.filteredPokemon = response.results;
        this.count = response.count;
        this.next = response.next;
        this.previous = response.previous;
      });
  }

  // Filter Pokémon based on search
  filterPokemon(searchTerm: string| null) {
    if (!searchTerm) {
      this.filteredPokemon = [...this.pokemonData];
    } else {
      this.filteredPokemon = this.pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  // Pagination controls
  nextPage() {
    if (this.next) {
      this.offset += this.limit;
      this.fetchPokemon(this.offset);
    }
  }

  previousPage() {
    if (this.previous) {
      this.offset -= this.limit;
      this.fetchPokemon(this.offset);
    }
  }
}