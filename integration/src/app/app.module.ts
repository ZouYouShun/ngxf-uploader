import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgxfUploaderModule } from 'ngxf-uploader';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxfUploaderModule.forRoot(),
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
