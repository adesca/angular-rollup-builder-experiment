import {environment} from 'src/environments/environment';
import {ApplicationRef, Compiler, NgModuleRef, NgZone, PlatformRef} from '@angular/core';
import {AppModule} from 'src/app/app.module';
import {AppComponent} from 'src/app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

const appSelector = 'app-root-inner-project';
console.log('being looked into');

const compileAppAheadOfTime = () => {
  const compiler = new Compiler();
  console.log('result ', compiler.compileModuleAndAllComponentsSync(AppModule));
};

export default {
  doStuff: () => {
    console.log('This environment file is prod. This is expected to be true ', environment.production);
  },
  mount: (containerNgZone: NgZone, elementToBootstrapUnder: HTMLElement): Promise<NgModuleRef<any>> => {
    // if (!(containerNgZone instanceof NgZone)) {
    //   throw new Error('You must provide an NgZone but instead you provided ');
    // }

    if (elementToBootstrapUnder) {
      const elementToBootstrapTo = document.createElement(appSelector);

      elementToBootstrapUnder.appendChild(elementToBootstrapTo);
      return platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: containerNgZone})
        .then(module => {
          console.log('module has been fully bootstrapped');
          return module;
        });
    } else {
      throw new Error('You must provide an element to bootstrap this app under');
    }


  },
  appSelector: appSelector
};

// compileAppAheadOfTime();
