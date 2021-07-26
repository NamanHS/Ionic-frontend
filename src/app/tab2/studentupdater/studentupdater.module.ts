import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentupdaterPageRoutingModule } from './studentupdater-routing.module';

import { StudentupdaterPage } from './studentupdater.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudentupdaterPageRoutingModule
  ],
  declarations: [StudentupdaterPage]
})
export class StudentupdaterPageModule {}
