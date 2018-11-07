import { Component, OnInit } from '@angular/core';
import { API_URL } from '../../../app.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { _HttpClient } from '../../../packages/theme';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  loading = false;
  logged = false;

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private http: _HttpClient
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
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
      this.http.post(API_URL + 'auth/signup', this.form.value, { _allow_anonymous: true })
        .subscribe(
          (res: any) => {
            this.logged = true;
            this.openSnackBar(res.message, 'success');
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
