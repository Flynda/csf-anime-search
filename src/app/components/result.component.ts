import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { SearchResult } from './models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  q: string = ''
  genre = ''
  searchResults: SearchResult[] = []
  canShare = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private webShare: NgNavigatorShareService) { }

  ngOnInit(): void {
    this.canShare = this.webShare.canShare()
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']

    const url = `https://api.jikan.moe/v3/search/${this.genre}`
    let params = (new HttpParams()).set('q', this.q)
    this.http.get<any>(url, {params: params})
      .toPromise()
      .then(resp => {
        const results = resp['results'] as any[]
        this.searchResults = results.map(r => {
          return {
            image: r['image_url'],
            title: r['title'],
            synopsis: r['synopsis'],
            url: r['url'],
            type: r['type'],
            chapters: (r['chapters'] || 'Unknown'),
            volumes: (r['volumes'] || 'Unknown'),
            episodes: (r['episodes'] || 'Unknown'),
            rated: (r['rated'] || 'Unknown')
          } as SearchResult
        })
        console.info(this.searchResults)
      })
  }

  gotoList() {
    this.router.navigate(['/search-list'])
  }

  shareThis(idx: number) {
    const r = this.searchResults[idx]
    this.webShare.share({
      title: r.title,
      text: r.synopsis,
      url: r.image
    })
    .catch(e => console.error('Webshare: ', e))
  }

}
