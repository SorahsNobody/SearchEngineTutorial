import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { QCreateComponent } from './q-create/q-create.component';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'queryCreate', component: QCreateComponent}
  //{path: 'start', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
