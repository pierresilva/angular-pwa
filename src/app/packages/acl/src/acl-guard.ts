import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  Route,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ACLService } from './acl.service';
import { ACLCanType } from './acl.type';
import { AppACLConfig } from './acl.config';
import { MatSnackBar } from '@angular/material';
import { MessageSnackbarComponent } from 'src/app/app-components/message-snackbar/message-snackbar.component';

@Injectable()
export class ACLGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private srv: ACLService,
    private router: Router,
    private snackBar: MatSnackBar,
    private options: AppACLConfig,
  ) {}

  private process(
    guard: ACLCanType | Observable<ACLCanType>,
  ): Observable<boolean> {
    return (guard && guard instanceof Observable
      ? guard
      : of(
          typeof guard !== 'undefined' && guard !== null
            ? (guard as ACLCanType)
            : null,
        )
    ).pipe(
      map(v => this.srv.can(v)),
      tap(v => {
        if (v) {
          return;
        }
        this.router.navigateByUrl(this.options.guard_url);
      }),
    );
  }

  // lazy loading
  canLoad(route: Route): Observable<boolean> {
    /*if (this.process((route.data && route.data.guard))) {
      console.log('No cuenta con los permisos!');
      this.showCustomSnackbar('No cuenta con los permisos!', 'warning');
    }*/
    if (!this.srv.can(route.data.guard)) {
      console.log('No tiene loa permisos necesarios!');
      this.showCustomSnackbar('No cuenta con los permisos necesarios!', 'warning');
    }
    return this.process((route.data && route.data.guard) || null);
  }
  // all children route
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
  // route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    /*console.log((route.data && route.data.guard));
    if (this.process((route.data && route.data.guard))) {
      console.log('No cuenta con los permisos!');
      this.showCustomSnackbar('No cuenta con los permisos!', 'warning');
    }*/
    if (!this.srv.can(route.data.guard)) {
      console.log('No tiene loa permisos necesarios!');
      this.showCustomSnackbar('No cuenta con los permisos necesarios!', 'warning');
    }
    return this.process((route.data && route.data.guard) || null);
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
