export default class ValidationException extends TypeError {
	constructor(value, errors){
		super('Validation failed');
		this.value = value;
		this.errors = errors;
	}
}
