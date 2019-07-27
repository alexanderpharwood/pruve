const pruve = require('../../dist/bundle.js');
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
			}
		};
		
		let rules = {
			"name": "string.max:255.min:3",
			"email": "email.max:255",
			"dob": "date",
			"age": "int.min:16",
			"active": "bool",
			"hobbies": "array",
			"car": "defined",
			"pets": "has:dog"
		};
		
		pruve(values).passes(rules);
	});
	it('should throw with all relevant errors if any properties fail validation', function () {
		let values = {
			"name": true,
			"email": "Not an email address",
		};
		
		let rules = {
			"name": "string.max:255.min:3",
			"email": "email.max:255",
		};
		
		expect(function(){ pruve(values).passes(rules) }).to.throw(TypeError);
	});
});

describe('pruve.string()', function () {
	it('should pass if the value is a string', function () {
		pruve('I am a string').string();
	});
});

describe('pruve.bool()', function () {
	it('should pass if the value is a boolean', function () {
		pruve(true).bool();
	});
	it('should throw if the value is not a bool', function () {
		expect(pruve('true').bool).to.throw(TypeError);
	});
});

describe('pruve.number()', function () {
	it('should pass if the value is a number', function () {
		pruve(123).number();
	});
	it('should throw if the value is not a number', function () {
		expect(pruve('a').number).to.throw(TypeError);
	});
});

describe('pruve.int()', function () {
	it('should pass if the value is an integer', function () {
		pruve(6).int();
	});
	it('should throw if the value is not an int', function () {
		expect(pruve('a').int).to.throw(TypeError);
	});
});

describe('pruve.float()', function () {
	it('should pass if the value is a float', function () {
		pruve(1.5).float();
	});
	it('should throw if the value is not a float', function () {
		expect(pruve('a').float).to.throw(TypeError);
	});
});

describe('pruve.object()', function () {
	it('should pass if the value is an object', function () {
		pruve({}).object();
	});
	it('should throw if the value is not an object', function () {
		expect(pruve('Not an object').object).to.throw(TypeError);
	});
});

describe('pruve.array()', function () {
	it('should pass if the value is an array', function () {
		pruve([]).array();
	});
	it('should throw if the value is not an array', function () {
		expect(pruve('Not an array').array).to.throw(TypeError);
	});
});

describe('pruve.function()', function () {
	it('should pass if the value is a function', function () {
		pruve(function(){}).function();
	});
	it('should throw if the value is not a function', function () {
		expect(pruve('Not a function').function).to.throw(TypeError);
	});
});

describe('pruve.date()', function () {
	it('should pass if the value is a date', function () {
		pruve(new Date()).date();
	});
	it('should throw if the value is not a date', function () {
		expect(pruve('Not a date object').date).to.throw(TypeError);
	});
});

describe('pruve.max()', function () {
	it('should, on a string, pass if the length is smaller than, or equal to, the given limit', function () {
		pruve('test').max(6);
	});
	it('should, on a string, throw if the length is greater than, or equal to, the given limit', function () {
		expect(function(){ pruve('test').max(2) }).to.throw(TypeError);
	});
	
	it('should, on a number, pass if the number is smaller than, or equal to, the given limit', function () {
		pruve(1).max(2);
	});
	it('should, on a number, throw if the number is greater than, or equal to, the given limit', function () {
		expect(function(){ pruve(3).max(2) }).to.throw(TypeError);
	});
		
	it('should, on an array, pass if the number of items is smaller than, or equal to, the given limit', function () {
		pruve([1, 2, 3]).max(3);
	});
	it('should, on an array, throw if the number of items is greater than, or equal to, the given limit', function () {
		expect(function(){ pruve([1, 2, 3]).max(2) }).to.throw(TypeError);
	});
	
	it('should, on an object, pass if the number of keys is smaller than, or equal to, the given limit', function () {
		pruve({"a": 1, "b": 2}).max(2);
	});
	it('should, on an object, throw if the number of keys is greater than, or equal to, the given limit', function () {
		expect(function(){ pruve({"a": 1, "b": 2}).max(1) }).to.throw(TypeError);
	});
});

describe('pruve.min()', function () {
	it('should, on a string, pass if the length is greater than, or equal to, the given minimum', function () {
		pruve('test').min(3);
	});
	it('should, on a string, throw if the length is greater than, or equal to, the given minimum', function () {
		expect(function(){ pruve('test').min(10) }).to.throw(TypeError);
	});
	
	it('should, on a number, pass if the number is greater than, or equal to, the given minimum', function () {
		pruve(4).min(2);
	});
	it('should, on a number, throw if the number is smaller than, or equal to, the given minimum', function () {
		expect(function(){ pruve(3).min(4) }).to.throw(TypeError);
	});
		
	it('should, on an array, pass if the number of items is greater than, or equal to, the given minimum', function () {
		pruve([1, 2, 3]).min(3);
	});
	it('should, on an array, throw if the number of items is smaller than, or equal to, the given minimum', function () {
		expect(function(){ pruve([1, 2, 3]).min(4) }).to.throw(TypeError);
	});
	
	it('should, on an object, pass if the number of keys is greater than, or equal to, the given minimum', function () {
		pruve({"a": 1, "b": 2}).min(2);
	});
	it('should, on an object, throw if the number of keys is smaller than, or equal to, the given minimum', function () {
		expect(function(){ pruve({"a": 1, "b": 2}).min(4) }).to.throw(TypeError);
	});
});

describe('pruve.email()', function () {
	it('should pass if the email address is valid', function () {
		pruve('test@example.com').email();
	});
	
	it('should throw if the email address is invalid', function () {
		expect(pruve('Not a valid email address').email).to.throw(TypeError);
	});
});

describe('pruve.defined()', function () {
	it('should pass if the value is defined', function () {
		pruve('I am defined').defined();
	});
	
	it('should throw if the value is not defined', function () {
		expect(pruve().defined).to.throw(TypeError);
	});
});

describe('pruve.has()', function () {
	it('should pass if the value has the given property', function () {
		pruve({"foo": "bar"}).has('foo');
	});
	it('should throw if the value does not have the given property', function () {
		expect(function(){ pruve({"foo": "bar"}).has('cat') }).to.throw(TypeError);
	});
	it('should throw if the value is not an object', function () {
		expect(function(){ pruve("I am not an object").has('cat') }).to.throw(TypeError);
	});
});

describe('chaining', function () {
	it('should pass if the value is a string and shorter than the max limit', function () {
		pruve('I am a longish string').defined().string().max(255).min(3);
		pruve(6).int().max(10).min(1);
	});
});
