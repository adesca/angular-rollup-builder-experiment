import {environment} from 'src/environments/environment';


export default {
  doStuff: () => {
    console.log('This environment file is prod. This is expected to be true ', environment.production);
  }
};

