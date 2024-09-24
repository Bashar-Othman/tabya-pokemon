import { bootstrapApplication } from '@angular/platform-browser';
import { PokemonListComponent } from './app/pokemon-list/pokemon-list.component';

bootstrapApplication(PokemonListComponent)
  .catch(err => console.error(err));
