import { InjectionToken } from '@angular/core';

export interface ICache {
  v: any;
  /** Marca de tiempo de caducidad, `0` significa que no ha expirado */
  e: number;
}

export const DC_STORE_STORAGE_TOKEN = new InjectionToken<ICacheStore>(
  'DC_STORE_STORAGE_TOKEN',
);

export interface ICacheStore {
  get(key: string): ICache;

  set(key: string, value: ICache): boolean;

  remove(key: string);
}

export type CacheNotifyType = 'set' | 'remove' | 'expire';

export interface CacheNotifyResult {
  type: CacheNotifyType;
  value?: any;
}
