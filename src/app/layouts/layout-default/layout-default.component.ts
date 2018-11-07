import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { fadeAnimation } from '../../core/route-animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ScrollService, SettingsService, _HttpClient } from '../../packages/theme';
import { ACLService } from '../../packages/acl';
import { DA_SERVICE_TOKEN, TokenService } from '../../packages/auth';
import { API_URL } from '../../app.module';

declare var $: any;

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
  animations: [fadeAnimation]
})
export class LayoutDefaultComponent implements OnInit, AfterViewInit {

  config = {
    panels: [
      { name: 'Section 1', description: 'First section' },
      { name: 'Section 2', description: 'Second section' },
      { name: 'Section 3', description: 'Third section' }
    ]
  };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private acl: ACLService,
    private settings: SettingsService,
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private token: TokenService,
    @Inject(DOCUMENT) private doc: any
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.router.events.subscribe((evt) => {
      if ((evt instanceof NavigationEnd)) {
        $('mat-sidenav-content').scrollTop(0);
      }
      if (evt instanceof NavigationStart) {
        return; // $('mat-sidenav-content').scrollTop(0);
      }
    });
  }

  logout() {
    this.http.get(API_URL + 'auth/logout')
      .subscribe((res: any) => {
        this.acl.set({ role: [], ability: [] });
        this.token.clear();
        this.settings.setUser({});
        this.router.navigateByUrl('/auth');
      });
  }

}
