export default class {
	static stringValidationError(value) {
		return '"' + value + '" is not a string';
	}
	
	static boolValidationError(value) {
		return '"' + value + '" is not a boolean';
	}
	
	static numberValidationError(value) {
		return '"' + value + '" is not a number';
	}
	
	static intValidationError(value) {
		return '"' + value + '" is not an integer';
	}
	
	static floatValidationError(value) {
		return '"' + value + '" is not a float';
	}
	
	static arrayValidationError(value) {
		return '"' + value + '" is not an array';
	}
	
	static objectValidationError(value) {
		return '"' + value + '" is not an object';
	}
	
	static dateValidationError(value) {
		return '"' + value + '" is not a date';
	}
	
	static nullValidationError(value) {
		return '"' + value + '" is not null';
	}
	
	static undefinedValidationError(value) {
		return '"' + value + '" is not undefined';
	}
	
	static functionValidationError(value) {
		return '"' + value + '" is not a function';
	}
	
	static maxValidationError(value, max) {
		return '"' + value + '" is greater in length or value than ' + max;
	}
	
	static minValidationError(value, min) {
		return '"' + value + '" is less in length or value than ' + min;
	}
	
	static betweenValidationError(value, min, max) {
		return 'The length or value of "' + value + '" is not between ' + min + ' and ' + max;
	}
	
	static definedValidationError(value) {
		return '"' + value + '" is not defined';
	}
	
	static emailValidationError(value) {
		return '"' + value + '" is not a valid email address';
	}
	
	static hasValidationError(value, prop) {
		return '"' + value + '" does not contain property "' + prop + '"';
	}
	
	static eachHasValidationError(value, prop) {
		return 'All children must contain property "' + prop + '"';
	}
	
	static fileValidationError(value) {
		return '"' + value + '" is not a File';
	}
	
	static blobValidationError(value) {
		return '"' + value + '" is not a Blob';
	}
	
	static fileReaderValidationError(value) {
		return '"' + value + '" is not a FileReader';
	}
	
	static patternValidationError(value) {
		return '"' + value + '" is not valid';
	}
}
