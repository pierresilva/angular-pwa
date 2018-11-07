import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefaultComponent } from '../layouts/layout-default/layout-default.component';
import { LayoutFullscreenComponent } from '../layouts/layout-fullscreen/layout-fullscreen.component';

const routes: Routes = [
  // Landing
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: '',
        loadChildren: './landing/landing.module#LandingModule'
      }
    ]
  },
  // Auth
  {
    path: 'auth',
    component: LayoutFullscreenComponent,
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  },
  // Loged
  {
    path: 'loged',
    component: LayoutFullscreenComponent,
    children: [
      {
        path: '',
        loadChildren: './loged/loged.module#LogedModule'
      }
    ]
  },
  // No path found
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
