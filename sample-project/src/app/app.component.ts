import {Component, OnInit} from '@angular/core';
import {System} from 'systemjs';
import {environment} from "src/environments/environment";

@Component({
  selector: 'app-root-inner-project',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sample-project';

  environment = environment;
  systemJS: System = window['System'];

  ngOnInit(): void {
    // this.systemJS.import('/assets/out.js');
  }
}
