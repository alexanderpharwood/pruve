export default class ValidationException extends TypeError {
	constructor(errors){
		super('Validation failed');
		this.errors = errors;
	}
}
