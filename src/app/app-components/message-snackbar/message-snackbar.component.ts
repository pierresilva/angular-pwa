import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-message-snackbar',
  templateUrl: './message-snackbar.component.html',
  styleUrls: ['./message-snackbar.component.scss']
})
export class MessageSnackbarComponent implements OnInit {

  content: any;
  snackBarAction: string;

  constructor(
    private snackBarRef: MatSnackBarRef<MessageSnackbarComponent>
  ) { }

  ngOnInit() {
  }

  action() {
    this.snackBarRef.dismissWithAction();
    // Add your functionality in the method that opened the snackbar
  }

}
