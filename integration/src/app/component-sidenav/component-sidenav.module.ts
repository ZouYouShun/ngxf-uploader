import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentSidenavRoutingModule } from './component-sidenav-routing.module';
import { ComponentSidenavComponent } from './component-sidenav.component';
import { PageContainerModule } from './page-container/page-container.module';

import { MenuListComponent } from './menu-list/menu-list.component';
import { MyMaterialModuleModule } from '../shared/my-material-module.module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModuleModule,
    ComponentSidenavRoutingModule,
    PageContainerModule
  ],
  declarations: [
    ComponentSidenavComponent,

    MenuListComponent
  ]
})
export class ComponentSidenavModule { }
