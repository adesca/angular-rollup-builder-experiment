import {Component, ElementRef, NgModuleRef, NgZone, OnInit, PlatformRef, ViewChild} from '@angular/core';
import {System} from 'systemjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private SystemJS: System = window['System'];
  title = 'container';
  @ViewChild('mountPoint') mountPoint: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
   this.ngOnInitAsync().then(() => console.log('load was successful')
     , err => console.log('Load failed for this reason', err));

  }

  async ngOnInitAsync() {
    const module: Module<ExternalDoStuffModule> = await this.SystemJS.import('/assets/out.js');
    console.log('imported module ', module);
    module.default.doStuff();
    module.default.mount(this.ngZone, this.mountPoint.nativeElement).then(bootstrappedModule => {
      console.log('bootstrap completed with this module ', bootstrappedModule);
    });
  }


}

interface Module<T> {
  default: T;
}

interface ExternalDoStuffModule {
  doStuff: () => void;
  mount: (PlatformRef, HTMLElement) => Promise<NgModuleRef<any>>;
}
