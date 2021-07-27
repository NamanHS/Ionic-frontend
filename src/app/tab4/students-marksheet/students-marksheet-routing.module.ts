import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsMarksheetPage } from './students-marksheet.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsMarksheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsMarksheetPageRoutingModule {}
