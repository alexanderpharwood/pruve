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
import validateString from './validators/string.js';
import validateNumber from './validators/number.js';
import validateObject from './validators/object.js';
import validateDefined from './validators/defined.js';
import validatePattern from './validators/pattern.js';
import validateBetween from './validators/between.js';
import validateEachHas from './validators/eachHas.js';
import ErrorFactory from './factories/ErrorFactory.js';
import validateFunction from './validators/function.js';
import validateUndefined from './validators/undefined.js';
import validateFileReader from './validators/fileReader.js';
import ValidationException from './exceptions/ValidationException.js';
import NamedValidator from './NamedValidator.js';

class Pruve {
	constructor(value) {
		this.value = value;
		this._anonymousErrors = [];
		this._namedErrors = {};
		this.pending = [];
	}

	get errors() {
		if (Object.keys(this._namedErrors).length > 0) {
			return this._namedErrors;
		}

		return this._anonymousErrors;
	}

	get values() {
		return this.value;
	}

	addNamedError(key, error) {
		if (typeof this._namedErrors[key] === 'undefined') {
			this._namedErrors[key] = [];
		}

		this._namedErrors[key].push(error);

		// Remove duplicate error messages
		for (let key in this._namedErrors) {
			this._namedErrors[key] = [...new Set(this._namedErrors[key])];
		}
	}

	addAnonymousError(error) {
		this._anonymousErrors.push(error);

		// Remove duplicate error messages
		this._anonymousErrors = [...new Set(this._anonymousErrors)];
	}

	addPending(key, promise, potentialError) {
		this.pending.push({key, promise, potentialError});
	}

	try() {
		if (this.errors.length > 0 || Object.keys(this.errors).length > 0) {
			throw new ValidationException(this.value, this.errors);
		}
	}

	passes(rules, messages = []) {
		const namedValidator = new NamedValidator(this.addNamedError.bind(this), this.addPending.bind(this), this.value, rules, messages);
		namedValidator.validate();
		return this;
	}

	async then(next) {
		for (let pendingItem of this.pending) {
			try {
				const result = await pendingItem.promise;
				if (result === false) {
					this.addNamedError(pendingItem.key, pendingItem.potentialError);
				}
			} catch(error) {
				this.addNamedError(pendingItem.key, pendingItem.potentialError);
			}
		}

		this.try();
		return next(this);
	}

	pattern(expression) {
		if (validatePattern(this.value, expression) !== true) {
			this.addAnonymousError(ErrorFactory.patternValidationError(this.value));
		}

		return this;
	}

	string() {
		if (validateString(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.stringValidationError(this.value));
		}

		return this;
	}

	bool() {
		if (validateBool(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.boolValidationError(this.value));
		};

		return this;
	}

	number() {
		if (validateNumber(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.numberValidationError(this.value));
		}

		return this;
	}

	int() {
		if (validateInt(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.intValidationError(this.value));
		}

		return this;
	}

	float() {
		if (validateFloat(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.floatValidationError(this.value));
		}

		return this
	}

	array() {
		if (validateArray(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.arrayValidationError(this.value));
		}

		return this;
	}

	object() {
		if (validateObject(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.objectValidationError(this.value));
		}

		return this;
	}

	date() {
		if (validateDate(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.dateValidationError(this.value));
		}

		return this;
	}

	null() {
		if (validateNull(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.nullValidationError(this.value));
		}

		return this;
	}

	undefined() {
		if (validateUndefined(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.undefinedValidationError(this.value));
		}

		return this;
	}

	function() {
		if (validateFunction(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.functionValidationError(this.value));
		}

		return this;
	}

	max(max) {
		if (validateMax(this.value, max) !== true) {
			this.addAnonymousError(ErrorFactory.maxValidationError(this.value, max));
		}

		return this;
	}

	min(min) {
		if (validateMin(this.value, min) !== true) {
			this.addAnonymousError(ErrorFactory.minValidationError(this.value, min));
		}

		return this;
	}

	between(min, max) {
		if (validateBetween(this.value, min, max) !== true) {
			this.addAnonymousError(ErrorFactory.betweenValidationError(this.value, min, max));
		}

		return this;
	}

	defined() {
		if (validateDefined(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.definedValidationError(this.value));
		}

		return this;
	}

	email() {
		if (validateEmail(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.emailValidationError(this.value));
		}

		return this;
	}

	has(prop) {
		if (validateHas(this.value, prop) !== true) {
			this.addAnonymousError(ErrorFactory.hasValidationError(this.value, prop));
		}

		return this;
	}

	eachHas(prop) {
		if (validateEachHas(this.value, prop) !== true) {
			this.addAnonymousError(ErrorFactory.eachHasValidationError(this.value, prop));
		}

		return this;
	}

	file() {
		if (validateFile(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.fileValidationError(this.value));
		}

		return this;
	}

	blob() {
		if (validateBlob(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.blobValidationError(this.value));
		}

		return this;
	}

	fileReader() {
		if (validateFileReader(this.value) !== true) {
			this.addAnonymousError(ErrorFactory.fileReaderValidationError(this.value));
		}

		return this;
	}
}

export default Pruve;
