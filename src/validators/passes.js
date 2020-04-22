import validateMax from './max.js';
import validateInt from './int.js';
import validateMin from './min.js';
import validateHas from './has.js';
import validateNull from './null.js';
import validateBool from './bool.js';
import validateDate from './date.js';
import validateEmail from './email.js';
import validateFloat from './float.js';
import validateArray from './array.js';
import validateString from './string.js';
import validateNumber from './number.js';
import validateObject from './object.js';
import validateBetween from './between.js';
import validateDefined from './defined.js';
import validatePattern from './pattern.js';
import validateEachHas from './eachHas.js';
import validateFunction from './function.js';
import validateUndefined from './undefined.js';
import ErrorFactory from '../factories/ErrorFactory.js';
import ValidationException from '../exceptions/ValidationException.js'

function getRuleProperties(rule) {
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

function addError(failing, key, error) {
	if (validateArray(failing[key]) === false) {
		failing[key] = [];
	}
	
	failing[key].push(error);
	return failing[key];
}

function messageInContext(messages, key, rule) {
	for (let message in messages) {
		let mesageKeySplit = message.split('.');
		
		let contextMessage = mesageKeySplit.find(function(propertyRule){
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
	let failing = [];
	for (let rule of ruleset) {
		var ruleProps = getRuleProperties(rule);
		switch (ruleProps.rule) {
			case "string":
				if (validateString(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.stringValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "bool":
				if (validateBool(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.booleanValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "number":
				if (validateNumber(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.numberValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "int":
				if (validateInt(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.intValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "float":
				if (validateFloat(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.intValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			
			case "array":
				if (validateArray(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.arrayValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "object":
				if (validateObject(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.objectValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "date":
				if (validateDate(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.dateValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "null":
				if (validateNull(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.nullValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "undefined":
				if (validateUndefined(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.undefinedValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "function":
				if (validateFunction(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.functionValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "max":
				if (validateMax(value, parseInt(ruleProps.conditions)) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.maxValidationError(value, ruleProps.conditions);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "min":
				if (validateMin(value, parseInt(ruleProps.conditions)) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.minValidationError(value, ruleProps.conditions);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "between":
				if (validateBetween(value, parseInt(ruleProps.conditions[0]), parseInt(ruleProps.conditions[1])) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.betweenValidationError(value, ruleProps.conditions[0], ruleProps.conditions[1]);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "defined":
				if (validateDefined(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.definedValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "email":
				if (validateEmail(value) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.emailValidationError(value);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "has":
				if (validateHas(value, ruleProps.conditions) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.hasValidationError(value, ruleProps.conditions);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "eachHas":
				if (validateEachHas(value, ruleProps.conditions) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.eachHasValidationError(value, ruleProps.conditions);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
			case "pattern":
				if (validatePattern(value, ruleProps.conditions) === false) {
					let message = messageInContext(messages, key, ruleProps.rule)
						|| ErrorFactory.patternValidationError(value, ruleProps.conditions);
						
					failing[key] = addError(
						failing,
						key,
						message
					);
				}
				break;
		}
	}

	return failing;
}

export default function(values, rules, messages) {
	if (validateObject(values) === false && validateArray(values) === false ) {
		throw new TypeError('Value must be an object or array, with propeties to validate.');
	}
	
	if (validateObject(rules) === false) {
		throw new TypeError('Rules must be an object, with propeties to validate.');
	}
	
	var failing = {};
	
	for (let prop in rules) {
		let ruleset = validateString(rules[prop]) ? rules[prop].split('.') : rules[prop];
		if (prop === '*') {
			for (let key in values) {
				var result = assessValueAgainstRuleset(values[key], key, ruleset, messages);
				if (Object.keys(result).length > 0) {
					if (typeof failing[key] !== 'undefined') {
						for (let failure of result[key]) {
							failing[key].push(failure)
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
				for (let failure of result[prop]) {
					failing[prop].push(failure)
				}
			} else {
				Object.assign(failing, result);
			}
		}
	}

	return failing;
}
