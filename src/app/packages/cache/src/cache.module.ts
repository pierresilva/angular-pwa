import { NgModule, ModuleWithProviders } from '@angular/core';

import { DC_STORE_STORAGE_TOKEN } from './interface';
import { AppCacheConfig } from './cache.config';
import { CacheService } from './cache.service';
import { LocalStorageCacheService } from './local-storage-cache.service';

@NgModule({})
export class AppCacheModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppCacheModule,
      providers: [
        AppCacheConfig,
        CacheService,
        { provide: DC_STORE_STORAGE_TOKEN, useClass: LocalStorageCacheService },
      ],
    };
  }
}
