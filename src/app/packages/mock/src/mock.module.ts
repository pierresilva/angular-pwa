import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppMockConfig } from './mock.config';
import { MockService } from './mock.service';
import { MockInterceptor } from './mock.interceptor';

@NgModule({})
export class AppMockModule {
  static forRoot(config: AppMockConfig): ModuleWithProviders {
    return {
      ngModule: AppMockModule,
      providers: [
        MockService,
        { provide: AppMockConfig, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AppMockModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
      ],
    };
  }
}
