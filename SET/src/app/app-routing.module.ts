import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { QCreateComponent } from './q-create/q-create.component';
import { StartComponent } from './start/start.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CustomizeComponent } from './customize/customize.component';
import { ResultsComponent } from './results/results.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { NewQueryCreateComponent } from './new-query-create/new-query-create.component';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'queryCreate', component: QCreateComponent},
  {path: 'start', component: StartComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: 'searchResults', component: SearchResultsComponent},
  {path: 'customize', component: CustomizeComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'gameMenu', component: GameMenuComponent},
  {path: 'queryCraft', component: NewQueryCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
