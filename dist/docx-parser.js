/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XML = function () {
  function XML(data) {
    _classCallCheck(this, XML);

    if (data instanceof Node) {
      this.data = data;
    } else if (typeof data === 'string') {
      var oParser = new DOMParser();
      var oDOM = oParser.parseFromString(data, "text/xml");
      this.data = oDOM.documentElement;
    } else {
      throw new Error('error create XML');
    }
  }

  _createClass(XML, [{
    key: 'query',
    value: function query(selector) {
      var el = this.data.querySelector(selector);
      if (el) {
        return new XML(el);
      }
      return null;
    }
  }, {
    key: 'queryAll',
    value: function queryAll(selector) {
      var nodes = this.data.querySelectorAll(selector);
      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          result.push(new XML(item));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    }
  }, {
    key: 'queryAttr',
    value: function queryAttr(selector) {
      var _selector$split = selector.split('@'),
          _selector$split2 = _slicedToArray(_selector$split, 2),
          s = _selector$split2[0],
          a = _selector$split2[1];

      var node = this.data;
      if (s) {
        node = node.querySelector(s);
      }
      if (node) {
        return node.getAttribute('w:' + a);
      }
      return null;
    }
  }, {
    key: 'children',
    get: function get() {
      var nodes = this.data.children;
      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          result.push(new XML(item));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
  }, {
    key: 'tagName',
    get: function get() {
      return this.data.localName;
    }
  }, {
    key: 'text',
    get: function get() {
      return this.data.textContent;
    }
  }]);

  return XML;
}();

exports.XML = XML;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Reader = __webpack_require__(2);

window.docxparser = { load: _Reader.load };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = undefined;

var _XML = __webpack_require__(0);

var _Prop = __webpack_require__(3);

var files = {}; // all files in zip
var prop = void 0;

function load(file) {
  var promise = new Promise(function (resolve, reject) {
    zip.createReader(new zip.TextReader(file), function (reader) {
      // get all entries from the zip
      reader.getEntries(function (entries) {
        if (entries.length) {
          var _loop = function _loop(i) {
            entries[i].getData(new zip.TextWriter(), function (data) {
              files[entries[i].filename] = data;
              if (i === 0) {
                resolve();
                reader.close();
              }
            });
          };

          for (var i = entries.length - 1; i >= 0; i--) {
            _loop(i);
          }
        }
      });
    }, function (error) {
      reject('read file error');
    });
  });

  return promise.then(function () {
    if (!files['word/document.xml']) {
      throw new Error('invalid docx file.');
    }
    return parse();
  });
}

function parse() {
  var data = files['word/document.xml'];
  if (files['word/styles.xml'] && files['word/numbering.xml']) {
    prop = new _Prop.Prop(files['word/styles.xml'], files['word/numbering.xml']);
  }

  var body = new _XML.XML(data).query('body');
  var div = document.createElement('div');
  div.classList.add('doc');
  extract(body, div);
  return div;
}

function extract(el, parentDom) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = el.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      switch (item.tagName) {
        case 'p':
          var p = document.createElement('p');
          ppr(item, p);
          parentDom.appendChild(p);
          extract(item, p);
          break;
        case 'r':
        case 'hyperlink':
          var r = document.createElement('pre');
          parentDom.appendChild(r);
          extract(item, r);
          break;
        case 't':
          var t = document.createTextNode(item.text);
          parentDom.appendChild(t);
          break;
        case 'tab':
          var tab = document.createTextNode('\t');
          parentDom.appendChild(tab);
          break;
        case 'tbl':
          var tbl = document.createElement('table');
          parentDom.appendChild(tbl);
          extract(item, tbl);
          break;
        case 'tr':
          var tr = document.createElement('tr');
          parentDom.appendChild(tr);
          extract(item, tr);
          break;
        case 'tc':
          var td = document.createElement('td');
          td.setAttribute('colspan', item.queryAttr(':scope>tcPr>gridSpan@val'));
          parentDom.appendChild(td);
          extract(item, td);
          break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * evaluate styles and numbering
 */
function ppr(node, el) {
  if (!prop) {
    return;
  }
  // deal numbering
  var i = prop.getNumbering(node);
  if (i) {
    var pre = document.createElement('pre');
    pre.appendChild(document.createTextNode(i));
    el.appendChild(pre);
  }
}

exports.load = load;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _XML = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prop = function () {
  function Prop(styles, numbering) {
    _classCallCheck(this, Prop);

    this.styles = new _XML.XML(styles);
    this.numbering = new _XML.XML(numbering);
    this.counter = {};
  }

  _createClass(Prop, [{
    key: 'getNumbering',
    value: function getNumbering(node) {
      var _this = this;

      var numpr = node.query(':scope>pPr>numPr');
      if (!numpr) {
        var sid = node.queryAttr(':scope>pPr>pStyle@val');
        if (!sid) {
          return;
        }
        var style = this.styles.query('style[*|styleId="' + sid + '"]');
        numpr = style.query(':scope>pPr>numPr');
      }
      if (!numpr) {
        return;
      }

      var ilvl = numpr.queryAttr('ilvl@val') || '0';
      var numid = numpr.queryAttr('numId@val');

      var num = this.numbering.query('num[*|numId="' + numid + '"]');
      var abstractNum = this.numbering.query('abstractNum[*|abstractNumId="' + num.queryAttr('abstractNumId@val') + '"]');

      var lvl = abstractNum.query('lvl[*|ilvl="' + ilvl + '"]');
      var start = lvl.queryAttr('start@val');

      var numfmt = lvl.queryAttr('numFmt@val');
      if (numfmt === 'none') {
        return;
      }
      if (numfmt === 'bullet') {
        return '\u2022 ';
      }

      this.counter[ilvl] = this.counter[ilvl] === undefined ? parseInt(start) : this.counter[ilvl] + 1;

      for (var i in this.counter) {
        if (parseInt(i) > parseInt(ilvl)) {
          delete this.counter[i];
        }
      }

      var lvlText = lvl.queryAttr('lvlText@val');
      var lvlOverride = num.query('lvlOverride[*|ilvl="' + ilvl + '"]');
      if (lvlOverride) {
        this.counter[ilvl] = parseInt(lvlOverride.queryAttr('startOverride@val'));
      }
      lvlText = lvlText.replace(/%(\d)/g, function (match, p1) {
        if (parseInt(p1) === parseInt(ilvl) + 1) {
          return _this.counter[ilvl];
        }
        if (parseInt(p1) <= parseInt(ilvl)) {
          return _this.counter[parseInt(p1) - 1 + ''];
        }
        return '';
      });

      return lvlText + ' ';
    }
  }]);

  return Prop;
}();

exports.Prop = Prop;

/***/ })
/******/ ]);
//# sourceMappingURL=docx-parser.js.map