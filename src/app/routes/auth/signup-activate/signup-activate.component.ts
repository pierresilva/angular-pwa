import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '../../../packages/theme';
import { API_URL } from '../../../app.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-activate',
  templateUrl: './signup-activate.component.html',
  styleUrls: ['./signup-activate.component.scss']
})
export class SignupActivateComponent implements OnInit {
  token: string;
  verified = false;
  verifyFails = false;
  verifyFailsMessage = 'El token de activación no es valido!';
  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  ngOnInit() {
    this.http.get(API_URL + 'auth/signup/activate/' + this.token, {_allow_anonymous: true})
      .subscribe(
        (res: any) => {
          console.log(res);
          this.verified = true;
        },
        (err) => {
          console.log(err.error);
          this.verifyFails = true;
        }
      );
  }

}
