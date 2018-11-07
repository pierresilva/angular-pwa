import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordCreateComponent } from './password-create/password-create.component';
import { SignupActivateComponent } from './signup-activate/signup-activate.component';
import { SignupActivateResendComponent } from './signup-activate-resend/signup-activate-resend.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    PasswordCreateComponent,
    SignupActivateComponent,
    SignupActivateResendComponent
  ]
})
export class AuthModule { }
