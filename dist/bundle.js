(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/helpers/toConsumableArray'), require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/typeof'), require('@babel/runtime/helpers/inherits'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/wrapNativeSuper')) :
	typeof define === 'function' && define.amd ? define(['@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/helpers/toConsumableArray', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/typeof', '@babel/runtime/helpers/inherits', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/wrapNativeSuper'], factory) :
	(global = global || self, global.pruve = factory(global._regeneratorRuntime, global._asyncToGenerator, global._toConsumableArray, global._classCallCheck, global._createClass, global._typeof, global._inherits, global._possibleConstructorReturn, global._getPrototypeOf, global._wrapNativeSuper));
}(this, function (_regeneratorRuntime, _asyncToGenerator, _toConsumableArray, _classCallCheck, _createClass, _typeof, _inherits, _possibleConstructorReturn, _getPrototypeOf, _wrapNativeSuper) { 'use strict';

	_regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
	_asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
	_toConsumableArray = _toConsumableArray && _toConsumableArray.hasOwnProperty('default') ? _toConsumableArray['default'] : _toConsumableArray;
	_classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
	_createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
	_typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;
	_inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;
	_possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
	_getPrototypeOf = _getPrototypeOf && _getPrototypeOf.hasOwnProperty('default') ? _getPrototypeOf['default'] : _getPrototypeOf;
	_wrapNativeSuper = _wrapNativeSuper && _wrapNativeSuper.hasOwnProperty('default') ? _wrapNativeSuper['default'] : _wrapNativeSuper;

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

	function validateDefined (value) {
	  return typeof value !== 'undefined';
	}

	function validatePattern (value, pattern) {
	  //Remove the preceeding slash
	  pattern = pattern.substring(1); // If there is a slash at the end (no flags specified) remove it

	  if (pattern.endsWith('/')) {
	    pattern = pattern.substring(0, pattern.length - 1);
	  }

	  var source = pattern;
	  var flags = ''; // If there are flags at the end, extract them, and remove from the pattern

	  if (/\/[gimsuy]+$/.test(pattern)) {
	    source = pattern.substring(0, pattern.lastIndexOf('/'));
	    flags = pattern.substring(pattern.lastIndexOf('/') + 1);
	  } // Ressemble the into a proper RexExp object with appropriate flags


	  var expression = new RegExp(source, flags);
	  return expression.test(value) === true;
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

	function validateEachHas (value, prop) {
	  var passing = true;

	  if (validateObject(value) === false) {
	    return false;
	  }

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var check = _step.value;

	      if (validateObject(check) === false) {
	        return false;
	      }

	      passing = typeof check[prop] !== 'undefined';
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

	  return passing;
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
	    key: "customMethodValidationError",
	    value: function customMethodValidationError(value) {
	      return 'Invalid value provided';
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
	    key: "eachHasValidationError",
	    value: function eachHasValidationError(value, prop) {
	      return 'All children must contain property "' + prop + '"';
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

	function validateFunction (value) {
	  return typeof value === 'function';
	}

	function validateUndefined (value) {
	  return _typeof(value) === undefined;
	}

	function validateFileReader (value) {
	  if (typeof FileReader === 'undefined') {
	    throw new ReferenceError('FileReader is undefined');
	  }

	  return value instanceof FileReader;
	}

	function _createSuper(Derived) {
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

	  return function () {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (isNativeReflectConstruct()) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	var ValidationException =
	/*#__PURE__*/
	function (_TypeError) {
	  _inherits(ValidationException, _TypeError);

	  var _super = _createSuper(ValidationException);

	  function ValidationException(value, errors) {
	    var _this;

	    _classCallCheck(this, ValidationException);

	    _this = _super.call(this, 'Validation failed');
	    _this.value = value;
	    _this.errors = errors;
	    return _this;
	  }

	  return ValidationException;
	}(
	/*#__PURE__*/
	_wrapNativeSuper(TypeError));

	function validateCustomMethod (value, method) {
	  return method(value);
	}

	var _default$1 =
	/*#__PURE__*/
	function () {
	  function _default$1(addError, addPending, values, rules, messages) {
	    _classCallCheck(this, _default$1);

	    this.addError = addError;
	    this.addPending = addPending;
	    this.values = values;
	    this.rules = rules;
	    this.messages = messages;
	  }
	  /**
	   * Perform the validation
	   * @param  {[type]} values   [description]
	   * @param  {[type]} rules    [description]
	   * @param  {[type]} messages [description]
	   * @return {[type]}          [description]
	   */


	  _createClass(_default$1, [{
	    key: "validate",
	    value: function validate() {
	      if (validateObject(this.values) === false && validateArray(this.values) === false) {
	        throw new TypeError('Value must be an object or array, with propeties to validate.');
	      }

	      if (validateObject(this.rules) === false) {
	        throw new TypeError('Rules must be an object, with propeties to validate.');
	      }

	      for (var prop in this.rules) {
	        var ruleset = validateString(this.rules[prop]) ? this.rules[prop].split('.') : this.rules[prop];

	        if (prop in this.values === false && ruleset.includes('sometimes')) {
	          continue;
	        }

	        if (prop === '*') {
	          for (var key in this.values) {
	            this.assessValueAgainstRuleset(this.values[key], key, ruleset);
	          }

	          continue;
	        }

	        this.assessValueAgainstRuleset(this.values[prop], prop, ruleset);
	      }
	    }
	    /**
	     * Get the properties of the rule from the rule string
	     * @param  {String} rule
	     * @return {Object}
	     */

	  }, {
	    key: "getRulePropertiesFromString",
	    value: function getRulePropertiesFromString(rule) {
	      var baseRule = rule,
	          conditions = null;

	      if (rule.includes(':')) {
	        baseRule = rule.substring(0, rule.indexOf(':'));
	        conditions = rule.substring(rule.indexOf(':') + 1); // Only the following rules accept multiple params

	        if (baseRule === 'between') {
	          conditions = conditions.split(',');
	        }
	      }

	      return {
	        rule: baseRule,
	        conditions: conditions
	      };
	    }
	    /**
	     * Check for a custom message in the context of the current property, with a fallback to the error factory
	     * @param  {String} key
	     * @param  {String} rule
	     * @return {String|null}
	     */

	  }, {
	    key: "messageInContext",
	    value: function messageInContext(key, rule) {
	      for (var message in this.messages) {
	        var mesageKeySplit = message.split('.');
	        var contextMessage = mesageKeySplit.find(function (propertyRule) {
	          return propertyRule === rule;
	        });

	        if (typeof contextMessage !== 'undefined' && mesageKeySplit[0] === key) {
	          return this.messages[message];
	        }

	        if (mesageKeySplit.length === 1 && mesageKeySplit[0] === key) {
	          return this.messages[message];
	        }
	      }

	      return null;
	    }
	    /**
	     * [assessValueAgainstRuleset description]
	     * @param {[type]} value    [description]
	     * @param {[type]} key      [description]
	     * @param {[type]} ruleset  [description]
	     * @param {[type]} messages [description]
	     */

	  }, {
	    key: "assessValueAgainstRuleset",
	    value: function assessValueAgainstRuleset(value, key, ruleset) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = ruleset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var rule = _step.value;

	          if (_typeof(rule) === 'object') {
	            for (var testKey in rule) {
	              var promiseOrFunction = rule[testKey];

	              if (typeof promiseOrFunction === 'function') {
	                // If it is a function, execute it
	                promiseOrFunction = validateCustomMethod(value, rule[testKey]);
	              } // Get the potential error for later use


	              var potentialError = this.messageInContext(key, testKey) || _default.customMethodValidationError(value);

	              if (promiseOrFunction === false) {
	                this.addError(key, potentialError);
	                continue;
	              } // If we have a promise(ish) object, add it to pending for later resolution


	              if (_typeof(promiseOrFunction) === 'object' && typeof promiseOrFunction.then !== 'undefined') {
	                this.addPending(key, promiseOrFunction, potentialError);
	              }
	            }

	            continue;
	          }

	          var ruleProps = this.getRulePropertiesFromString(rule);

	          switch (ruleProps.rule) {
	            case "string":
	              if (validateString(value) === false) {
	                var message = this.messageInContext(key, ruleProps.rule) || _default.stringValidationError(value);
	                this.addError(key, message);
	              }

	              break;

	            case "bool":
	              if (validateBool(value) === false) {
	                var _message = this.messageInContext(key, ruleProps.rule) || _default.booleanValidationError(value);

	                this.addError(key, _message);
	              }

	              break;

	            case "number":
	              if (validateNumber(value) === false) {
	                var _message2 = this.messageInContext(key, ruleProps.rule) || _default.numberValidationError(value);

	                this.addError(key, _message2);
	              }

	              break;

	            case "int":
	              if (validateInt(value) === false) {
	                var _message3 = this.messageInContext(key, ruleProps.rule) || _default.intValidationError(value);

	                this.addError(key, _message3);
	              }

	              break;

	            case "float":
	              if (validateFloat(value) === false) {
	                var _message4 = this.messageInContext(key, ruleProps.rule) || _default.intValidationError(value);

	                this.addError(key, _message4);
	              }

	              break;

	            case "array":
	              if (validateArray(value) === false) {
	                var _message5 = this.messageInContext(key, ruleProps.rule) || _default.arrayValidationError(value);

	                this.addError(key, _message5);
	              }

	              break;

	            case "object":
	              if (validateObject(value) === false) {
	                var _message6 = this.messageInContext(key, ruleProps.rule) || _default.objectValidationError(value);

	                this.addError(key, _message6);
	              }

	              break;

	            case "date":
	              if (validateDate(value) === false) {
	                var _message7 = this.messageInContext(key, ruleProps.rule) || _default.dateValidationError(value);

	                this.addError(key, _message7);
	              }

	              break;

	            case "null":
	              if (validateNull(value) === false) {
	                var _message8 = this.messageInContext(key, ruleProps.rule) || _default.nullValidationError(value);

	                this.addError(key, _message8);
	              }

	              break;

	            case "undefined":
	              if (validateUndefined(value) === false) {
	                var _message9 = this.messageInContext(key, ruleProps.rule) || _default.undefinedValidationError(value);

	                this.addError(key, _message9);
	              }

	              break;

	            case "function":
	              if (validateFunction(value) === false) {
	                var _message10 = this.messageInContext(key, ruleProps.rule) || _default.functionValidationError(value);

	                this.addError(key, _message10);
	              }

	              break;

	            case "max":
	              if (validateMax(value, parseInt(ruleProps.conditions)) === false) {
	                var _message11 = this.messageInContext(key, ruleProps.rule) || _default.maxValidationError(value, ruleProps.conditions);

	                this.addError(key, _message11);
	              }

	              break;

	            case "min":
	              if (validateMin(value, parseInt(ruleProps.conditions)) === false) {
	                var _message12 = this.messageInContext(key, ruleProps.rule) || _default.minValidationError(value, ruleProps.conditions);

	                this.addError(key, _message12);
	              }

	              break;

	            case "between":
	              if (validateBetween(value, parseInt(ruleProps.conditions[0]), parseInt(ruleProps.conditions[1])) === false) {
	                var _message13 = this.messageInContext(key, ruleProps.rule) || _default.betweenValidationError(value, ruleProps.conditions[0], ruleProps.conditions[1]);

	                this.addError(key, _message13);
	              }

	              break;

	            case "defined":
	              if (validateDefined(value) === false) {
	                var _message14 = this.messageInContext(key, ruleProps.rule) || _default.definedValidationError(value);

	                this.addError(key, _message14);
	              }

	              break;

	            case "email":
	              if (validateEmail(value) === false) {
	                var _message15 = this.messageInContext(key, ruleProps.rule) || _default.emailValidationError(value);

	                this.addError(key, _message15);
	              }

	              break;

	            case "has":
	              if (validateHas(value, ruleProps.conditions) === false) {
	                var _message16 = this.messageInContext(key, ruleProps.rule) || _default.hasValidationError(value, ruleProps.conditions);

	                this.addError(key, _message16);
	              }

	              break;

	            case "eachHas":
	              if (validateEachHas(value, ruleProps.conditions) === false) {
	                var _message17 = this.messageInContext(key, ruleProps.rule) || _default.eachHasValidationError(value, ruleProps.conditions);

	                this.addError(key, _message17);
	              }

	              break;

	            case "pattern":
	              if (validatePattern(value, ruleProps.conditions) === false) {
	                var _message18 = this.messageInContext(key, ruleProps.rule) || _default.patternValidationError(value, ruleProps.conditions);

	                this.addError(key, _message18);
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
	  }]);

	  return _default$1;
	}();

	var Pruve =
	/*#__PURE__*/
	function () {
	  function Pruve(value) {
	    _classCallCheck(this, Pruve);

	    this.value = value;
	    this._anonymousErrors = [];
	    this._namedErrors = {};
	    this.pending = [];
	  }

	  _createClass(Pruve, [{
	    key: "addNamedError",
	    value: function addNamedError(key, error) {
	      if (typeof this._namedErrors[key] === 'undefined') {
	        this._namedErrors[key] = [];
	      }

	      this._namedErrors[key].push(error); // Remove duplicate error messages


	      for (var _key in this._namedErrors) {
	        this._namedErrors[_key] = _toConsumableArray(new Set(this._namedErrors[_key]));
	      }
	    }
	  }, {
	    key: "addAnonymousError",
	    value: function addAnonymousError(error) {
	      this._anonymousErrors.push(error); // Remove duplicate error messages


	      this._anonymousErrors = _toConsumableArray(new Set(this._anonymousErrors));
	    }
	  }, {
	    key: "addPending",
	    value: function addPending(key, promise, potentialError) {
	      this.pending.push({
	        key: key,
	        promise: promise,
	        potentialError: potentialError
	      });
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
	      var namedValidator = new _default$1(this.addNamedError.bind(this), this.addPending.bind(this), this.value, rules, messages);
	      namedValidator.validate();
	      return this;
	    }
	  }, {
	    key: "then",
	    value: function () {
	      var _then = _asyncToGenerator(
	      /*#__PURE__*/
	      _regeneratorRuntime.mark(function _callee(next) {
	        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pendingItem, result;

	        return _regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _iteratorNormalCompletion = true;
	                _didIteratorError = false;
	                _iteratorError = undefined;
	                _context.prev = 3;
	                _iterator = this.pending[Symbol.iterator]();

	              case 5:
	                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                  _context.next = 20;
	                  break;
	                }

	                pendingItem = _step.value;
	                _context.prev = 7;
	                _context.next = 10;
	                return pendingItem.promise;

	              case 10:
	                result = _context.sent;

	                if (result === false) {
	                  this.addNamedError(pendingItem.key, pendingItem.potentialError);
	                }

	                _context.next = 17;
	                break;

	              case 14:
	                _context.prev = 14;
	                _context.t0 = _context["catch"](7);
	                this.addNamedError(pendingItem.key, pendingItem.potentialError);

	              case 17:
	                _iteratorNormalCompletion = true;
	                _context.next = 5;
	                break;

	              case 20:
	                _context.next = 26;
	                break;

	              case 22:
	                _context.prev = 22;
	                _context.t1 = _context["catch"](3);
	                _didIteratorError = true;
	                _iteratorError = _context.t1;

	              case 26:
	                _context.prev = 26;
	                _context.prev = 27;

	                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	                  _iterator["return"]();
	                }

	              case 29:
	                _context.prev = 29;

	                if (!_didIteratorError) {
	                  _context.next = 32;
	                  break;
	                }

	                throw _iteratorError;

	              case 32:
	                return _context.finish(29);

	              case 33:
	                return _context.finish(26);

	              case 34:
	                this["try"]();
	                return _context.abrupt("return", next(this));

	              case 36:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[3, 22, 26, 34], [7, 14], [27,, 29, 33]]);
	      }));

	      function then(_x) {
	        return _then.apply(this, arguments);
	      }

	      return then;
	    }()
	  }, {
	    key: "pattern",
	    value: function pattern(expression) {
	      if (validatePattern(this.value, expression) !== true) {
	        this.addAnonymousError(_default.patternValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "string",
	    value: function string() {
	      if (validateString(this.value) !== true) {
	        this.addAnonymousError(_default.stringValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "bool",
	    value: function bool() {
	      if (validateBool(this.value) !== true) {
	        this.addAnonymousError(_default.boolValidationError(this.value));
	      }
	      return this;
	    }
	  }, {
	    key: "number",
	    value: function number() {
	      if (validateNumber(this.value) !== true) {
	        this.addAnonymousError(_default.numberValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "int",
	    value: function int() {
	      if (validateInt(this.value) !== true) {
	        this.addAnonymousError(_default.intValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "float",
	    value: function float() {
	      if (validateFloat(this.value) !== true) {
	        this.addAnonymousError(_default.floatValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "array",
	    value: function array() {
	      if (validateArray(this.value) !== true) {
	        this.addAnonymousError(_default.arrayValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "object",
	    value: function object() {
	      if (validateObject(this.value) !== true) {
	        this.addAnonymousError(_default.objectValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "date",
	    value: function date() {
	      if (validateDate(this.value) !== true) {
	        this.addAnonymousError(_default.dateValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "null",
	    value: function _null() {
	      if (validateNull(this.value) !== true) {
	        this.addAnonymousError(_default.nullValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "undefined",
	    value: function undefined$1() {
	      if (validateUndefined(this.value) !== true) {
	        this.addAnonymousError(_default.undefinedValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "function",
	    value: function _function() {
	      if (validateFunction(this.value) !== true) {
	        this.addAnonymousError(_default.functionValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "max",
	    value: function max(_max) {
	      if (validateMax(this.value, _max) !== true) {
	        this.addAnonymousError(_default.maxValidationError(this.value, _max));
	      }

	      return this;
	    }
	  }, {
	    key: "min",
	    value: function min(_min) {
	      if (validateMin(this.value, _min) !== true) {
	        this.addAnonymousError(_default.minValidationError(this.value, _min));
	      }

	      return this;
	    }
	  }, {
	    key: "between",
	    value: function between(min, max) {
	      if (validateBetween(this.value, min, max) !== true) {
	        this.addAnonymousError(_default.betweenValidationError(this.value, min, max));
	      }

	      return this;
	    }
	  }, {
	    key: "defined",
	    value: function defined() {
	      if (validateDefined(this.value) !== true) {
	        this.addAnonymousError(_default.definedValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "email",
	    value: function email() {
	      if (validateEmail(this.value) !== true) {
	        this.addAnonymousError(_default.emailValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "has",
	    value: function has(prop) {
	      if (validateHas(this.value, prop) !== true) {
	        this.addAnonymousError(_default.hasValidationError(this.value, prop));
	      }

	      return this;
	    }
	  }, {
	    key: "eachHas",
	    value: function eachHas(prop) {
	      if (validateEachHas(this.value, prop) !== true) {
	        this.addAnonymousError(_default.eachHasValidationError(this.value, prop));
	      }

	      return this;
	    }
	  }, {
	    key: "file",
	    value: function file() {
	      if (validateFile(this.value) !== true) {
	        this.addAnonymousError(_default.fileValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "blob",
	    value: function blob() {
	      if (validateBlob(this.value) !== true) {
	        this.addAnonymousError(_default.blobValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "fileReader",
	    value: function fileReader() {
	      if (validateFileReader(this.value) !== true) {
	        this.addAnonymousError(_default.fileReaderValidationError(this.value));
	      }

	      return this;
	    }
	  }, {
	    key: "errors",
	    get: function get() {
	      if (Object.keys(this._namedErrors).length > 0) {
	        return this._namedErrors;
	      }

	      return this._anonymousErrors;
	    }
	  }]);

	  return Pruve;
	}();

	function index (validate) {
	  return new Pruve(validate);
	}

	return index;

}));
