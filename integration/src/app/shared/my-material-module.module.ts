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
  MdRadioModule,
  MdInputModule,
  MdDialogModule
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
    MdRadioModule,
    MdInputModule,
    MdDialogModule
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
    MdRadioModule,
    MdInputModule,
    MdDialogModule
  ],
})
export class MyMaterialModuleModule { }
