import ValidationException from './exceptions/ValidationException.js';
import Validator from './Validator.js';

class Pruve {
	/**
	 * Construct a new pruve instance with the given data
	 * @param {Object} values
	 */
	constructor(values) {
		this._values = values;
		this._checked = new Set();
		this._rules = {};
		this._messages = {};
		this._errors = {};
		this._pending = [];
	}

	/**
	 * errors getter
	 * @return {Object}
	 */
	get errors() {
		return this._errors;
	}

	/**
	 * pending getter
	 * @return {mixed}
	 */
	get pending() {
		return this._pending;
	}

	/**
	 * values getter
	 * @return {mixed}
	 */
	get values() {
		return this._values;
	}

	/**
	 * Get the values that have been validated and do not have errors
	 */
	get validated() {
		const passed = {};
		for (const key of this._checked) {
			if (this._valueHasError(key) === false) {
				if (typeof this._values[key] !== 'undefined') {
					passed[key] = this._values[key];
				}
			}
		}

		return passed;
	}

	/**
	 * Alias for values property
	 * @return {mixed}
	 */
	get value() {
		return this.values;
	}

	/**
	 * Perform validation on the values
	 * @param  {Array} rules
	 * @param  {Array} messages=[]
	 * @return {Promise|Object}
	 */
	passes(rules, messages = []) {
		this._rules = rules;
		this._messages = messages;
		const validator = new Validator(
			this._markChecked.bind(this),
			this._addError.bind(this),
			this._addPending.bind(this),
			this.values,
			this._rules,
			this._messages
		);

		validator.validate();
		if (this._hasPending() === true) {
			return this._assessAsync();
		}

		return this._assess();
	}

	/**
	 * Check if the current instance has any validation errors
	 * @return {Boolean}
	 */
	_hasErrors() {
		return Object.keys(this.errors).length > 0;
	}

	/**
	 * Check if the current instance has any pending promises
	 * @return {Boolean}
	 */
	_hasPending() {
		return this._pending.length > 0;
	}

	/**
	 * Check if a specific value has an errror
	 * @param {String} key 
	 */
	_valueHasError(key) {
		return typeof this._errors[key] !== 'undefined';
	}

	/**
	 * Add an error to the validation instance
	 * @param {String} key
	 * @param {String} error
	 */
	_addError(key, error) {
		if (typeof this._errors[key] === 'undefined') {
			this._errors[key] = [];
		}

		this._errors[key].push(error);

		// Remove duplicate error messages
		for (let key in this._errors) {
			this._errors[key] = [...new Set(this._errors[key])];
		}
	}

	/**
	 * Mark a value as checked
	 * @param {String} key
	 * @param {Promise} promise
	 * @param {String} potentialError
	 */
	_markChecked(key) {
		this._checked.add(key);
	}

	/**
	 * Add a pending promise to the validation instance
	 * @param {String} key
	 * @param {Promise} promise
	 * @param {String} potentialError
	 */
	_addPending(key, promise, potentialError) {
		this._pending.push({key, promise, potentialError});
	}

	/**
	 * Return the validated values of throw if there are errors
	 * @throws {ValidationException}
	 * @return {mixed}
	 */
	_assess() {
		if (this._hasErrors() === true) {
			throw new ValidationException(this.values, this.errors);
		}

		return this.validated;
	}

	/**
	 * Resolve all rending promises
	 * @return {Promise}
	 */
	async _assessAsync() {
		for (let pendingItem of this.pending) {
			try {
				const result = await pendingItem.promise;
				if (result === false) {
					this._addError(pendingItem.key, pendingItem.potentialError);
				}
			} catch(error) {
				this._addError(pendingItem.key, pendingItem.potentialError);
			}
		}

		return this._assess();
	}
}

export default Pruve;
