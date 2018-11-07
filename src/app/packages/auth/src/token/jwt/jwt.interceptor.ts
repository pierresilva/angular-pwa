import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

import { AppAuthConfig } from '../../auth.config';
import { BaseInterceptor } from '../base.interceptor';
import { DA_SERVICE_TOKEN } from '../interface';
import { JWTTokenModel } from './jwt.model';
import { CheckJwt } from '../helper';

@Injectable()
export class JWTInterceptor extends BaseInterceptor {
  isAuth(options: AppAuthConfig): boolean {
    this.model = this.injector
      .get(DA_SERVICE_TOKEN)
      .get<JWTTokenModel>(JWTTokenModel);
    return CheckJwt(this.model as JWTTokenModel, options.token_exp_offset);
  }

  setReq(req: HttpRequest<any>, options: AppAuthConfig): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.model.token}`,
      },
    });
  }
}
