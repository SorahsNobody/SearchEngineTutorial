import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from "@angular/cdk/overlay";
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
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
import { QueryWordComponent } from './query-word/query-word.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { PlayerAvatarComponent } from './player-avatar/player-avatar.component';
import { HeaderComponent } from './header/header.component';

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
    SearchQuerySuggestionComponent,
    QueryWordComponent,
    PlayerStatsComponent,
    PlayerAvatarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
