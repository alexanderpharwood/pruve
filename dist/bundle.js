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
    return value && _typeof(value) === 'object' && value.constructor === Object;
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

    throw new TypeError('Subject of method has() must be an object');
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

  function validateEmail (value) {
    if (validateString(value) === true) {
      var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return expression.test(value.toLowerCase()) === true;
    }

    throw new TypeError('Subject of method email() must be a string');
  }

  function validateFloat (value) {
    return Number(value) === value && value % 1 !== 0;
  }

  function validateDefined (value) {
    return typeof value !== 'undefined';
  }

  function validateFunction (value) {
    return typeof value === 'function';
  }

  function validateUndefined (value) {
    return _typeof(value) === undefined;
  }

  var ValidationException =
  /*#__PURE__*/
  function (_TypeError) {
    _inherits(ValidationException, _TypeError);

    function ValidationException() {
      _classCallCheck(this, ValidationException);

      return _possibleConstructorReturn(this, _getPrototypeOf(ValidationException).apply(this, arguments));
    }

    return ValidationException;
  }(_wrapNativeSuper(TypeError));

  function getRuleProperties(rule) {
    var baseRule = rule,
        condition = null;

    if (rule.includes(':')) {
      baseRule = rule.substring(0, rule.indexOf(':'));
      condition = rule.substring(rule.indexOf(':') + 1);
    }

    return {
      rule: baseRule,
      condition: condition
    };
  }

  function validatePasses (values, rules) {
    if (validateObject(values) === false) {
      throw new TypeError('Value must be an object, with propeties to validate.');
    }

    if (validateObject(rules) === false) {
      throw new TypeError('Rules must be an object, with propeties to validate.');
    }

    var failing = [];

    for (var prop in rules) {
      var rulesList = rules[prop].split('.');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = rulesList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rule = _step.value;
          var ruleProps = getRuleProperties(rule);

          switch (ruleProps.rule) {
            case "string":
              if (validateString(values[prop]) === false) {
                failing.push(prop + ' must be a string');
              }

              break;

            case "bool":
              if (validateBool(values[prop]) === false) {
                failing.push(prop + ' must be a boolean');
              }

              break;

            case "number":
              if (validateNumber(values[prop]) === false) {
                failing.push(prop + ' is not a number');
              }

              break;

            case "int":
              if (validateInt(values[prop]) === false) {
                failing.push(prop + ' must be an integer');
              }

              break;

            case "float":
              if (validateFloat(values[prop]) === false) {
                failing.push(prop + ' must be a float');
              }

              break;

            case "array":
              if (validateArray(values[prop]) === false) {
                failing.push(prop + ' must be an array');
              }

              break;

            case "object":
              if (validateObject(values[prop]) === false) {
                failing.push(prop + ' must be an object');
              }

              break;

            case "date":
              if (validateDate(values[prop]) === false) {
                failing.push(prop + ' must be a date');
              }

              break;

            case "null":
              if (validateNull(values[prop]) === false) {
                failing.push(prop + ' must be null');
              }

              break;

            case "undefined":
              if (validateUndefined(values[prop]) === false) {
                failing.push(prop + ' must be undefined');
              }

              break;

            case "function":
              if (validateFunction(values[prop]) === false) {
                failing.push(prop + ' must be a function');
              }

              break;

            case "max":
              if (validateMax(values[prop], parseInt(ruleProps.condition)) === false) {
                failing.push(prop + ' must be less than ' + ruleProps.condition);
              }

              break;

            case "min":
              if (validateMin(values[prop], parseInt(ruleProps.condition)) === false) {
                failing.push(prop + ' must be greater than ' + ruleProps.condition);
              }

              break;

            case "defined":
              if (validateDefined(values[prop]) === false) {
                failing.push(prop + ' must be defined');
              }

              break;

            case "email":
              if (validateEmail(values[prop]) === false) {
                failing.push(prop + ' must be a valid email address');
              }

              break;

            case "has":
              if (validateHas(values[prop], ruleProps.condition) === false) {
                failing.push(prop + ' must have property: ' + ruleProps.condition);
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
    }

    return failing;
  }

  var Pruve =
  /*#__PURE__*/
  function () {
    function Pruve(value) {
      _classCallCheck(this, Pruve);

      this.value = value;
    }

    _createClass(Pruve, [{
      key: "passes",
      value: function passes(rules) {
        var failing = validatePasses(this.value, rules);

        if (failing.length > 0) {
          throw new ValidationException(failing);
        }
      }
    }, {
      key: "string",
      value: function string() {
        if (validateString(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not a string.');
      }
    }, {
      key: "bool",
      value: function bool() {
        if (validateBool(this.value) === true) {
          return this;
        }
        throw new ValidationException('Failed validation: ' + this.value + ' is not a boolean.');
      }
    }, {
      key: "number",
      value: function number() {
        if (validateNumber(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not a number.');
      }
    }, {
      key: "int",
      value: function int() {
        if (validateInt(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not an integer.');
      }
    }, {
      key: "float",
      value: function float() {
        if (validateFloat(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not a float.');
      }
    }, {
      key: "array",
      value: function array() {
        if (validateArray(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not an array.');
      }
    }, {
      key: "object",
      value: function object() {
        if (validateObject(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not an object.');
      }
    }, {
      key: "date",
      value: function date() {
        if (validateDate(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not a date.');
      }
    }, {
      key: "null",
      value: function _null() {
        if (validateNull(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: "' + this.value + '" is not null');
      }
    }, {
      key: "undefined",
      value: function undefined$1() {
        if (validateUndefined(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: "' + this.value + '" is not undefined');
      }
    }, {
      key: "function",
      value: function _function() {
        if (validateFunction(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not a function.');
      }
    }, {
      key: "max",
      value: function max(limit) {
        if (validateMax(this.value, limit) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: "' + this.value + '" is greater than ' + limit + '.');
      }
    }, {
      key: "min",
      value: function min(minimum) {
        if (validateMin(this.value, minimum) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: "' + this.value + '" is less than ' + minimum + '.');
      }
    }, {
      key: "defined",
      value: function defined() {
        if (validateDefined(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' is not defined.');
      }
    }, {
      key: "email",
      value: function email() {
        if (validateEmail(this.value) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: "' + this.value + '" is not a valid email address.');
      }
    }, {
      key: "has",
      value: function has(prop) {
        if (validateHas(this.value, prop) === true) {
          return this;
        }

        throw new ValidationException('Failed validation: ' + this.value + ' does not have property: ' + prop + '.');
      }
    }]);

    return Pruve;
  }();

  function index (validate) {
    return new Pruve(validate);
  }

  return index;

}));
