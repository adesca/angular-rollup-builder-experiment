import {environment} from 'src/environments/environment';
import {NgModuleRef, PlatformRef} from '@angular/core';
import {AppModule} from 'src/app/app.module';
import {AppComponent} from 'src/app/app.component';

const appSelector = 'app-root-inner-project';

export default {
  doStuff: () => {
    console.log('This environment file is prod. This is expected to be true ', environment.production);
  },
  mount: (angularPlatform: PlatformRef, elementToBootstrapUnder: HTMLElement): Promise<NgModuleRef<any>> => {
    if (elementToBootstrapUnder) {
      const elementToBootstrapTo = document.createElement(appSelector);

      elementToBootstrapUnder.appendChild(elementToBootstrapTo);
      return angularPlatform.bootstrapModule(AppModule)
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

