import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { _HttpClient } from '../../../packages/theme';
import { API_URL } from '../../../app.module';

@Component({
  selector: 'app-page-private',
  templateUrl: './page-private.component.html',
  styleUrls: ['./page-private.component.scss']
})
export class PagePrivateComponent implements OnInit {
  form: FormGroup;

  date = new Date(2012, 11, 21);
  mode = 'month';

  constructor(
    private fb: FormBuilder,
    private http: _HttpClient
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      name: ['']
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched)
    );
  }

  submit() {
    if (this.form.valid) {
      this.http.post(API_URL + 'test/test', this.form.value)
      .subscribe((res: any) => {
        console.log(res);
      });
    }
  }

}
