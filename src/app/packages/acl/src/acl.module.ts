import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppACLConfig } from './acl.config';
import { ACLGuard } from './acl-guard';
import { ACLService } from './acl.service';
import { ACLDirective } from './acl.directive';

const SERVICES = [ACLService, ACLGuard];
const COMPONENTS = [ACLDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AppACLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppACLModule,
      providers: [AppACLConfig, ...SERVICES],
    };
  }
}
