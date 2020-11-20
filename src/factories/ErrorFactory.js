export default class {
	static stringValidationError() {
		return 'Value must be a string';
	}

	static customMethodValidationError() {
		return 'Value is invalid';
	}

	static boolValidationError() {
		return 'Value must be a boolean';
	}

	static numberValidationError() {
		return 'Value must be a number';
	}

	static intValidationError() {
		return 'Value must be an integer';
	}

	static floatValidationError() {
		return 'Value must be a float';
	}

	static arrayValidationError() {
		return 'Value must be an array';
	}

	static objectValidationError() {
		return 'Value must be an object';
	}

	static dateValidationError() {
		return 'Value must be a date';
	}

	static nullValidationError() {
		return 'Value must be null';
	}

	static undefinedValidationError() {
		return 'Value must be undefined';
	}

	static functionValidationError() {
		return 'Value must be a function';
	}

	static maxValidationError(max) {
		return 'Value must be less in length or value than ' + max;
	}

	static minValidationError(min) {
		return 'Value must be greater in length or value than ' + min;
	}

	static betweenValidationError(min, max) {
		return 'Value must be between ' + min + ' and ' + max + ' in length or value';
	}

	static definedValidationError() {
		return 'Value must be defined';
	}

	static emailValidationError() {
		return 'Value must be a valid email address';
	}

	static hasValidationError(prop) {
		return 'Value must contain property "' + prop + '"';
	}

	static eachHasValidationError(prop) {
		return 'All children must contain property "' + prop + '"';
	}

	static fileValidationError() {
		return 'Value must be a File';
	}

	static blobValidationError() {
		return 'Value must be a Blob';
	}

	static fileReaderValidationError() {
		return 'Value must be a FileReader';
	}

	static patternValidationError() {
		return 'Value is not valid';
	}
}
