import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { PagePrivateComponent } from './page-private/page-private.component';
import { JWTGuard } from 'src/app/packages/auth';
import { ACLGuard } from 'src/app/packages/acl';

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
        canActivate: [ACLGuard],
        data: {
          title: 'Página privada',
          guard: {role: ['user']}
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
