import { Injectable, Inject, Injector } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '../interface';
import { CheckSimple, ToLogin } from '../helper';
import { AppAuthConfig } from '../../auth.config';

@Injectable()
export class SimpleGuard implements CanActivate, CanActivateChild, CanLoad {
  private cog: AppAuthConfig;

  constructor(
    @Inject(DA_SERVICE_TOKEN) private srv: ITokenService,
    private injector: Injector,
    cog: AppAuthConfig,
  ) {
    this.cog = Object.assign(new AppAuthConfig(), cog);
  }

  private process(): boolean {
    const res = CheckSimple(this.srv.get());
    if (!res) {
      ToLogin(this.cog, this.injector);
    }
    return res;
  }

  // lazy loading
  canLoad(): boolean {
    return this.process();
  }
  // all children route
  canActivateChild(): boolean {
    return this.process();
  }
  // route
  canActivate(): boolean {
    return this.process();
  }
}
