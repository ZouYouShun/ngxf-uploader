import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCardModule,
  MdProgressBarModule,
  MdGridListModule,
  MdToolbarModule,
  MdIconModule,
  MdSidenavModule,
  MdSliderModule,
  MdRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdProgressBarModule,
    MdGridListModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdSliderModule,
    MdRadioModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdProgressBarModule,
    MdGridListModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdSliderModule,
    MdRadioModule
  ],
})
export class MyMaterialModuleModule { }
