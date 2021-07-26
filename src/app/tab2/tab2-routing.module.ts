import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page
  },
  {
    path: 'studentdetails/:id',
    loadChildren: () => import('./student-details/student-details.module').then( m => m.StudentDetailsPageModule)
  },
  {
    path: 'studentupdater/:id',
    loadChildren: () => import('./studentupdater/studentupdater.module').then( m => m.StudentupdaterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
