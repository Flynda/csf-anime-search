export enum Genre {
    Anime, Manga
}

export interface SearchOption {
    id?: number;
    q: string;
    genre: Genre;
}

// id? means id is optional 
// id will be auto incremented by db