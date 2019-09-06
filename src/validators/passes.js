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
import validateDefined from './defined.js';
import validateFunction from './function.js';
import validateUndefined from './undefined.js';
import ValidationException from '../exceptions/ValidationException.js'

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

function addError(failing, key, error) {
	if (validateArray(failing[key]) === false) {
		failing[key] = [];
	}
	
	failing[key].push(error);
	return failing[key];
}

function assessValueAgainstRuleset(value, key, ruleset) {
	let failing = [];
	for (let rule of ruleset) {
		var ruleProps = getRuleProperties(rule);
		switch (ruleProps.rule) {
			case "string":
				if (validateString(value) === false) {
					failing[key] = addError(failing, key, key + ' must be a string');
				}
				break;
			case "bool":
				if (validateBool(value) === false) {
					failing[key] = addError(failing, key, key + ' must be a boolean');
				}
				break;
			case "number":
				if (validateNumber(value) === false) {
					failing[key] = addError(failing, key, key + ' is not a number');
				}
				break;
			case "int":
				if (validateInt(value) === false) {
					failing[key] = addError(failing, key, key + ' must be an integer');
				}
				break;
			case "float":
				if (validateFloat(value) === false) {
					failing[key] = addError(failing, key, key + ' must be a float');
				}
				break;
			
			case "array":
				if (validateArray(value) === false) {
					failing[key] = addError(failing, key, key + ' must be an array');
				}
				break;
			case "object":
				if (validateObject(value) === false) {
					failing[key] = addError(failing, key, key + ' must be an object');
				}
				break;
			case "date":
				if (validateDate(value) === false) {
					failing[key] = addError(failing, key, key + ' must be a date');
				}
				break;
			case "null":
				if (validateNull(value) === false) {
					failing[key] = addError(failing, key, key + ' must be null');
				}
				break;
			case "undefined":
				if (validateUndefined(value) === false) {
					failing[key] = addError(failing, key, key + ' must be undefined');
				}
				break;
			case "function":
				if (validateFunction(value) === false) {
					failing[key] = addError(failing, key, key + ' must be a function');
				}
				break;
			case "max":
				if (validateMax(value, parseInt(ruleProps.condition)) === false) {
					failing[key] = addError(failing, key, key + ' must be less than ' + ruleProps.condition + ' in length or value');
				}
				break;
			case "min":
				if (validateMin(value, parseInt(ruleProps.condition)) === false) {
					failing[key] = addError(failing, key, key + ' must be greater than ' + ruleProps.condition + ' in length or value');
				}
				break;
			case "defined":
				if (validateDefined(value) === false) {
					failing[key] = addError(failing, key, key + ' must be defined');
				}
				break;
			case "email":
				if (validateEmail(value) === false) {
					failing[key] = addError(failing, key, key + ' must be a valid email address');
				}
				break;
			case "has":
				if (validateHas(value, ruleProps.condition) === false) {
					failing[key] = addError(failing, key, key + ' must have property: ' + ruleProps.condition);
				}
				break;
		}
	}

	return failing;
}

export default function(values, rules){
	if (validateObject(values) === false && validateArray(values) === false ) {
		throw new TypeError('Value must be an object or array, with propeties to validate.');
	}
	
	if (validateObject(rules) === false) {
		throw new TypeError('Rules must be an object, with propeties to validate.');
	}
	
	var failing = {};
	
	for (let prop in rules) {
		let ruleset = rules[prop].split('.');
		if (prop === '*') {
			for (let key in values) {
				var result = assessValueAgainstRuleset(values[key], key, ruleset);
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
		
		var result = assessValueAgainstRuleset(values[prop], prop, ruleset);
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
