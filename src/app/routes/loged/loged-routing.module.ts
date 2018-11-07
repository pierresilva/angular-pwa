import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogedComponent } from './loged.component';
import { JWTGuard } from '../../packages/auth';
import { NologedComponent } from './nologed/nologed.component';
import { AclRoleComponent } from './acl-role/acl-role.component';
import { AclPermissionComponent } from './acl-permission/acl-permission.component';
import { ACLGuard } from '../../packages/acl';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LogedComponent,
        canActivate: [JWTGuard],
        data: {
          title: 'Debe estar logeado'
        }
      },
      {
        path: 'nologed',
        component: NologedComponent,
        data: {
          title: 'No debe estar logeado'
        }
      },
      {
        path: 'acl-role',
        component: AclRoleComponent,
        canActivate: [ ACLGuard ],
        data: {
          title: 'Debe tener rol',
          guard: {role: ['admin']}
        }
      },
      {
        path: 'acl-permission',
        component: AclPermissionComponent,
        canActivate: [ ACLGuard ],
        data: {
          title: 'Debe tener permiso',
          guard: {ability: ['admin.default']}
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogedRoutingModule { }
