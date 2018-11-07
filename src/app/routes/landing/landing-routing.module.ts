import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { PagePrivateComponent } from './page-private/page-private.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingComponent,
        data: { title: 'Inicio' }
      },
      {
        path: 'page-private',
        component: PagePrivateComponent,
        data: {
          title: 'Página privada',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
