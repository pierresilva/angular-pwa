import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject, Observer } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { _HttpClient } from '../../packages/theme';
import { environment } from '../../../environments/environment';
import { LoadingService } from './loading.service';
import { MatSnackBar } from '@angular/material';
import { MessageSnackbarComponent } from '../../app-components/message-snackbar/message-snackbar.component';

/**
 * El interceptor HTTP predeterminado, para obtener detalles sobre su registro, consulte `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  pendingRequests = 0;

  message: string;

  constructor(
    private injector: Injector,
    private loading: LoadingService,
    public snackBar: MatSnackBar
  ) { }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse | any,
  ): Observable<any> {
    // La operación `end()` de `_HttpClient` no se puede ejecutar porque `throw` se exporta.
    this.injector.get(_HttpClient).end();
    // Algunas operaciones generales
    const body: any = event.body;
    switch (event.status) {
      case 200:
        // Manejo de errores, lo siguiente supone que restful tiene un formato de salida unificado
        // (lo que significa que hay un formato de datos correspondiente independientemente
        // del éxito o fracaso)
        // Contenido de respuesta：
        //  Contenido de error:{ status: 1, message: 'Parámetro ilegal', errors: [some_error: 'error message'] }
        //  Contenido correcto:{ status: 0, message: 'OK', response: {} }
        // El siguiente fragmento de código se puede aplicar directamente
        if (event instanceof HttpResponse) {
          if (body && body.status !== 0) {
            // Continuar lanzando un error interrumpe todas las operaciones subsiguientes de Pipe, subscribe, por lo tanto:
            // this.http.get('/').subscribe() No dispara
            console.log(
              `%c ${event.status} La peticion no tiene un formato valido ${event.url}`,
              'background:orange;color:#fff'
            );
            // this.showCustomSnackbar('<b>' + body.message + '</b>', 'warning');
            return throwError({});
          } else {
            // Vuelva a editar el contenido del `body` como `response`, ya no tendrá que preocuparse por
            // el código de estado empresarial para la mayoría de los escenarios
            //// return of(new HttpResponse(Object.assign(event, { body: body.response })));
            // O aún mantener el formato completo
            console.log(
              `%c ${event.status} OK ${event.url}`,
              'background:green;color:withe'
            );
            // this.showCustomSnackbar('<b>' + body.message + '</b>', 'success');
          }
        }
        this.track(false);
        break;
      case 201:
        this.track(false);
        this.message = '<b>' + event.body.message + '</b>';
        this.showCustomSnackbar(this.message, 'success');
        break;
      case 202:
        this.track(false);
        this.message = '<b>' + event.body.message + '</b>';
        this.showCustomSnackbar(this.message, 'success');
        break;
      case 401: // Código de estado no registrado
        this.track(false);
        this.message = '<b>' + event.error.message + '</b>';
        if (event.error['response'] && event.error['response']['errors'].length) {
          // tslint:disable-next-line:forin
          for (let key in event.error.response.errors) {
            const element = event.error.response.errors[key];
            this.message = this.message + '<br>' + element;
          }
          this.showCustomSnackbar(this.message, 'warning');
          return of(event);
        } else {
          this.showCustomSnackbar(this.message, 'warning');
          return of(event);
        }
        // this.goTo('/auth/auth');
        break;
      case 402:
        this.track(false);
        this.message = '<b>' + event.error.message + '</b>';
        this.showCustomSnackbar(this.message, 'danger');
        return new Observable((observer: Observer<HttpEvent<any>>) => {
          const res = new HttpErrorResponse({
            status: 402,
            statusText: `From Defaut Interceptor`,
            error: event.error
          });
          observer.error(res);
        });
        break;
      case 403:
        this.track(false);
        this.message = '<b>' + event.error.message + '</b>';
        this.showCustomSnackbar(this.message, 'danger');
        return new Observable((observer: Observer<HttpEvent<any>>) => {
          const res = new HttpErrorResponse({
            status: 403,
            statusText: `From Defaut Interceptor`,
            error: event.error
          });
          observer.error(res);
        });
        break;
      case 422:
        this.track(false);
        this.message = '<b>' + event.error.message + '</b>';
        // tslint:disable-next-line:forin
        for (let key in event.error.response.errors) {
          const element = event.error.response.errors[key];
          this.message = this.message + '<br>' + element;
        }
        this.showCustomSnackbar(this.message, 'warning', 'OK');
        return new Observable((observer: Observer<HttpEvent<any>>) => {
          const res = new HttpErrorResponse({
            status: 422,
            statusText: `From Defaut Interceptor`,
            error: event.error
          });
          observer.error(res);
        });
        break;
      case 404:
        this.track(false);
        this.message = '<b>' + event.error.message + '</b>';
        this.showCustomSnackbar(this.message, 'danger');
        return new Observable((observer: Observer<HttpEvent<any>>) => {
          const res = new HttpErrorResponse({
            status: 404,
            statusText: `From Defaut Interceptor`,
            error: event.error
          });
          observer.error(res);
        });
        break;
      case 500:
        this.track(false);
        this.message = '<b>' + event.error.message + '</b>';
        this.showCustomSnackbar(this.message, 'danger');
        return new Observable((observer: Observer<HttpEvent<any>>) => {
          const res = new HttpErrorResponse({
            status: 500,
            statusText: `From Defaut Interceptor`,
            error: event.error
          });
          observer.error(res);
        });
        // this.goTo(`/${event.status}`);
        break;
      default:
        this.track(false);
        if (event instanceof HttpErrorResponse) {
          this.message = '<b>' + event.message + '</b>';
          this.showCustomSnackbar(this.message, 'danger');
          return new Observable((observer: Observer<HttpEvent<any>>) => {
            const res = new HttpErrorResponse({
              status: 400,
              statusText: `From Defaut Interceptor`,
              error: event.error
            });
            observer.error(res);
          });
        }
        break;
    }
    return of(event);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
  | HttpSentEvent
  | HttpHeaderResponse
  | HttpProgressEvent
  | HttpResponse<any>
  | HttpUserEvent<any>
  > {

    this.track(true);

    // Prefijo del servidor plus unificado
    let url = req.url;

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }

    const newReq = req.clone({
      url: url,
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // Si en una solicitud el estado HTTP es 200 no se trata de un error
        if (event instanceof HttpResponse && event.status === 200) {
          return this.handleData(event);
        }
        // Si todo está bien
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }

  track(track: boolean): void {
    if (track) {
      this.pendingRequests++;
    } else {
      this.pendingRequests--;
    }
    if (this.pendingRequests > 0) {
      this.loading.loadingSubject.next(true);
    } else {
      this.loading.loadingSubject.next(false);
    }
  }

  showCustomSnackbar(snackbarContent: string, snackBarColor: string, snackBarAction: any = null) {
    let snackBarRef;
    snackBarRef = this.snackBar.openFromComponent(MessageSnackbarComponent, {
      duration: snackBarAction ? null : 5000,
      panelClass: [snackBarColor + '-snackbar']
    });
    snackBarRef.instance.content = snackbarContent;
    // You can rename the `snackBarAction` attribute to anything you want
    snackBarRef.instance.snackBarAction = snackBarAction;
    snackBarRef.onAction().subscribe(() => {
      // console.log('Action clicked!');
    });
  }
}
