import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCardModule,
  MdProgressBarModule,
  MdGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdProgressBarModule,
    MdGridListModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdProgressBarModule,
    MdGridListModule
  ],
})
export class MyMaterialModuleModule { }
