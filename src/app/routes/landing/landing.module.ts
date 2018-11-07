import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { PagePrivateComponent } from './page-private/page-private.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule
  ],
  declarations: [
    LandingComponent,
    PagePrivateComponent
  ]
})
export class LandingModule { }
