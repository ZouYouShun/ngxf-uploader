import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MyMaterialModuleModule } from './shared/my-material-module.module';
import { NgxfUploaderModule } from 'ngxf-uploader';

import { AppRoutingModule } from './app-routing.module';
import { ComponentSidenavModule } from './component-sidenav/component-sidenav.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubLinkComponent } from './navbar/github-link/github-link.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GithubLinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,

    AppRoutingModule,
    NgxfUploaderModule.forRoot(),
    MyMaterialModuleModule,

    ComponentSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
