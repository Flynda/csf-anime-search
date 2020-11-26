export enum Genre {
    Anime, Manga
}

export interface SearchOption {
    id?: number;
    q: string;
    genre: Genre;
}

export interface SearchResult {
    title: string;
    image: string;
    synopsis: string;
    url: string;
    type: string;
    chapters: string
    volumes: string
    episodes: string
    rated: string
}

// id? means id is optional 
// id will be auto incremented by db