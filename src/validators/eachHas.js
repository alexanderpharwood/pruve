import validateObject from './object.js';
import validateArray from './object.js';

export default function(value, prop){
	let passing = true;
	if (validateArray(value) === false) {
		return false;
	}
	
	for (let check of value) {
		if (validateObject(check) === false) {
			return false;
		}
		
		passing = typeof check[prop] !== 'undefined';
	}
	
	return passing;
}
