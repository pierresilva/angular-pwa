import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../core/route-animations';

@Component({
  selector: 'app-layout-fullscreen',
  templateUrl: './layout-fullscreen.component.html',
  styleUrls: ['./layout-fullscreen.component.scss'],
  animations: [fadeAnimation]
})
export class LayoutFullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
