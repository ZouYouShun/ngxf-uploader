import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentSidenavComponent } from './component-sidenav/component-sidenav.component';
import { PageContainerComponent } from './component-sidenav/page-container/page-container.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './component-sidenav/component-sidenav.module#ComponentSidenavModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
