const pruve = require('../../dist');
const ValidationException = require('../../dist/exceptions/ValidationException');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('method: passes', () => {
	it('should pass with regular validation', () => {
		let values = {name: "Bob"};
		let rules = {name: "string.max:255.min:3"};
		const validated = pruve(values).passes(rules);
		expect(validated.name).to.equal("Bob");
	});

	it('should pass with a custom function', () => {
		const custom = value => {
			return value === "Dave";
		}

		const values = {name: "Dave"};
		const rules = {name: [{custom}]};
		const validated = pruve(values).passes(rules);
		expect(validated.name).to.equal("Dave");
	});

	it('should pass asynchronously with a promise', async () => {
		const custom = new Promise((resolve, reject) => {
			resolve(true);
		});

		let values = {name: "Dave"};
		let rules = {name: [{custom}]};
		const validated = await pruve(values).passes(rules);
		expect(validated.name).to.equal("Dave");
	});

	it('should pass asynchronously with a promise using .then', async () => {
		const custom = new Promise((resolve, reject) => {
			resolve(true);
		});

		let values = {name: "Dave"};
		let rules = {name: [{custom}]};
		pruve(values).passes(rules).then(validated => {
			expect(validated.name).to.equal("Dave");
		});
	});

	it('should pass asynchronously with a function returning a promise', async () => {
		const custom = value => {
			return new Promise((resolve, reject) => {
				resolve(value === "Dave");
			});
		}

		let values = {name: "Dave"};
		let rules = {name: [{custom}]};
		const validated = await pruve(values).passes(rules);
		expect(validated.name).to.equal("Dave");
	});

	it('should fail with regular validation', () => {
		let values = {name: true};
		let rules = {name: "string"};

		const check = () => {
			let validated = pruve(values).passes(rules)
		}

		expect(check).to.throw(TypeError)

		try {
			const validated = pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value must be a string");
		}
	});

	it('should fail with a custom function returning false', () => {
		const custom = value => {
			return value === "Donkey";
		}
		const values = {name: "Dave"};
		const rules = {name: [{custom}]};

		const check = () => {
			let validated = pruve(values).passes(rules)
		}

		expect(check).to.throw(TypeError)

		try {
			const validated = pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value is invalid");
		}
	});

	it('should fail with a custom function throwing', () => {
		const custom = value => {
			throw new Error();
		}
		const values = {name: "Dave"};
		const rules = {name: [{custom}]};

		const check = () => {
			let validated = pruve(values).passes(rules)
		}

		expect(check).to.throw();

		try {
			const validated = pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value is invalid");
		}
	});

	it('should fail asynchronously using .catch', async () => {
		const custom = new Promise((resolve, reject) => {
			resolve(false);
		});
		const values = {name: "Dave"};
		const rules = {name: [{custom}]};

		const check = async () => {
			let validated = await pruve(values).passes(rules)
		}

		expect(check()).to.be.rejectedWith(TypeError)

		pruve(values).passes(rules).catch(exception => {
			expect(exception.errors.name).to.contain("Value is invalid");
		});
	});

	it('should fail asynchronously with a promise resolving false', async () => {
		const custom = new Promise((resolve, reject) => {
			resolve(false);
		});
		const values = {name: "Dave"};
		const rules = {name: [{custom}]};

		const check = async () => {
			let validated = await pruve(values).passes(rules)
		}

		expect(check()).to.be.rejectedWith(TypeError)

		try {
			const validated = await pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value is invalid");
		}
	});

	it('should fail asynchronously with a promise throwing', async () => {
		const custom = new Promise((resolve, reject) => {
			throw new Error();
		});

		const values = {name: "Dave"};
		const rules = {name: [{custom}]};

		const check = async () => {
			let validated = await pruve(values).passes(rules)
		}

		expect(check()).to.be.rejectedWith(TypeError)

		try {
			const validated = await pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value is invalid");
		}
	});

	it('should fail asynchronously with a promise rejecting', async () => {
		const custom = new Promise((resolve, reject) => {
			reject()
		});
		const values = {name: "Dave"};
		const rules = {name: [{custom}]};

		const check = async () => {
			let validated = await pruve(values).passes(rules)
		}

		expect(check()).to.be.rejectedWith(TypeError)

		try {
			const validated = await pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value is invalid");
		}
	});

	it('should fail asynchronously with a function returning a promise returning false', async () => {
		const custom = value => {
			return new Promise((resolve, reject) => {
				throw new Error()
			});
		}

		let values = {name: "Dave"};
		let rules = {name: [{custom}]};

		const check = async () => {
			let validated = await pruve(values).passes(rules)
		}

		expect(check()).to.be.rejectedWith(TypeError)

		try {
			const validated = await pruve(values).passes(rules);
		} catch (exception) {
			expect(exception.errors.name).to.contain("Value is invalid");
		}
	});

	it('should fail with a validation rule as a custom function (promise and regular) and display custom errors', function () {
		const customName = new Promise((resolve, reject) => {
			reject();
		});

		const customAge = value => value < 40;

		const customPet = value => value.length < 10;

		let values = {
			"name": "Dave",
			"age": 50,
			"pet": true,
		};

		let rules = {
			"name": ["string", {customName}],
			"age": ["number", {customAge}],
			"pet": ["string", {customPet}],

		};

		let messages = {
			"name.customName": "Name is invalid",
			"age.customAge": "Age is invalid",
			"pet.customPet": "Tell me your pet's name",
			"pet": "Pet is invalid",
		};

		pruve(values).passes(rules, messages).catch(exception => {
			expect(Object.keys(exception.errors).length).to.equal(3);
			expect(exception.errors.name).to.include("Name is invalid");
			expect(exception.errors.age).to.include("Age is invalid");
			expect(exception.errors.pet).to.include("Pet is invalid");
			expect(exception.errors.pet).to.include("Tell me your pet's name");
		})

	});

	it('should pass with all validated data if all properties pass validation', function () {
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
			"houses": [
				{"number": 67},
				{"number": 56},
			],
			"random": "123,456,789"
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
			"houses": "eachHas:number",
			"random": ["pattern:/^[A-Za-z0-9,-]+$/g"]
		};

		const validated = pruve(values).passes(rules);
		expect(validated).to.equal(values);
	});

	it('should pass with wildcard, using an object of values, if all properties pass validation', function () {
		let values = {
			"name": "Dave Davidson",
			"email": "dave@iamdave.com",
		};

		let rules = {
			"*": "string.max:255.min:3",
		};

		const validated = pruve(values).passes(rules);
		expect(validated).to.equal(values);
	});


	it('should pass with wildcard, using an array of values, if all properties pass validation', function () {
		let values = [];
		values["name"] = "Dave Davidson";
		values["email"] = "dave@iamdave.com";

		let rules = {
			"*": "string.max:255.min:3",
		};

		const validated = pruve(values).passes(rules);
		expect(validated).to.equal(values);
	});

	it('should structure the failures object keyed by the property which failed and contain all its failures', function () {
		let values = {
			"name": null,
			"email": "Not an email address",
			"age": 18
		};

		let rules = {
			"*": 'string',
			"name": "max:255.min:3",
			"email": "email"
		};

		try {
			pruve(values).passes(rules)
		} catch (exception) {
			expect(exception.errors.name).to.include(
				'Value must be a string'
			);
			expect(exception.errors.name).to.include(
				'Value must be greater in length or value than 3'
			);
			expect(exception.errors.name).to.include(
				'Value must be less in length or value than 255'
			);
		}
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

		try {
			const validated = pruve(values).passes(rules, messages);
		} catch (exception) {

			expect(exception.errors.name).to.include(
				'Name must be a string'
			);

			expect(exception.errors.name).to.include(
				'Name must be at least four characters long'
			);

			expect(exception.errors.age).to.include(
				'You must be at least 18 years old to take part'
			);

			expect(exception.errors.email).to.include(
				'Email must be a valid email address'
			);
		}
	});
});
