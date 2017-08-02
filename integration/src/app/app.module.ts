import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounceTime';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromEvent';
import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxfUploaderModule } from 'ngxf-uploader';
import { MarkdownModule } from 'angular2-markdown';

import { AppRoutingModule } from './app-routing.module';
import { ComponentSidenavModule } from './component-sidenav/component-sidenav.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubLinkComponent } from './navbar/github-link/github-link.component';
import { NavbarService } from './navbar/navbar.service';

import { SharedModule } from '@shared/shared.module';
import { MyMaterialModuleModule } from '@shared/my-material-module.module';
import { AlertConfirmModule } from '@shared/components/alert-confirm/alert-confirm.module';

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
    MarkdownModule.forRoot(),
    SharedModule.forRoot(),
    AlertConfirmModule.forRoot(),
    MyMaterialModuleModule,

    AppRoutingModule,
    ComponentSidenavModule,
  ],
  providers: [NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
