import validateInt from './int.js';
import validateArray from './array.js';
import validateNumber from './number.js';
import validateObject from './object.js';
import validateString from './string.js';

export default function(value, limit){
	if (validateInt(limit) === false) {
		throw new TypeError('Method max() requires parameter 1 to be an integer');
	}
	
	if (validateNumber(value) === true) {
		return value <= limit;
	}

	if (validateString(value) === true || validateArray(value) === true) {
		return value.length <= limit;
	}
			
	if (validateObject(value) === true) {
		return Object.keys(value).length <= limit;
	}
	
	return false;
}
