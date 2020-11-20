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
import validatePromise from './validators/promise.js';
import validateBetween from './validators/between.js';
import validateDefined from './validators/defined.js';
import validatePattern from './validators/pattern.js';
import validateEachHas from './validators/eachHas.js';
import validateFunction from './validators/function.js';
import validateUndefined from './validators/undefined.js';
import validateCustomMethod from './validators/customMethod.js';
import ErrorFactory from './factories/ErrorFactory.js';

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
     * @return {void}
     */
    validate() {
    	if (validateObject(this.values) === false && validateArray(this.values) === false ) {
    		throw new TypeError('Value must be an object or array, with propeties to validate.');
    	}

    	if (validateObject(this.rules) === false) {
    		throw new TypeError('Rules must be an object, with propeties to validate.');
    	}

    	for (const prop in this.rules) {
    		const ruleset = validateString(this.rules[prop]) ? this.rules[prop].split('.') : this.rules[prop];

    		if (prop in this.values === false && ruleset.includes('sometimes')) {
    			continue;
    		}

    		if (prop === '*') {
    			for (const key in this.values) {
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
    	let baseRule = rule,
    		conditions = null;

    	if (rule.includes(':')) {
    		baseRule = rule.substring(0, rule.indexOf(':'));
    		conditions = rule.substring(rule.indexOf(':') + 1);

    		// Only the following rules accept multiple parameters
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
    	for (const message in this.messages) {
    		const mesageKeySplit = message.split('.');

    		const contextMessage = mesageKeySplit.find(function(propertyRule){
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
    	for (const rule of ruleset) {
    		if (validateObject(rule) === true) {
    			for (const testKey in rule) {
                    const customValidator = rule[testKey];
                    const potentialError = this.messageInContext(key, testKey)
                        || ErrorFactory.customMethodValidationError();

                    // If the custom validator is a promise, add it to pending for later resolution
                    if (validatePromise(customValidator) === true) {
                        this.addPending(key, customValidator, potentialError);
                        continue;
    				}

                    // If the custom validator is a function, execute it
                    if (validateFunction(customValidator) === true) {
                        try {
                            const result = validateCustomMethod(value, rule[testKey]);
                            if (result === false) {
                                // If the result if false, validation has failed
                                this.addError(key, potentialError);
            					continue;
                            }

                            // If the result is a promise, add it to pending for later resolution
                            if (validatePromise(result) === true) {
                                this.addPending(key, customValidator, potentialError);
                                continue;
            				}
                        } catch (exception) {
                            this.addError(key, potentialError);
                        }
                    }
    			}

    			continue;
    		}

    		var ruleProps = this.getRulePropertiesFromString(rule);
    		switch (ruleProps.rule) {
    			case "string":
    				if (validateString(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.stringValidationError();
    					this.addError(key, message);
    				}
    				break;
    			case "bool":
    				if (validateBool(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.boolValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "number":
    				if (validateNumber(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.numberValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "int":
    				if (validateInt(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.intValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "float":
    				if (validateFloat(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.floatValidationError();

    					this.addError(key, message);
    				}
    				break;

    			case "array":
    				if (validateArray(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.arrayValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "object":
    				if (validateObject(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.objectValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "date":
    				if (validateDate(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.dateValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "null":
    				if (validateNull(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.nullValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "undefined":
    				if (validateUndefined(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.undefinedValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "function":
    				if (validateFunction(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.functionValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "max":
    				if (validateMax(value, parseInt(ruleProps.conditions)) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.maxValidationError(ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "min":
    				if (validateMin(value, parseInt(ruleProps.conditions)) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.minValidationError(ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "between":
    				if (validateBetween(value, parseInt(ruleProps.conditions[0]), parseInt(ruleProps.conditions[1])) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.betweenValidationError(ruleProps.conditions[0], ruleProps.conditions[1]);

    					this.addError(key, message);
    				}
    				break;
    			case "defined":
    				if (validateDefined(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.definedValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "email":
    				if (validateEmail(value) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.emailValidationError();

    					this.addError(key, message);
    				}
    				break;
    			case "has":
    				if (validateHas(value, ruleProps.conditions) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.hasValidationError(ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "eachHas":
    				if (validateEachHas(value, ruleProps.conditions) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.eachHasValidationError(ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    			case "pattern":
    				if (validatePattern(value, ruleProps.conditions) === false) {
    					const message = this.messageInContext(key, ruleProps.rule)
    						|| ErrorFactory.patternValidationError(ruleProps.conditions);

    					this.addError(key, message);
    				}
    				break;
    		}
    	}
    }
}
