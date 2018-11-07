import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MenuService,
  SettingsService,
  TitleService,
  APP_I18N_TOKEN,
} from '../../packages/theme';
import { ACLService } from '../../packages/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '../../packages/auth';

/**
 * Se usa cuando se inicia la aplicación
 * Generalmente se usa para obtener los datos básicos necesarios para la aplicación, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(APP_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private injector: Injector,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService
  ) { }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`)
      .pipe(
        // Mensaje de excepción generado después de recibir otros interceptores
        catchError((langData: any) => {
          resolve(null);
          return langData;
        }),
      )
      .subscribe(
        (langData: any) => {
          // language data
          this.translate.setTranslation(this.i18n.defaultLang, langData.response.data);
          this.translate.setDefaultLang(this.i18n.defaultLang);
        },
        () => {},
        () => {
          resolve(null);
        }
      );
      this.httpClient.get('assets/tmp/app-data.json')
        .pipe(
          // Mensaje de excepción generado después de recibir otros interceptores
          catchError((appData: any) => {
            resolve(null);
            return appData;
          }),
        )
        .subscribe(
          (appData: any) => {
            // application data
            const res: any = appData.response.data;
            // Información de la aplicación: incluyendo el nombre del sitio, descripción, año
            this.settingService.setApp(res.app);
            // Inicialización del menú
            this.menuService.add(res.menu);
            // Establecer el sufijo del título de la página
            this.titleService.suffix = res.app.name;
            if (this.tokenService.get().token) {
              const payload = this.tokenService.getPayload();
              this.aclService.set({
                role: payload.roles,
                ability: payload.abilities,
              });
            }
          },
          () => { },
          () => {
            resolve(null);
          },
        );
    });
  }
}
