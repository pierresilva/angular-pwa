import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { _HttpClient, SettingsService } from '../../../packages/theme';
import { DA_SERVICE_TOKEN, TokenService } from '../../../packages/auth';
import { ACLService } from '../../../packages/acl';
import { API_URL, WEB_URL } from '../../../app.module';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  email: string;
  loading = false;
  logged = false;

  notVerified = false;

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private http: _HttpClient,
    private acl: ACLService,
    private settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private token: TokenService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['']
    });
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
      this.http.post(API_URL + 'auth/password/create', this.form.value, { _allow_anonymous: true })
      .subscribe(
        (res: any) => {
          this.logged = true;
          this.openSnackBar(res.message, 'green');
        },
        (err: any) => {
          this.notVerified = true;
        }
      );
      this.loading = false;
    }
    this.formSubmitAttempt = true;
  }

  openSnackBar(message: string, color: string = '', action: string = null, ) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [ `${color}-snackbar`]
    });
  }

}
