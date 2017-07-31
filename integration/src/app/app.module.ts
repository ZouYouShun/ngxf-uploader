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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyMaterialModuleModule } from './shared/my-material-module.module';
import { NgxfUploaderModule } from 'ngxf-uploader';

import { AppRoutingModule } from './app-routing.module';
import { ComponentSidenavModule } from './component-sidenav/component-sidenav.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubLinkComponent } from './navbar/github-link/github-link.component';
import { SharedModule } from './shared/shared.module';
import { AlertConfirmModule } from './shared/components/alert-confirm/alert-confirm.module';


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
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxfUploaderModule.forRoot(),

    AppRoutingModule,

    MyMaterialModuleModule,
    ComponentSidenavModule,
    AlertConfirmModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
