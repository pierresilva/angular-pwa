import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DA_SERVICE_TOKEN = new InjectionToken<ITokenService>(
  'APP_AUTH_TOKEN_SERVICE_TOKEN',
);

export interface ITokenModel {
  [key: string]: any;

  token: string;
}

export interface ITokenService {
  set(data: ITokenModel): boolean;

  /**
   * Obtenga el token, el formulario incluye:
   * - `get()` Obtiene: Simple Token
   * - `get<JWTTokenModel>(JWTTokenModel)` Obtiene: JWT Token
   */
  get(type?: any): ITokenModel;

  /**
   * Obtener Token， el formulario incluye：
   * - `get()` Obtiene: Simple Token
   * - `get<JWTTokenModel>(JWTTokenModel)` Obtiene: JWT Token
   */
  get<T extends ITokenModel>(type?: any): T;

  clear(): void;

  change(): Observable<ITokenModel>;

  /**
   * Retorna el Token payload o una de sus Keys
   * @param key string Key del token payload a retornar
   */
  getPayload(key?: any): any;

  /** Obtener dirección de acceso */
  // tslint:disable-next-line:member-ordering
  readonly login_url: string;

  /** Saltar la dirección después del inicio de sesión, regresar cuando no se especifique `/` */
  // tslint:disable-next-line:member-ordering
  redirect: string;
}
