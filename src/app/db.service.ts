import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class DBService {
    constructor(private http: HttpClient) {}

    async getData(q: string, type: string){
        return await this.http.get<any>(`http://localhost:3000/${type}/${q}`)
            .toPromise()
    }
}