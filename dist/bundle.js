(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.pruve = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function validateInt (value) {
    return Number(value) === value && value % 1 === 0;
  }

  function validateArray (value) {
    return Array.isArray(value) === true;
  }

  function validateNumber (value) {
    return typeof value === 'number' && isFinite(value);
  }

  function validateObject (value) {
    return value && _typeof(value) === 'object' && value instanceof Object;
  }

  function validateString (value) {
    return typeof value === 'string' || value instanceof String;
  }

  function validateMax (value, limit) {
    if (validateInt(limit) === false) {
      throw new TypeError('Method max() requires parameter 1 to be an integer');
    }

    if (validateNumber(value) === true) {
      return value <= limit;
    }

    if (validateString(value) === true || validateArray(value) === true) {
      return value.length <= limit;
    }

    if (validateObject(value) === true) {
      return Object.keys(value).length <= limit;
    }

    return false;
  }

  function validateMin (value, minimum) {
    if (validateInt(minimum) === false) {
      throw new TypeError('Method min() requires parameter 1 to be an integer');
    }

    if (validateNumber(value) === true) {
      return value >= minimum;
    }

    if (validateString(value) === true || validateArray(value) === true) {
      return value.length >= minimum;
    }

    if (validateObject(value) === true) {
      return Object.keys(value).length >= minimum;
    }

    return false;
  }

  function validateHas (value, prop) {
    if (validateObject(value) === true) {
      return typeof value[prop] !== 'undefined';
    }

    return false;
  }

  function validateNull (value) {
    return value === null;
  }

  function validateBool (value) {
    return typeof value === 'boolean';
  }

  function validateDate (value) {
    return value instanceof Date;
  }

  function validateFile (value) {
    if (typeof File === 'undefined') {
      throw new ReferenceError('File is undefined');
    }

    return value instanceof File;
  }

  function validateBlob (value) {
    if (typeof Blob === 'undefined') {
      throw new ReferenceError('Blob is undefined');
    }

    return value instanceof Blob;
  }

  function validateEmail (value) {
    if (validateString(value) === true) {
      var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return expression.test(value.toLowerCase()) === true;
    }

    return false;
  }

  function validateFloat (value) {
    return Number(value) === value && value % 1 !== 0;
  }

  function validateBetween (value, min, max) {
    if (validateInt(min) === false || validateInt(max) === false) {
      throw new TypeError('Method between() requires parameter 1 and 2 to be an integer');
    }

    if (validateNumber(value) === true) {
      return value >= min && value <= max;
    }

    if (validateString(value) === true || validateArray(value) === true) {
      return value.length >= min && value.length <= max;
    }

    if (validateObject(value) === true) {
      return Object.keys(value).length >= min && Object.keys(value).length <= max;
    }

    return false;
  }

  function validateDefined (value) {
    return typeof value !== 'undefined';
  }

  function validatePattern (value, pattern) {
    var expression = new RegExp(pattern);
    return expression.test(value) === true;
  }

  function validateFunction (value) {
    return typeof value === 'function';
  }

  function validateUndefined (value) {
    return _typeof(value) === undefined;
  }

  var _default =
  /*#__PURE__*/
  function () {
    function _default() {
      _classCallCheck(this, _default);
    }

    _createClass(_default, null, [{
      key: "stringValidationError",
      value: function stringValidationError(value) {
        return '"' + value + '" is not a string';
      }
    }, {
      key: "boolValidationError",
      value: function boolValidationError(value) {
        return '"' + value + '" is not a boolean';
      }
    }, {
      key: "numberValidationError",
      value: function numberValidationError(value) {
        return '"' + value + '" is not a number';
      }
    }, {
      key: "intValidationError",
      value: function intValidationError(value) {
        return '"' + value + '" is not an integer';
      }
    }, {
      key: "floatValidationError",
      value: function floatValidationError(value) {
        return '"' + value + '" is not a float';
      }
    }, {
      key: "arrayValidationError",
      value: function arrayValidationError(value) {
        return '"' + value + '" is not an array';
      }
    }, {
      key: "objectValidationError",
      value: function objectValidationError(value) {
        return '"' + value + '" is not an object';
      }
    }, {
      key: "dateValidationError",
      value: function dateValidationError(value) {
        return '"' + value + '" is not a date';
      }
    }, {
      key: "nullValidationError",
      value: function nullValidationError(value) {
        return '"' + value + '" is not null';
      }
    }, {
      key: "undefinedValidationError",
      value: function undefinedValidationError(value) {
        return '"' + value + '" is not undefined';
      }
    }, {
      key: "functionValidationError",
      value: function functionValidationError(value) {
        return '"' + value + '" is not a function';
      }
    }, {
      key: "maxValidationError",
      value: function maxValidationError(value, max) {
        return '"' + value + '" is greater in length or value than ' + max;
      }
    }, {
      key: "minValidationError",
      value: function minValidationError(value, min) {
        return '"' + value + '" is less in length or value than ' + min;
      }
    }, {
      key: "betweenValidationError",
      value: function betweenValidationError(value, min, max) {
        return 'The length or value of "' + value + '" is not between ' + min + ' and ' + max;
      }
    }, {
      key: "definedValidationError",
      value: function definedValidationError(value) {
        return '"' + value + '" is not defined';
      }
    }, {
      key: "emailValidationError",
      value: function emailValidationError(value) {
        return '"' + value + '" is not a valid email address';
      }
    }, {
      key: "hasValidationError",
      value: function hasValidationError(value, prop) {
        return '"' + value + '" does not contain property "' + prop + '"';
      }
    }, {
      key: "fileValidationError",
      value: function fileValidationError(value) {
        return '"' + value + '" is not a File';
      }
    }, {
      key: "blobValidationError",
      value: function blobValidationError(value) {
        return '"' + value + '" is not a Blob';
      }
    }, {
      key: "fileReaderValidationError",
      value: function fileReaderValidationError(value) {
        return '"' + value + '" is not a FileReader';
      }
    }, {
      key: "patternValidationError",
      value: function patternValidationError(value) {
        return '"' + value + '" is not valid';
      }
    }]);

    return _default;
  }();

  var ValidationException =
  /*#__PURE__*/
  function (_TypeError) {
    _inherits(ValidationException, _TypeError);

    function ValidationException(value, errors) {
      var _this;

      _classCallCheck(this, ValidationException);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ValidationException).call(this, 'Validation failed'));
      _this.value = value;
      _this.errors = errors;
      return _this;
    }

    return ValidationException;
  }(_wrapNativeSuper(TypeError));

  function getRuleProperties(rule) {
    var baseRule = rule,
        conditions = null;

    if (rule.includes(':')) {
      baseRule = rule.substring(0, rule.indexOf(':'));
      conditions = rule.substring(rule.indexOf(':') + 1).split(',');
    }

    return {
      rule: baseRule,
      conditions: conditions
    };
  }

  function addError(failing, key, error) {
    if (validateArray(failing[key]) === false) {
      failing[key] = [];
    }

    failing[key].push(error);
    return failing[key];
  }

  function messageInContext(messages, key, rule) {
    for (var message in messages) {
      var mesageKeySplit = message.split('.');
      var contextMessage = mesageKeySplit.find(function (propertyRule) {
        return propertyRule === rule;
      });

      if (typeof contextMessage !== 'undefined' && mesageKeySplit[0] === key) {
        return messages[message];
      }

      if (mesageKeySplit.length === 1 && mesageKeySplit[0] === key) {
        return messages[message];
      }
    }

    return null;
  }

  function assessValueAgainstRuleset(value, key, ruleset, messages) {
    var failing = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ruleset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;
        var ruleProps = getRuleProperties(rule);

        switch (ruleProps.rule) {
          case "string":
            if (validateString(value) === false) {
              var message = messageInContext(messages, key, ruleProps.rule) || _default.stringValidationError(value);
              failing[key] = addError(failing, key, message);
            }

            break;

          case "bool":
            if (validateBool(value) === false) {
              var _message = messageInContext(messages, key, ruleProps.rule) || _default.booleanValidationError(value);

              failing[key] = addError(failing, key, _message);
            }

            break;

          case "number":
            if (validateNumber(value) === false) {
              var _message2 = messageInContext(messages, key, ruleProps.rule) || _default.numberValidationError(value);

              failing[key] = addError(failing, key, _message2);
            }

            break;

          case "int":
            if (validateInt(value) === false) {
              var _message3 = messageInContext(messages, key, ruleProps.rule) || _default.intValidationError(value);

              failing[key] = addError(failing, key, _message3);
            }

            break;

          case "float":
            if (validateFloat(value) === false) {
              var _message4 = messageInContext(messages, key, ruleProps.rule) || _default.intValidationError(value);

              failing[key] = addError(failing, key, _message4);
            }

            break;

          case "array":
            if (validateArray(value) === false) {
              var _message5 = messageInContext(messages, key, ruleProps.rule) || _default.arrayValidationError(value);

              failing[key] = addError(failing, key, _message5);
            }

            break;

          case "object":
            if (validateObject(value) === false) {
              var _message6 = messageInContext(messages, key, ruleProps.rule) || _default.objectValidationError(value);

              failing[key] = addError(failing, key, _message6);
            }

            break;

          case "date":
            if (validateDate(value) === false) {
              var _message7 = messageInContext(messages, key, ruleProps.rule) || _default.dateValidationError(value);

              failing[key] = addError(failing, key, _message7);
            }

            break;

          case "null":
            if (validateNull(value) === false) {
              var _message8 = messageInContext(messages, key, ruleProps.rule) || _default.nullValidationError(value);

              failing[key] = addError(failing, key, _message8);
            }

            break;

          case "undefined":
            if (validateUndefined(value) === false) {
              var _message9 = messageInContext(messages, key, ruleProps.rule) || _default.undefinedValidationError(value);

              failing[key] = addError(failing, key, _message9);
            }

            break;

          case "function":
            if (validateFunction(value) === false) {
              var _message10 = messageInContext(messages, key, ruleProps.rule) || _default.functionValidationError(value);

              failing[key] = addError(failing, key, _message10);
            }

            break;

          case "max":
            if (validateMax(value, parseInt(ruleProps.conditions[0])) === false) {
              var _message11 = messageInContext(messages, key, ruleProps.rule) || _default.maxValidationError(value, ruleProps.conditions[0]);

              failing[key] = addError(failing, key, _message11);
            }

            break;

          case "min":
            if (validateMin(value, parseInt(ruleProps.conditions[0])) === false) {
              var _message12 = messageInContext(messages, key, ruleProps.rule) || _default.minValidationError(value, ruleProps.conditions[0]);

              failing[key] = addError(failing, key, _message12);
            }

            break;

          case "between":
            if (validateBetween(value, parseInt(ruleProps.conditions[0]), parseInt(ruleProps.conditions[1])) === false) {
              var _message13 = messageInContext(messages, key, ruleProps.rule) || _default.betweenValidationError(value, ruleProps.conditions[0], ruleProps.conditions[1]);

              failing[key] = addError(failing, key, _message13);
            }

            break;

          case "defined":
            if (validateDefined(value) === false) {
              var _message14 = messageInContext(messages, key, ruleProps.rule) || _default.definedValidationError(value);

              failing[key] = addError(failing, key, _message14);
            }

            break;

          case "email":
            if (validateEmail(value) === false) {
              var _message15 = messageInContext(messages, key, ruleProps.rule) || _default.emailValidationError(value);

              failing[key] = addError(failing, key, _message15);
            }

            break;

          case "has":
            if (validateHas(value, ruleProps.conditions[0]) === false) {
              var _message16 = messageInContext(messages, key, ruleProps.rule) || _default.hasValidationError(value, ruleProps.conditions[0]);

              failing[key] = addError(failing, key, _message16);
            }

            break;

          case "pattern":
            if (validatePattern(value, ruleProps.conditions[0]) === false) {
              var _message17 = messageInContext(messages, key, ruleProps.rule) || _default.patternValidationError(value, ruleProps.conditions[0]);

              failing[key] = addError(failing, key, _message17);
            }

            break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return failing;
  }

  function validatePasses (values, rules, messages) {
    if (validateObject(values) === false && validateArray(values) === false) {
      throw new TypeError('Value must be an object or array, with propeties to validate.');
    }

    if (validateObject(rules) === false) {
      throw new TypeError('Rules must be an object, with propeties to validate.');
    }

    var failing = {};

    for (var prop in rules) {
      var ruleset = validateString(rules[prop]) ? rules[prop].split('.') : rules[prop];

      if (prop === '*') {
        for (var key in values) {
          var result = assessValueAgainstRuleset(values[key], key, ruleset, messages);

          if (Object.keys(result).length > 0) {
            if (typeof failing[key] !== 'undefined') {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = result[key][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var failure = _step2.value;
                  failing[key].push(failure);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            } else {
              Object.assign(failing, result);
            }
          }
        }

        continue;
      }

      if (prop in values === false && ruleset.includes('sometimes')) {
        continue;
      }

      var result = assessValueAgainstRuleset(values[prop], prop, ruleset, messages);

      if (Object.keys(result).length > 0) {
        if (typeof failing[prop] !== 'undefined') {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = result[prop][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _failure = _step3.value;
              failing[prop].push(_failure);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else {
          Object.assign(failing, result);
        }
      }
    }

    return failing;
  }

  function validateFileReader (value) {
    if (typeof FileReader === 'undefined') {
      throw new ReferenceError('FileReader is undefined');
    }

    return value instanceof FileReader;
  }

  var Pruve =
  /*#__PURE__*/
  function () {
    function Pruve(value) {
      _classCallCheck(this, Pruve);

      this.value = value;
      this.errors = [];
    }

    _createClass(Pruve, [{
      key: "addError",
      value: function addError(error) {
        this.errors.push(error);
      }
    }, {
      key: "try",
      value: function _try() {
        if (this.errors.length > 0 || Object.keys(this.errors).length > 0) {
          throw new ValidationException(this.value, this.errors);
        }
      }
    }, {
      key: "passes",
      value: function passes(rules) {
        var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var failing = validatePasses(this.value, rules, messages);

        if (Object.keys(failing).length > 0) {
          for (var failure in failing) {
            failing[failure] = _toConsumableArray(new Set(failing[failure]));
          }

          this.errors = failing;
        }

        return this;
      }
    }, {
      key: "pattern",
      value: function pattern(expression) {
        if (validatePattern(this.value, expression) !== true) {
          this.addError(_default.patternValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "is",
      value: function is() {}
    }, {
      key: "in",
      value: function _in() {}
    }, {
      key: "string",
      value: function string() {
        if (validateString(this.value) !== true) {
          this.addError(_default.stringValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "bool",
      value: function bool() {
        if (validateBool(this.value) !== true) {
          this.addError(_default.boolValidationError(this.value));
        }
        return this;
      }
    }, {
      key: "number",
      value: function number() {
        if (validateNumber(this.value) !== true) {
          this.addError(_default.numberValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "int",
      value: function int() {
        if (validateInt(this.value) !== true) {
          this.addError(_default.intValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "float",
      value: function float() {
        if (validateFloat(this.value) !== true) {
          this.addError(_default.floatValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "array",
      value: function array() {
        if (validateArray(this.value) !== true) {
          this.addError(_default.arrayValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "object",
      value: function object() {
        if (validateObject(this.value) !== true) {
          this.addError(_default.objectValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "date",
      value: function date() {
        if (validateDate(this.value) !== true) {
          this.addError(_default.dateValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "null",
      value: function _null() {
        if (validateNull(this.value) !== true) {
          this.addError(_default.nullValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "undefined",
      value: function undefined$1() {
        if (validateUndefined(this.value) !== true) {
          this.addError(_default.undefinedValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "function",
      value: function _function() {
        if (validateFunction(this.value) !== true) {
          this.addError(_default.functionValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "max",
      value: function max(_max) {
        if (validateMax(this.value, _max) !== true) {
          this.addError(_default.maxValidationError(this.value, _max));
        }

        return this;
      }
    }, {
      key: "min",
      value: function min(_min) {
        if (validateMin(this.value, _min) !== true) {
          this.addError(_default.minValidationError(this.value, _min));
        }

        return this;
      }
    }, {
      key: "between",
      value: function between(min, max) {
        if (validateBetween(this.value, min, max) !== true) {
          this.addError(_default.betweenValidationError(this.value, min, max));
        }

        return this;
      }
    }, {
      key: "defined",
      value: function defined() {
        if (validateDefined(this.value) !== true) {
          this.addError(_default.definedValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "email",
      value: function email() {
        if (validateEmail(this.value) !== true) {
          this.addError(_default.emailValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "has",
      value: function has(prop) {
        if (validateHas(this.value, prop) !== true) {
          this.addError(_default.hasValidationError(this.value, prop));
        }

        return this;
      }
    }, {
      key: "file",
      value: function file() {
        if (validateFile(this.value) !== true) {
          this.addError(_default.fileValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "blob",
      value: function blob() {
        if (validateBlob(this.value) !== true) {
          this.addError(_default.blobValidationError(this.value));
        }

        return this;
      }
    }, {
      key: "fileReader",
      value: function fileReader() {
        if (validateFileReader(this.value) !== true) {
          this.addError(_default.fileReaderValidationError(this.value));
        }

        return this;
      }
    }]);

    return Pruve;
  }();

  function index (validate) {
    return new Pruve(validate);
  }

  return index;

}));
