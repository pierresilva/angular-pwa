import { Injectable, Inject, Injector } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '../interface';
import { JWTTokenModel } from './jwt.model';
import { AppAuthConfig } from '../../auth.config';
import { CheckJwt, ToLogin } from '../helper';

@Injectable()
export class JWTGuard implements CanActivate, CanActivateChild, CanLoad {
  private cog: AppAuthConfig;
  constructor(
    @Inject(DA_SERVICE_TOKEN) private srv: ITokenService,
    private injector: Injector,
    cog: AppAuthConfig,
  ) {
    this.cog = Object.assign(new AppAuthConfig(), cog);
  }

  private process(): boolean {
    const res = CheckJwt(
      this.srv.get<JWTTokenModel>(JWTTokenModel),
      this.cog.token_exp_offset,
    );
    if (!res) {
      ToLogin(this.cog, this.injector);
    }
    return res;
  }

  // lazy loading
  canLoad(): boolean {
    if (!this.process()) {
      console.log('No esta logueado!');
    }
    return this.process();
  }
  // all children route
  canActivateChild(): boolean {
    if (!this.process()) {
      console.log('No esta logueado!');
    }
    return this.process();
  }
  // route
  canActivate(): boolean {
    if (!this.process()) {
      console.log('No esta logueado!');
    }
    return this.process();
  }
}
