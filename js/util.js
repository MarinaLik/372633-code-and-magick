'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    randomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    arrRandomElem: function (arrName) {
      return arrName[this.randomNumber(0, arrName.length - 1)];
    }
  };
})();
