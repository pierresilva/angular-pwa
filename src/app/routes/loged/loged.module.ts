import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogedRoutingModule } from './loged-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LogedComponent } from './loged.component';
import { NologedComponent } from './nologed/nologed.component';
import { AclPermissionComponent } from './acl-permission/acl-permission.component';
import { AclRoleComponent } from './acl-role/acl-role.component';

@NgModule({
  imports: [
    CommonModule,
    LogedRoutingModule,
    SharedModule,
  ],
  declarations: [
    LogedComponent,
    NologedComponent,
    AclPermissionComponent,
    AclRoleComponent,
  ]
})
export class LogedModule { }
