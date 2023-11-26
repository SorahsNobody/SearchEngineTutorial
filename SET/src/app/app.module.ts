import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QCreateComponent } from './q-create/q-create.component';
import { StartComponent } from './start/start.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CustomizeComponent } from './customize/customize.component';
import { ResultsComponent } from './results/results.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { NewQueryCreateComponent } from './new-query-create/new-query-create.component';
import { SearchQuerySuggestionComponent } from './search-query-suggestion/search-query-suggestion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    QCreateComponent,
    StartComponent,
    InstructionsComponent,
    SearchResultsComponent,
    CustomizeComponent,
    ResultsComponent,
    GameMenuComponent,
    NewQueryCreateComponent,
    SearchQuerySuggestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
