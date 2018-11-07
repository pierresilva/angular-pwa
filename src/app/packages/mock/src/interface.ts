import { HttpRequest } from '@angular/common/http';

export interface MockCachedRule {
  [key: string]: any;

  method: string;

  url: string;

  martcher: RegExp;

  segments: string[];

  callback: (req: MockRequest) => any;
}

export interface MockRule {
  [key: string]: any;

  method: string;

  url: string;

  /** Parámetro de ruta */
  params?: any;

  callback: (req: MockRequest) => any;
}

export interface MockRequest {
  /** Parámetro de ruta */
  params?: any;
  /** Parámetro de URL */
  queryString?: any;
  headers?: any;
  body?: any;
  /** `HttpRequest` original */
  original: HttpRequest<any>;
}
