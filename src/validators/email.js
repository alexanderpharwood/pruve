import validateString from './string.js';

export default function(value){
	if (validateString(value) === true) {
		let expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return expression.test(value.toLowerCase()) === true;
	}
	
	throw new TypeError('Subject of method email() must be a string');
}
