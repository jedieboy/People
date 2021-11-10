import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
import { ListPersonComponent } from './list-person/list-person.component';

const routes: Routes = [
  //  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: '',
    component: AddPersonComponent,
  },
  {
    path: 'add',
    component: AddPersonComponent,
  },
  {
    path: 'list',
    component: ListPersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
