(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global['rolled-up-app'] = factory());
}(this, (function () { 'use strict';

    var main = {
        mount: function () { console.log('do stuff'); }
    };

    return main;

})));
