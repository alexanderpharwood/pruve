import validateInt from './int.js';
import validateArray from './array.js';
import validateNumber from './number.js';
import validateObject from './object.js';
import validateString from './string.js';

export default function(value, minimum){
	if (validateInt(minimum) === false) {
		throw new TypeError('Method min() requires parameter 1 to be an integer');
	}
	
	if (validateNumber(value) === true) {
		return value >= minimum;
	}

	if (validateString(value) === true || validateArray(value) === true) {
		return value.length >= minimum;
	}
			
	if (validateObject(value) === true) {
		return Object.keys(value).length >= minimum;
	}
	
	return false;
}
