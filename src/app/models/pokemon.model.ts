export interface Result {
    name: string;
    url: string;
  }
  
  export interface PokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: Result[];
  }
  