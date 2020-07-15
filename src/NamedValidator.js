import validateMax from './validators/max.js';
import validateInt from './validators/int.js';
import validateMin from './validators/min.js';
import validateHas from './validators/has.js';
import validateNull from './validators/null.js';
import validateBool from './validators/bool.js';
import validateDate from './validators/date.js';
import validateEmail from './validators/email.js';
import validateFloat from './validators/float.js';
import validateArray from './validators/array.js';
import validateString from './validators/string.js';
import validateNumber from './validators/number.js';
import validateObject from './validators/object.js';
import validateBetween from './validators/between.js';
import validateDefined from './validators/defined.js';
import validatePattern from './validators/pattern.js';
import validateEachHas from './validators/eachHas.js';
import validateFunction from './validators/function.js';
import validateUndefined from './validators/undefined.js';
import validateCustomMethod from './validators/customMethod.js';
import ErrorFactory from './factories/ErrorFactory.js';
import ValidationException from './exceptions/ValidationException.js'

export default class {
    constructor(addError, addPending, values, rules, messages) {
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
    validate() {
    	if (validateObject(this.values) === false && validateArray(this.values) === false ) {
    		throw new TypeError('Value must be an object or array, with propeties to validate.');
    	}

    	if (validateObject(this.rules) === false) {
    		throw new TypeError('Rules must be an object, with propeties to validate.');
    	}

    	for (let prop in this.rules) {
    		let ruleset = validateString(this.rules[prop]) ? this.rules[prop].split('.') : this.rules[prop];

    		if (prop in this.values === false && ruleset.includes('sometimes')) {
    			continue;
    		}

    		if (prop === '*') {
    			for (let key in this.values) {
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
    getRulePropertiesFromString(rule) {
    	var baseRule = rule,
    		conditions = null;

    	if (rule.includes(':')) {
    		baseRule = rule.substring(0, rule.indexOf(':'));
    		conditions = rule.substring(rule.indexOf(':') + 1);

    		// Only the following rules accept multiple params
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
    messageInContext(key, rule) {
    	for (let message in this.messages) {
    		let mesageKeySplit = message.split('.');

    		let contextMessage = mesageKeySplit.find(function(propertyRule){
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
    assessValueAgainstRuleset(value, key, ruleset) {
    	for (let rule of ruleset) {

    		if (typeof rule === 'object') {
    			for (let testKey in rule) {

                    let promiseOrFunction = rule[testKey];

                    if (typeof promiseOrFunction === 'function') {
                        // If it is a function, execute it
                        promiseOrFunction = validateCustomMethod(value, rule[testKey]);
                    }

                    // Get the potential error for later use
    				let potentialError = this.messageInContext(key, testKey)
    					|| ErrorFactory.customMethodValidationError(value);

    				if (promiseOrFunction === false) {
    					this.addError(key, potentialError);
    					continue;
    				}

    				// If we have a promise(ish) object, add it to pending for later resolution
    				if (typeof promiseOrFunction === 'object' && typeof promiseOrFunction.then !== 'undefined') {
                        this.addPending(key, promiseOrFunction, potentialError)
    				}
    			}

    			continue;
    		}

    		var ruleProps = this.getRulePropertiesFromString(rule);
    		switch (ruleProps.rule) {
    			case "string":
    				if (validateString(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.stringValidationError(value);
    					this.addError(key, message);
    				}
    				break;
    			case "bool":
    				if (validateBool(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.booleanValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "number":
    				if (validateNumber(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.numberValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "int":
    				if (validateInt(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.intValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "float":
    				if (validateFloat(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.intValidationError(value);

    					this.addError(key, message);
    				}
    				break;

    			case "array":
    				if (validateArray(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.arrayValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "object":
    				if (validateObject(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.objectValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "date":
    				if (validateDate(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.dateValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "null":
    				if (validateNull(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.nullValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "undefined":
    				if (validateUndefined(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.undefinedValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "function":
    				if (validateFunction(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.functionValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "max":
    				if (validateMax(value, parseInt(ruleProps.conditions)) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.maxValidationError(value, ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "min":
    				if (validateMin(value, parseInt(ruleProps.conditions)) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.minValidationError(value, ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "between":
    				if (validateBetween(value, parseInt(ruleProps.conditions[0]), parseInt(ruleProps.conditions[1])) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.betweenValidationError(value, ruleProps.conditions[0], ruleProps.conditions[1]);

    					this.addError(key, message);
    				}
    				break;
    			case "defined":
    				if (validateDefined(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.definedValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "email":
    				if (validateEmail(value) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.emailValidationError(value);

    					this.addError(key, message);
    				}
    				break;
    			case "has":
    				if (validateHas(value, ruleProps.conditions) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.hasValidationError(value, ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "eachHas":
    				if (validateEachHas(value, ruleProps.conditions) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.eachHasValidationError(value, ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "pattern":
    				if (validatePattern(value, ruleProps.conditions) === false) {
    					let message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.patternValidationError(value, ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    		}
    	}
    }
}
