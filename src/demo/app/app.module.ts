import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

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
