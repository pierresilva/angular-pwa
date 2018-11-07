import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ITokenService, ITokenModel } from './interface';
import { DA_STORE_TOKEN, IStore } from '../store/interface';
import { AppAuthConfig } from '../auth.config';
import { JWTTokenModel } from './jwt/jwt.model';

@Injectable()
export class TokenService implements ITokenService {
  private change$: BehaviorSubject<ITokenModel> = new BehaviorSubject<
    ITokenModel
  >(null);
  private data: ITokenModel;
  private _redirect: string;

  constructor(
    private options: AppAuthConfig,
    @Inject(DA_STORE_TOKEN) private store: IStore,
  ) {}

  get login_url(): string {
    return this.options.login_url;
  }

  set redirect(url: string) {
    this._redirect = url;
  }

  get redirect() {
    return this._redirect || '/';
  }

  set(data: ITokenModel): boolean {
    this.change$.next(data);
    return this.store.set(this.options.store_key, data);
  }

  get(type?: any);
  get<T extends ITokenModel>(type?: { new (): T }): T {
    const data = this.store.get(this.options.store_key);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear() {
    this.change$.next(null);
    this.store.remove(this.options.store_key);
  }

  change(): Observable<ITokenModel> {
    return this.change$.pipe(share());
  }

  getPayload(key: any = null) {
    const data = new JWTTokenModel();
    data.token = this.get().token;

    if (data.token) {
      if (key) {
        return data.payload[key];
      }

      return data.payload;
    }

    return null;

  }
}
