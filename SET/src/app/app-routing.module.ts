import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { QCreateComponent } from './q-create/q-create.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'queryCreate', component: QCreateComponent},
  {path: 'start', component: StartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
