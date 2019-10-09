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
import validatePattern from './validators/pattern.js';
import validateBetween from './validators/between.js';
import ErrorFactory from './factories/ErrorFactory.js';
import validateFunction from './validators/function.js';
import validateUndefined from './validators/undefined.js';
import validateFileReader from './validators/fileReader.js';
import ValidationException from './exceptions/ValidationException.js';

class Pruve {
	constructor(value) {
		this.value = value;
		this.errors = [];
	}
	
	addError(error){
		this.errors.push(error);
	}
	
	try() {
		if (this.errors.length > 0 || Object.keys(this.errors).length > 0) {
			throw new ValidationException(this.value, this.errors);
		}
	}
	
	passes(rules, messages = []) {
		let failing = validatePasses(this.value, rules, messages);
		if (Object.keys(failing).length > 0) {
			for (let failure in failing) {
				failing[failure] = [...new Set(failing[failure])];
			}
			this.errors = failing;
		}
		
		return this;
	}
	
	pattern(expression) {
		if (validatePattern(this.value, expression) !== true) {
			this.addError(ErrorFactory.patternValidationError(this.value));
		}
		
		return this;
	}
	
	is () {
		
	}
	
	in () {
		
	}

	string() {
		if (validateString(this.value) !== true) {
			this.addError(ErrorFactory.stringValidationError(this.value));
		}
		
		return this;
	}

	bool() {
		if (validateBool(this.value) !== true) {
			this.addError(ErrorFactory.boolValidationError(this.value));
		};
		
		return this;
	}
	
	number() {
		if (validateNumber(this.value) !== true) {
			this.addError(ErrorFactory.numberValidationError(this.value));
		}
		
		return this;
	}
	
	int() {
		if (validateInt(this.value) !== true) {
			this.addError(ErrorFactory.intValidationError(this.value));
		}

		return this;
	}
	
	float() {
		if (validateFloat(this.value) !== true) {
			this.addError(ErrorFactory.floatValidationError(this.value));
		}
		
		return this
	}
	
	array() {
		if (validateArray(this.value) !== true) {
			this.addError(ErrorFactory.arrayValidationError(this.value));
		}
		
		return this;
	}
	
	object() {
		if (validateObject(this.value) !== true) {
			this.addError(ErrorFactory.objectValidationError(this.value));
		}
		
		return this;
	}
	
	date() {
		if (validateDate(this.value) !== true) {
			this.addError(ErrorFactory.dateValidationError(this.value));
		}

		return this;
	}
	
	null() {
		if (validateNull(this.value) !== true) {
			this.addError(ErrorFactory.nullValidationError(this.value));
		}
		
		return this;
	}
	
	undefined() {
		if (validateUndefined(this.value) !== true) {
			this.addError(ErrorFactory.undefinedValidationError(this.value));
		}
		
		return this;
	}
	
	function() {
		if (validateFunction(this.value) !== true) {
			this.addError(ErrorFactory.functionValidationError(this.value));
		}
		
		return this;
	}
	
	max(max) {
		if (validateMax(this.value, max) !== true) {
			this.addError(ErrorFactory.maxValidationError(this.value, max));
		}
		
		return this;
	}
	
	min(min) {
		if (validateMin(this.value, min) !== true) {
			this.addError(ErrorFactory.minValidationError(this.value, min));
		}
		
		return this;
	}
	
	between(min, max) {
		if (validateBetween(this.value, min, max) !== true) {
			this.addError(ErrorFactory.betweenValidationError(this.value, min, max));
		}
		
		return this;
	}
	
	defined() {
		if (validateDefined(this.value) !== true) {
			this.addError(ErrorFactory.definedValidationError(this.value));
		}
		
		return this;
	}
	
	email() {
		if (validateEmail(this.value) !== true) {
			this.addError(ErrorFactory.emailValidationError(this.value));
		}
		
		return this;
	}
	
	has(prop) {
		if (validateHas(this.value, prop) !== true) {
			this.addError(ErrorFactory.hasValidationError(this.value, prop));
		}
		
		return this;
	}
	
	file() {
		if (validateFile(this.value) !== true) {
			this.addError(ErrorFactory.fileValidationError(this.value));
		}
		
		return this;
	}
	
	blob() {
		if (validateBlob(this.value) !== true) {
			this.addError(ErrorFactory.blobValidationError(this.value));
		}
		
		return this;
	}
	
	fileReader() {
		if (validateFileReader(this.value) !== true) {
			this.addError(ErrorFactory.fileReaderValidationError(this.value));
		}
		
		return this;
	}
}

export default Pruve;
