/**
 * Importa y refina el módulo básico
 */
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { throwIfAlreadyLoaded } from './core/module-import-guard';

import { AppThemeModule } from './packages/theme';
import { AppAuthModule, AppAuthConfig, DA_STORE_TOKEN } from './packages/auth';
import { AppACLModule } from './packages/acl';
import { AppCacheModule } from './packages/cache';
import { AppUtilModule } from './packages/util';
// mock
import { AppMockModule } from './packages/mock';
import * as MOCKDATA from '../_mock';
import { environment } from '../environments/environment';

const MOCKMODULE = !environment.production
  ? [AppMockModule.forRoot({ data: MOCKDATA })]
  : [];

// region: global config functions

export function fnAppAuthConfig(): AppAuthConfig {
  return Object.assign(new AppAuthConfig(), <AppAuthConfig>{
    allow_anonymous_key: '_allow_anonymous',
    token_invalid_redirect: false,
    login_url: '/auth/login',
    store_key: '_token',
    token_send_key: 'token',
    token_send_template: 'Bearer ${token}',
    token_send_place: 'header',
    ignores: [
      /uploads\//,
      /assets\//,
      /api\/test\//
    ]
  });
}

import { AppThemeConfig } from './packages/theme';
export function fnAppThemeConfig(): AppThemeConfig {
  return Object.assign(new AppThemeConfig(), <AppThemeConfig>{
    http: {
      nullValueHandling: 'include',
      dateValueHandling: 'timestamp',
    },
  });
}

// endregion

@NgModule({
  imports: [
    AppThemeModule.forRoot(),
    AppAuthModule.forRoot(),
    AppACLModule.forRoot(),
    AppCacheModule.forRoot(),
    AppUtilModule.forRoot(),
    // mock
    ...MOCKMODULE,
  ],
})
export class CustomModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CustomModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CustomModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomModule,
      providers: [
        { provide: AppThemeConfig, useFactory: fnAppThemeConfig },
        { provide: AppAuthConfig, useFactory: fnAppAuthConfig },
      ],
    };
  }
}
