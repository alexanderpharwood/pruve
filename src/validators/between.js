import validateInt from './int.js';
import validateArray from './array.js';
import validateNumber from './number.js';
import validateObject from './object.js';
import validateString from './string.js';

export default function(value, min, max){
	if (validateInt(min) === false || validateInt(max) === false) {
		throw new TypeError('Method between() requires parameter 1 and 2 to be an integer');
	}
	
	if (validateNumber(value) === true) {
		return value >= min && value <= max;
	}

	if (validateString(value) === true || validateArray(value) === true) {
		return value.length >= min && value.length <= max;
	}
			
	if (validateObject(value) === true) {
		return Object.keys(value).length >= min && Object.keys(value).length <= max;
	}
	
	return false;
}
