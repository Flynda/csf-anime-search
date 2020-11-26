import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre, SearchOption } from './models';
import { SearchDatabase, normalizedSearchText } from './search.database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genre = 'anime'
  search: FormGroup

  constructor(private router: Router, private fb: FormBuilder, private searchdb: SearchDatabase) { }

  ngOnInit(): void {
    this.search = this.fb.group({
      q: this.fb.control('', [Validators.required])
    })
  }

  setGenre(g: string){
    this.genre = g
  }

  gotoList() {
    this.router.navigate(['/search-list'])
  }
  
  gotoResult() {
    const normQ = normalizedSearchText(this.search.get('q').value)
    this.router.navigate(['/search', this.genre, normQ])
  }

  async saveSearch() {
    const searchItem: SearchOption = {
      q: this.search.get('q').value,
      genre: this.genre == 'anime'? Genre.Anime : Genre.Manga
    }
    await this.searchdb.saveSearchOption(searchItem)
    this.gotoResult()
  }
}
