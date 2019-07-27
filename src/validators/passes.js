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

function getRuleProperties(rule){
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

export default function(values, rules){
	if (validateObject(values) === false) {
		throw new TypeError('Value must be an object, with propeties to validate.');
	}
	
	if (validateObject(rules) === false) {
		throw new TypeError('Rules must be an object, with propeties to validate.');
	}
	
	var failing = [];
	
	for (var prop in rules) {
		var rulesList = rules[prop].split('.');
		
		for (let rule of rulesList) {
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
	}

	return failing;
}
