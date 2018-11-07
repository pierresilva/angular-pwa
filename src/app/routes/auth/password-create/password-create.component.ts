import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { _HttpClient, SettingsService } from '../../../packages/theme';
import { DA_SERVICE_TOKEN, TokenService } from '../../../packages/auth';
import { ACLService } from '../../../packages/acl';
import { API_URL, WEB_URL } from '../../../app.module';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss']
})
export class PasswordCreateComponent implements OnInit {

  token: string = '';
  password: string;
  password_confirmation: string;
  loading = false;
  logged = false;
  verified = false;
  verifyFails = false;

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private http: _HttpClient,
    private acl: ACLService,
    private settings: SettingsService,
    private route: ActivatedRoute
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
   }

  ngOnInit() {
    this.form = this.fb.group({
      password: [''],
      password_confirmation: ['']
    });

    this.http.get(API_URL + 'auth/password/find/' + this.token, {_allow_anonymous: true})
      .subscribe(
        (res: any) => {
          console.log(res);
          this.verified = true;
          this.verifyFails = false;
        },
        (err) => {
          console.log(err.error);
          this.verified = false;
          this.verifyFails = true;
        }
      );
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      let data;
      data = this.form.value;
      data['token'] = this.token;
      this.http.post(API_URL + 'auth/password/reset', data, { _allow_anonymous: true })
        .subscribe(
          (res: any) => {
            this.logged = true;
            this.openSnackBar(res.message, 'green');
          },
          (err: any) => {
            this.logged = false;
          }
        );
      this.loading = false;
    }
    this.formSubmitAttempt = true;
  }

  openSnackBar(message: string, color: string = '', action: string = null, ) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [`${color}-snackbar`]
    });
  }

}
