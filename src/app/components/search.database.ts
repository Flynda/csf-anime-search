import { Injectable } from "@angular/core";
import Dexie from 'dexie';
import { Genre, SearchOption } from './models';

export const normalizedSearchText = (q: string) => q.trim().toLowerCase()

@Injectable()
export class SearchDatabase extends Dexie {
    private searchOption: Dexie.Table<SearchOption, number>
    constructor() {
        super('searchdb')
        // create schema
        this.version(1).stores({
            searchOption: '++id,q'
        })
        this.searchOption = this.table('searchOption')
    }

    async saveSearchOption(s: SearchOption): Promise<any> {
        const gen = s.genre == Genre.Anime? 0 : 1
        s.q = normalizedSearchText(s.q)
        // select count(*) from searchOption where q = 'abc' and genre = 'anime'
        const resultCount = await this.searchOption
            .where('q').equals(s.q)
            .and(doc => doc.genre == gen)
            .count()
        if (resultCount <= 0)
            return this.searchOption.add(s)
    }

    getSearchOption(): Promise<SearchOption[]> {
        return this.searchOption.toArray()
    }

    getSearch(id: number): Promise<SearchOption> {
        return this.searchOption.get(id)
    }

    deleteSearch(id: number): Promise<any> {
        return this.searchOption
            .where('id').equals(id)
            .delete()
    }
}
