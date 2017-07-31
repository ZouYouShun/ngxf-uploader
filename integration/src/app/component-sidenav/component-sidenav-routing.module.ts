import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentSidenavComponent } from './component-sidenav.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ComponentSidenavComponent,
    children: [
      {
        path: '',
        loadChildren: './page-container/page-container.module#PageContainerModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentSidenavRoutingModule { }
