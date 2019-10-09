const pruve = require('../../../dist/bundle.js');
const expect = require('chai').expect;

describe('pruve.passes()', function () {
	it('should pass if all properties pass validation', function () {
		let values = {
			"name": "Dave Davidson",
			"email": "dave@iamdave.com",
			"dob": new Date('04/08/1994'),
			"age": 36,
			"active": true,
			"hobbies": ['football', 'music'],
			"car": false,
			"pets": {
				"dog": "barnie"
			},
			"random": "6"
		};
		
		let rules = {
			"name": "string.max:255.min:3",
			"email": "email.max:255",
			"dob": "date",
			"age": "int.min:16",
			"active": "bool",
			"hobbies": "array",
			"car": "defined",
			"pets": "has:dog",
			"random": "pattern:^6"
		};
		
		pruve(values).passes(rules).try();
	});
	it('should pass with wildcard, using an object of values, if all properties pass validation', function () {
		let values = {
			"name": "Dave Davidson",
			"email": "dave@iamdave.com",
		};
		
		let rules = {
			"*": "string.max:255.min:3",
		};
		
		pruve(values).passes(rules).try();
	});
	it('should pass with wildcard, using an array of values, if all properties pass validation', function () {
		let values = [];
		values["name"] = "Dave Davidson";
		values["email"] = "dave@iamdave.com";
		
		let rules = {
			"*": "string.max:255.min:3",
		};
		
		pruve(values).passes(rules).try();
	});
	it('should structure the failures object keyed by the propery which failed and contain all its failures', function () {
		let values = {
			"name": null,
			"email": "Not an email address",
			"age": 18
		};
	
		let rules = {
			"*": 'string',
			"name": "nullable.max:255.min:3",
			"email": "email"
		};
		
		try {
			pruve(values).passes(rules).try()
		} catch (exception) {
			expect(exception.errors.name).to.include(
				'"null" is not a string'
			);
			expect(exception.errors.name).to.include(
				'"null" is less in length or value than 3'
			);
			expect(exception.errors.name).to.include(
				'"null" is greater in length or value than 255'
			);
		}
	});
	it('should throw with all relevant errors if any properties fail validation', function () {
		let values = {
			"name": 123,
			"email": "Not an email address",
		};
		
		let rules = {
			"name": "string",
			"email": "email.max:255",
		};
				
		expect(pruve(values).passes(rules).try).to.throw(TypeError);
	});
	it('should throw with all relevant errors if any properties fail validation with custom error messages', function () {
		let values = {
			"name": true,
			"email": "Not an email address",
			"age": 12,
		};
		
		let rules = {
			"name": "string.min:4",
			"email": "email.max:255.min:40",
			"age": "min:18",
		};
		
		let messages = {
			"name.string": "Name must be a string",
			"name.min": "Name must be at least four characters long",
			"email": "Email must be a valid email address",
			"age": "You must be at least 18 years old to take part",
		};
				
		let errors = pruve(values).passes(rules, messages).errors;
		expect(errors.name).to.include(
			'Name must be a string'
		);
		
		expect(errors.name).to.include(
			'Name must be at least four characters long'
		);
		
		expect(errors.age).to.include(
			'You must be at least 18 years old to take part'
		);
		
		expect(errors.email).to.include(
			'Email must be a valid email address'
		);
	});
});
