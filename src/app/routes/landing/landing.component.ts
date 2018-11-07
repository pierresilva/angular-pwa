import { Component, OnInit, Inject } from '@angular/core';
import { ArrayService } from '../../packages/util';
import { _HttpClient } from '../../packages/theme';

import {
  APP_I18N_TOKEN,
} from '../../packages/theme';
import { I18NService } from '../../core/i18n/i18n.service';
import { CacheService } from '../../packages/cache';
import { API_URL } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { ACLService } from '../../packages/acl';
import { DA_SERVICE_TOKEN, TokenService } from '../../packages/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [],
})
export class LandingComponent implements OnInit {

  date = new Date(2018, 11, 21);
  mode = 'month';

  dataTree = [
    {
      id: 1,
      parent_id: null,
      title: 'Some 1',
      children: [
        {
          id: 2,
          parent_id: 1,
          title: 'Some 1-1',
          children: [
            {
              id: 5,
              parent_id: 2,
              title: 'Some 2-1',
            },
            {
              id: 6,
              parent_id: 2,
              title: 'Some 2-2',
            }
          ]
        },
        {
          id: 3,
          parent_id: 1,
          title: 'Some 1-2',
        },
      ]
    },
    {
      id: 4,
      parent_id: null,
      title: 'Some 4',
    },
    {
      id: 7,
      parent_id: null,
      title: 'Some 7',
    }
  ];

  dataArray = [];

  langs: any[];

  data = { name: 'cipchk', address: { city: 'shanghai', district: 'changning' } };

  constructor(
    private arrayService: ArrayService,
    private http: _HttpClient,
    private acl: ACLService,
    @Inject(APP_I18N_TOKEN) private i18n: I18NService,
    @Inject(DA_SERVICE_TOKEN) private token: TokenService,
  ) {
    this.langs = this.i18n.getLangs();
    console.log(this.langs);
  }

  ngOnInit() {
    this.dataArray = this.arrayService.treeToArr(this.dataTree, {
      clearChildren: false
    });

    console.log(this.token.getPayload('roles'));

    // peticiones con http o https a través de _HttpClient se solicitan a la URL
    /*this.http.get(API_URL + 'auth/user')
    .subscribe((res: any) => {
      console.log(res);
    });*/

    // get cache, if no localStorage key make request
    /*this.cache.get(API_URL + 'test')
    .pipe(
      map((cache: any) => {
        console.log(cache);
        this.http.get(API_URL + 'test');
      })
    )
    .subscribe((res: any) => {
      console.log(res);
    });*/

    // Peticiones sin token
    /*this.http.get(API_URL + 'test', {_allow_anonymous: true})
    .subscribe(
      res => console.log('success', res),
      err => console.error('error', err)
    );*/

    // peticiones sin http o https a través de _HttpClient se solicitan al MOCK
    /*this.http.get('/user')
    .subscribe((res: any) => {
      console.log(res);
    });*/

  }

  setRole(role: string[] = null) {
    console.log(role);
    if (!role) {
      this.acl.setRole([]);
      return;
    }
    this.acl.attachRole(role);
  }

  setAbility(ability: (string | number)[] = null) {
    if (!ability) {
      this.acl.setAbility([]);
      return;
    }
    this.acl.attachAbility(ability);
  }

  setFullAccess() {
    this.acl.setFull(true);
  }

  setNoneAccess() {
    this.acl.setFull(false);
  }

  getTest() {
    // falla porque no le envia un token ya que se envia _allow_anonymous
    this.http.get(API_URL + 'test', {_allow_anonymous: true})
    .subscribe((res: any) => {
      console.log(res);
    });
  }

}
