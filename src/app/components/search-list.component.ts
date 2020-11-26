import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchOption } from './models';
import { SearchDatabase } from './search.database';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  searches: SearchOption[] = []

  constructor(private router: Router, private searchDB: SearchDatabase) { }

  ngOnInit(): void {
    this.searchDB.getSearchOption()
      .then(result => {
        this.searches = result.map(s => {
          // @ts-ignore
          s.genre = s.genre == 0? 'anime' : 'manga'
          return s
        })
      })
  }

  gotoHome() {
    this.router.navigate(['/'])
  }

  gotoSearch() {
    this.router.navigate(['/search'])
  }
}
