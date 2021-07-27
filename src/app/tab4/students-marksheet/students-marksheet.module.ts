import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsMarksheetPageRoutingModule } from './students-marksheet-routing.module';

import { StudentsMarksheetPage } from './students-marksheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsMarksheetPageRoutingModule
  ],
  declarations: [StudentsMarksheetPage]
})
export class StudentsMarksheetPageModule {}
