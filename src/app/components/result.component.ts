import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBService } from "../db.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  q: string = ''
  genre = ''
  searchResults = []


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dbSvc: DBService) { }

  ngOnInit(): void {
    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']
    this.dbSvc.getData(this.q, this.genre)
      .then(result => {
        this.searchResults = result
        console.info(this.searchResults)
      })
  }

  gotoList() {
    this.router.navigate(['/search-list'])
  }

}
