import validateMax from './validators/max.js';
import validateInt from './validators/int.js';
import validateMin from './validators/min.js';
import validateHas from './validators/has.js';
import validateNull from './validators/null.js';
import validateBool from './validators/bool.js';
import validateDate from './validators/date.js';
import validateFile from './validators/file.js';
import validateBlob from './validators/blob.js';
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
import validateFileReader from './validators/fileReader.js';
import ValidationException from './exceptions/ValidationException.js';

class Pruve {
	constructor(value) {
		this.value = value;
		this.errors = [];
	}
	
	passes(rules) {
		let failing = validatePasses(this.value, rules);
		if (Object.keys(failing).length > 0) {			
			this.errors.push(failing);
		}
		
		return this;
	}

	string() {
		if (validateString(this.value) !== true) {
			this.errors.push(this.value + ' is not a string.')
		}
		
		return this;
	}
	
	try() {
		if (this.errors.length > 0) {
			throw new ValidationException(this.value, this.errors);
		}
	}

	bool() {
		if (validateBool(this.value) !== true) {
			this.errors.push(this.value + ' is not a boolean.');
		};
		
		return this;
	}
	
	number() {
		if (validateNumber(this.value) !== true) {
			this.errors.push(this.value + ' is not a number.');
		}
		
		return this;
	}
	
	int() {
		if (validateInt(this.value) !== true) {
			this.errors.push(this.value + ' is not an integer.');
		}

		return this;
	}
	
	float() {
		if (validateFloat(this.value) !== true) {
			this.errors.push(this.value + ' is not a float.');
		}
		
		return this
	}
	
	array() {
		if (validateArray(this.value) !== true) {
			this.errors.push(this.value + ' is not an array.');
		}
		
		return this;
	}
	
	object() {
		if (validateObject(this.value) !== true) {
			this.errors.push(this.value + ' is not an object.');
		}
		
		return this;
	}
	
	date() {
		if (validateDate(this.value) !== true) {
			this.errors.push(this.value + ' is not a date.');
		}

		return this;
	}
	
	null() {
		if (validateNull(this.value) !== true) {
			this.errors.push(this.value + '" is not null');
		}
		
		return this;
	}
	
	undefined() {
		if (validateUndefined(this.value) !== true) {
			this.errors.push(this.value + '" is not null');
		}
		
		return this;
	}
	
	function() {
		if (validateFunction(this.value) !== true) {
			this.errors.push(this.value + '" is not a function');
		}
		
		return this;
	}
	
	max(limit) {
		if (validateMax(this.value, limit) !== true) {
			this.errors.push(this.value + '" is greater than ' + limit + '.');
		}
		
		return this;
	}
	
	min(minimum) {
		if (validateMin(this.value, minimum) !== true) {
			this.errors.push(this.value + '" is less than ' + minimum + '.');
		}
		
		return this;
	}
	
	defined() {
		if (validateDefined(this.value) !== true) {
			this.errors.push(this.value + ' is not defined.');
		}
		
		return this;
	}
	
	email() {
		if (validateEmail(this.value) !== true) {
			this.errors.push(this.value + '" is not a valid email address.');
		}
		
		return this;
	}
	
	has(prop) {
		if (validateHas(this.value, prop) !== true) {
			this.errors.push(this.value + ' does not have property: ' + prop + '.');
		}
		
		return this;
	}
	
	file() {
		if (validateFile(this.value) !== true) {
			this.errors.push(this.value + ' is not a File.');
		}
		
		return this;
	}
	
	blob() {
		if (validateBlob(this.value) !== true) {
			this.errors.push(this.value + ' is not a Blob.');
		}
		
		return this;
	}
	
	fileReader() {
		if (validateFileReader(this.value) !== true) {
			this.errors.push(this.value + ' is not a FilReader.');
		}
		
		return this;
		
	}
}

export default Pruve;
