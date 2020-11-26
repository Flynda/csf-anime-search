import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

// start lottie animation
import { LottieModule } from "ngx-lottie";
import player from 'lottie-web';

export function playerFactory() {
  return player
}
// end lottie animation

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { SearchListComponent } from './components/search-list.component';
import { SearchComponent } from './components/search.component';
import { ResultComponent } from './components/result.component';
import { SearchDatabase } from './components/search.database';
import { DBService } from './db.service';

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'search-list', component: SearchListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:genre/:q', component: ResultComponent }, 
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchListComponent,
    SearchComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ 
    SearchDatabase,
    DBService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
