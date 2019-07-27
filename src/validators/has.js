import validateObject from './object.js';

export default function(value, prop){
	if (validateObject(value) === true) {
		return typeof value[prop] !== 'undefined';
	}
	
	throw new TypeError('Subject of method has() must be an object');
}
