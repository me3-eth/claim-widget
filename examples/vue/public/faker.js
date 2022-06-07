"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Faker = void 0;

var _mockXmlhttprequest = require("mock-xmlhttprequest");

var _pathToRegexp = require("path-to-regexp");

var _request = require("./request");

var _response = require("./response");

var _array = require("./array");

var _url = require("./url");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var global = // eslint-disable-next-line no-undef
typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || {};

class Faker {
  constructor() {
    var _this = this;

    _defineProperty(this, "getRequests", () => Object.values(this.requestMap));

    _defineProperty(this, "getKey", function () {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var searchParamKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      return url && method ? [url, ...searchParamKeys, method.toLowerCase()].join('_') : '';
    });

    _defineProperty(this, "makeInitialRequestMap", requests => {
      if (!requests || !Array.isArray(requests)) {
        return;
      }

      this.restore();
      requests.forEach(request => {
        this.add(request);
      });
    });

    _defineProperty(this, "add", request => {
      var {
        path,
        searchParamKeys
      } = (0, _url.getNormalizedUrl)(request.url);
      var key = this.getKey(path, searchParamKeys, request.method);
      this.requestMap[key] = _objectSpread(_objectSpread({}, request), {}, {
        path,
        searchParamKeys,
        method: request.method || 'GET',
        status: request.status || 200,
        delay: request.delay || 0,
        skip: false
      });
    });

    _defineProperty(this, "update", (item, fieldKey, value) => {
      var {
        url,
        method
      } = item;
      var {
        path,
        searchParamKeys
      } = (0, _url.getNormalizedUrl)(url);
      var itemKey = this.getKey(path, searchParamKeys, method);

      if ( // eslint-disable-next-line no-prototype-builtins
      this.requestMap.hasOwnProperty(itemKey) && // eslint-disable-next-line no-prototype-builtins
      this.requestMap[itemKey].hasOwnProperty(fieldKey)) {
        this.requestMap[itemKey][fieldKey] = value;
      }
    });

    _defineProperty(this, "matchMock", function (url) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
      var {
        path,
        searchParamKeys
      } = (0, _url.getNormalizedUrl)(url);

      for (var key in _this.requestMap) {
        var {
          url: requestUrl,
          method: requestMethod
        } = _this.requestMap[key];
        var {
          path: requestPath,
          searchParamKeys: requestSearchKeys
        } = (0, _url.getNormalizedUrl)(requestUrl);

        if ((0, _pathToRegexp.match)(requestPath)(path) && method == requestMethod && (0, _array.arrayEquals)(searchParamKeys, requestSearchKeys) && !_this.requestMap[key].skip) {
          return _this.requestMap[key];
        }
      }

      return null;
    });

    _defineProperty(this, "mockFetch", (input, options) => {
      var request = new _request.Request(input, options);
      var {
        url,
        method
      } = request;
      var matched = this.matchMock(url, method);

      if (matched) {
        var {
          response,
          status,
          delay = 0
        } = matched;
        return new Promise(resolve => {
          setTimeout(() => {
            if (typeof response === 'function') {
              resolve(new _response.Response(url, status, response(request)));
            } else {
              resolve(new _response.Response(url, status, response));
            }
          }, +delay);
        });
      } // eslint-disable-next-line no-restricted-globals


      return global.realFetch(input, options);
    });

    _defineProperty(this, "mockXhrRequest", xhr => {
      var {
        method,
        url,
        body
      } = xhr;
      var matched = this.matchMock(url, method);

      if (matched) {
        var {
          response,
          status,
          delay = 0
        } = matched;
        setTimeout(() => {
          if (typeof response === 'function') {
            var data = response(new _request.Request(url, {
              method,
              body
            }));
            xhr.respond(status, _response.defaultResponseHeaders, data);
          } else {
            xhr.respond(+status, _response.defaultResponseHeaders, JSON.stringify(response));
          }
        }, +delay);
      } else {
        // eslint-disable-next-line new-cap
        var realXhr = new global.realXMLHttpRequest();
        realXhr.open(method, url);

        realXhr.onreadystatechange = function onReadyStateChange() {
          if (realXhr.readyState === 4 && realXhr.status === 200) {
            xhr.respond(200, (0, _response.getResponseHeaderMap)(realXhr), realXhr.responseText);
          }
        };

        realXhr.send(body);

        var errorHandler = function errorHandler() {
          return 'Network failed';
        };

        realXhr.onerror = errorHandler;
        realXhr.ontimeout = errorHandler;
      }
    });

    _defineProperty(this, "restore", () => {
      this.requestMap = {};
    });

    this.MockXhr = (0, _mockXmlhttprequest.newMockXhr)();
    this.MockXhr.onSend = this.mockXhrRequest;
    global.realFetch = global.fetch;
    global.realXMLHttpRequest = global.XMLHttpRequest;
    global.fetch = this.mockFetch;
    global.XMLHttpRequest = this.MockXhr;
    this.requestMap = {};
  }

}

exports.Faker = Faker;

var _default = new Faker();

exports.default = _default;