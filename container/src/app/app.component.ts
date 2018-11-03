import {Component, OnInit} from '@angular/core';
import {System} from 'systemjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private SystemJS: System = window['System'];
  title = 'container';

  ngOnInit(): void {
   this.ngOnInitAsync().then(() => console.log('load was successful')
     , err => console.log('Load failed for this reason', err));

  }

  async ngOnInitAsync() {
    const module: Module<ExternalDoStuffModule> = await this.SystemJS.import('/assets/out.js');
    console.log('imported module ', module);
    module.default.doStuff();
  }


}

class Module<T> {
  default: T;
}

class ExternalDoStuffModule {
  doStuff: () => void;
}
