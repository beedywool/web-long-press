"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.LongPress = factory();
  }
})(typeof window !== "undefined" ? window : global, function () {
  // default options
  var defaultOptions = {
    triggerClass: "long-press",
    pressDelay: 800,
    eventName: "longpress",
    bubbles: true
  }; // constructor

  function LongPress(opts) {
    this.options = _objectSpread(_objectSpread({}, defaultOptions), opts);
    this.timer;
    this.init();
  }
  /**
   * initialize
   */


  LongPress.prototype.init = function () {
    var that = this;
    var timer = that.timer;
    if (timer) clearTimeout(timer);
    var pressStart = that.pressStart.bind(that);
    var init = that.init.bind(that);

    if ("ontouchstart" in document.body) {
      document.addEventListener("touchstart", pressStart, {
        once: true,
        passive: false
      });
      document.addEventListener("touchend", init, {
        once: true
      });
    } else {
      document.addEventListener("mousedown", pressStart, {
        once: true
      });
      document.addEventListener("mouseup", init, {
        once: true
      });
    }
  };
  /**
   * handle press start
   * @param {Event} e
   * @param {Object} options
   */


  LongPress.prototype.pressStart = function (e) {
    var that = this;
    var options = that.options;
    // Check if the target is an input field
    if (e.target.className.split(" ").indexOf(options.triggerClass) < 0) return;
    
    /* Instead of preventing the default behavior, change the 
    css to prevent the user from selecting text */
    e.target.style.userSelect = 'none';
    
    // Start the timer for long press
    that.timer = setTimeout(function () {
      that.handleLongPress(e.target);
    }, options.pressDelay);
  };

  /**
   * trigger longpress event
   * @param {HTMLElemnt} target
   */


  LongPress.prototype.handleLongPress = function (target) {
    var _this$options = this.options,
        eventName = _this$options.eventName,
        bubbles = _this$options.bubbles;
    target.dispatchEvent(new Event(eventName, {
      bubbles: bubbles
    }));
  };

  return LongPress;
});
