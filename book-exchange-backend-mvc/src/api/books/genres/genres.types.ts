export interface Genre {
    id: number;
    name: string;
  }
  
  export interface CreateGenreRequest {
    name: string;
  }
  
  export interface UpdateGenreRequest {
    name?: string;
  }
  
  export interface GenreResponse {
    id: number;
    name: string;
  }
  