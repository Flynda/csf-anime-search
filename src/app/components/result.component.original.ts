import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { DBService } from "../db.service";
import { SearchResult } from './models';

@Component({
  selector: 'app-result-original',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponentOriginal implements OnInit {

  q: string = ''
  genre = ''
  searchResults = []
  canShare = false
  shareResults = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private dbSvc: DBService, private webShare: NgNavigatorShareService) { }

  ngOnInit(): void {
    this.canShare = this.webShare.canShare()
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
    this.dbSvc.getData(this.q, this.genre)
      .then(result => {
        this.searchResults = result
        console.info(this.searchResults)
        this.shareResults = result.map(r => {
          return {
            image: r['image_url'],
            title: r['title'],
            synopsis: r['synopsis']
          } as SearchResult
        })
      })
  }

  gotoList() {
    this.router.navigate(['/search-list'])
  }

  shareThis(idx: number) {
    const r = this.shareResults[idx]
    this.webShare.share({
      title: r.title,
      text: r.synopsis,
      url: r.image
    })
    .catch(e => console.error('WebShare: ', e))
  }
}
