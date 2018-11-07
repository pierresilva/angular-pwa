import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupActivateComponent } from './signup-activate/signup-activate.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordCreateComponent } from './password-create/password-create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Ingresar'
        }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Registrarse'
        }
      },
      {
        path: 'signup-activate/:token',
        component: SignupActivateComponent,
        data: {
          title: 'Verificar cuenta'
        }
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent,
        data: {
          title: 'Reestablecer clave'
        }
      },
      {
        path: 'password-create/:token',
        component: PasswordCreateComponent,
        data: {
          title: 'Establecer clave'
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
