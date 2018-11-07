import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { VERSION as VERSION_APP, _HttpClient } from './packages/theme';
import { Router, NavigationEnd, LoadChildren } from '@angular/router';
import { SettingsService, TitleService } from './packages/theme';
import { filter } from 'rxjs/operators';
import { LoadingService } from './core/net/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';
  isLoading = false;

  constructor(
    private swUpdate: SwUpdate,
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loading.loadingSubject.subscribe(data => {
      this.isLoading = data;
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        console.log('PWA update!');
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.titleSrv.setTitle();
      });
  }
}
