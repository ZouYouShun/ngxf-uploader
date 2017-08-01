import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentSidenavComponent } from './component-sidenav.component';
import { GuideContainerComponent } from './guide-container/guide-container.component';

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
  },
  {
    path: 'guides',
    component: GuideContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentSidenavRoutingModule { }
