(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['some-project-name'] = factory());
}(this, (function () { 'use strict';

  var environment = {
      production: true
  };

  var spaEntry = {
      doStuff: function () {
          console.log('This environment file is prod. This is expected to be true ', environment.production);
      }
  };

  return spaEntry;

})));
