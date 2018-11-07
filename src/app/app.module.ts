import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomModule } from './custom.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutsModule } from './layouts/layouts.module';
import { StartupService } from './core/startup/startup.service';
import { DefaultInterceptor } from './core/net/default.interceptor';
import { JWTInterceptor } from './packages/auth';
// angular i18n
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
registerLocaleData(locales);
// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_I18N_TOKEN } from './packages/theme';
import { I18NService } from './core/i18n/i18n.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { LoadingService } from './core/net/loading.service';
import { AppComponentsModule } from './app-components/app-components.module';

// Cargar archivos de idioma i18n
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/tmp/i18n/`, '.json');
}

export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}

/**
 * Constante global para la URL del API del backend
 */
export const API_URL = environment.BACKEND_API_URL;

/**
 *  Constante global para la URL web del backend
 */
export const WEB_URL = environment.BACKEND_WEB_URL;


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomModule.forRoot(),
    RouterModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
    SharedModule,
    LayoutsModule,
    RoutesModule,
    AppComponentsModule,
    // i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (I18nHttpLoaderFactory),
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: APP_I18N_TOKEN, useClass: I18NService, multi: false },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
    LoadingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
