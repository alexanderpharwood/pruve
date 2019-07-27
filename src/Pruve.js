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
import validatePasses from './validators/passes.js';
import validateString from './validators/string.js';
import validateNumber from './validators/number.js';
import validateObject from './validators/object.js';
import validateDefined from './validators/defined.js';
import validateFunction from './validators/function.js';
import validateUndefined from './validators/undefined.js';
import ValidationException from './exceptions/ValidationException.js';

class Pruve {
	constructor(value){
		this.value = value;
	}
	
	passes(rules){
		let failing = validatePasses(this.value, rules);
		
		if (failing.length > 0) {
			throw new ValidationException(failing);
		}
	}

	string() {
		if (validateString(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not a string.');
	}

	bool() {
		if (validateBool(this.value) === true) {
			return this;
		};
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not a boolean.');
	}
	
	number() {
		if (validateNumber(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not a number.');
	}
	
	int() {
		if (validateInt(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not an integer.');
	}
	
	float() {
		if (validateFloat(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not a float.');
	}
	
	array() {
		if (validateArray(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not an array.');
	}
	
	object() {
		if (validateObject(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not an object.');
	}
	
	date() {
		if (validateDate(this.value) === true) {
			return this
		}

		throw new ValidationException('Failed validation: ' + this.value + ' is not a date.');
	}
	
	null(){
		if (validateNull(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: "' + this.value + '" is not null');
	}
	
	undefined(){
		if (validateUndefined(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: "' + this.value + '" is not undefined');
	}
	
	function(){
		if (validateFunction(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not a function.');
	}
	
	max(limit) {
		if (validateMax(this.value, limit) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: "' + this.value + '" is greater than ' + limit + '.');
	}
	
	min(minimum) {
		if (validateMin(this.value, minimum) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: "' + this.value + '" is less than ' + minimum + '.');
	}
	
	defined(){
		if (validateDefined(this.value) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' is not defined.');
	}
	
	email() {
		if (validateEmail(this.value) === true) {
			return this;
		}

		throw new ValidationException('Failed validation: "' + this.value + '" is not a valid email address.');
	}
	
	has(prop){
		if (validateHas(this.value, prop) === true) {
			return this;
		}
		
		throw new ValidationException('Failed validation: ' + this.value + ' does not have property: ' + prop + '.');
	}
}

export default Pruve;
