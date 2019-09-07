const pruve = require('../../dist/bundle.js');
const expect = require('chai').expect;
// var Blob = require('./blob-polyfill').Blob;
// var File = require('./blob-polyfill').File;
// var FileReader = require('./blob-polyfill').FileReader;

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
		};
	
		let rules = {
			"*": 'string',
			"name": "max:255.min:3",
			"email": "email.max:255",
		};
		
		try {
			pruve(values).passes(rules).try()
		} catch (exception) {
			console.log(exception.errors)
			expect(exception.errors[0].name).to.include(
				'name must be a string'
			);
			expect(exception.errors[0].name).to.include(
				'name must be greater than 3 in length or value'
			);
			expect(exception.errors[0].name).to.include(
				'name must be less than 255 in length or value'
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
				
		expect(function(){ pruve(values).passes(rules).try() }).to.throw(TypeError);
	});
});

describe('pruve.string()', function () {
	it('should pass if the value is a string', function () {
		pruve('I am a string').string();
		try {
			let val = pruve(Date('06/06/06')).bool();
			val.number().try()
		} catch (e) {
		}
	});
});

describe('pruve.bool()', function () {
	it('should pass if the value is a boolean', function () {
		pruve(true).bool().try();
	});
	it('should throw if the value is not a bool', function () {
		expect(pruve('true').bool().try).to.throw(TypeError);
	});
});

describe('pruve.number()', function () {
	it('should pass if the value is a number', function () {
		pruve(123).number().try();
	});
	it('should throw if the value is not a number', function () {
		expect(pruve('a').number().try).to.throw(TypeError);
	});
});

describe('pruve.int()', function () {
	it('should pass if the value is an integer', function () {
		pruve(6).int().try();
	});
	it('should throw if the value is not an int', function () {
		expect(pruve('a').int().try).to.throw(TypeError);
	});
});

describe('pruve.float()', function () {
	it('should pass if the value is a float', function () {
		pruve(1.5).float().try();
	});
	it('should throw if the value is not a float', function () {
		expect(pruve('a').float().try).to.throw(TypeError);
	});
});

describe('pruve.object()', function () {
	it('should pass if the value is an object', function () {
		pruve({}).object().try();
	});
	it('should throw if the value is not an object', function () {
		expect(pruve('Not an object').object().try).to.throw(TypeError);
	});
});

describe('pruve.array()', function () {
	it('should pass if the value is an array', function () {
		pruve([]).array().try();
	});
	it('should throw if the value is not an array', function () {
		expect(pruve('Not an array').array().try).to.throw(TypeError);
	});
});

describe('pruve.function()', function () {
	it('should pass if the value is a function', function () {
		pruve(function(){}).function().try();
	});
	it('should throw if the value is not a function', function () {
		expect(pruve('Not a function').function().try).to.throw(TypeError);
	});
});

describe('pruve.date()', function () {
	it('should pass if the value is a date', function () {
		pruve(new Date()).date().try();
	});
	it('should throw if the value is not a date', function () {
		expect(pruve('Not a date object').date().try).to.throw(TypeError);
	});
});

// @todo Impliment polyfill for node (File, Blob, FileReader, Url)

// describe('pruve.file()', function () {
// 	it('should pass if the value is a file', function () {
// 		let file = new File([], "");
// 		pruve(file).file();
// 	});
// 	it('should throw if the value is not a file', function () {
// 		expect(pruve('Not a file').file).to.throw(TypeError);
// 	});
// });
// 
// describe('pruve.blob()', function () {
// 	it('should pass if the value is a Blob', function () {
// 		let blob = new Blob([1,2,3]);
// 		pruve(blob).blob();
// 	});
// 	it('should throw if the value is not a Blob', function () {
// 		expect(pruve('Not a file').blob).to.throw(TypeError);
// 	});
// });

describe('pruve.max()', function () {
	it('should, on a string, pass if the length is smaller than, or equal to, the given limit', function () {
		pruve('test').max(6).try();
	});
	it('should, on a string, throw if the length is greater than, or equal to, the given limit', function () {
		expect( pruve('test').max(2).try ).to.throw(TypeError);
	});
	
	it('should, on a number, pass if the number is smaller than, or equal to, the given limit', function () {
		pruve(1).max(2).try();
	});
	it('should, on a number, throw if the number is greater than, or equal to, the given limit', function () {
		expect(pruve(3).max(2).try).to.throw(TypeError);
	});
		
	it('should, on an array, pass if the number of items is smaller than, or equal to, the given limit', function () {
		pruve([1, 2, 3]).max(3).try();
	});
	it('should, on an array, throw if the number of items is greater than, or equal to, the given limit', function () {
		expect(pruve([1, 2, 3]).max(2).try).to.throw(TypeError);
	});
	
	it('should, on an object, pass if the number of keys is smaller than, or equal to, the given limit', function () {
		pruve({"a": 1, "b": 2}).max(2).try();
	});
	it('should, on an object, throw if the number of keys is greater than, or equal to, the given limit', function () {
		expect(pruve({"a": 1, "b": 2}).max(1).try).to.throw(TypeError);
	});
});

describe('pruve.min()', function () {
	it('should, on a string, pass if the length is greater than, or equal to, the given minimum', function () {
		pruve('test').min(3).try();
	});
	it('should, on a string, throw if the length is greater than, or equal to, the given minimum', function () {
		expect(pruve('test').min(10).try).to.throw(TypeError);
	});
	
	it('should, on a number, pass if the number is greater than, or equal to, the given minimum', function () {
		pruve(4).min(2);
	});
	it('should, on a number, throw if the number is smaller than, or equal to, the given minimum', function () {
		expect(pruve(3).min(4).try).to.throw(TypeError);
	});
		
	it('should, on an array, pass if the number of items is greater than, or equal to, the given minimum', function () {
		pruve([1, 2, 3]).min(3).try();
	});
	it('should, on an array, throw if the number of items is smaller than, or equal to, the given minimum', function () {
		expect(pruve([1, 2, 3]).min(4).try).to.throw(TypeError);
	});
	
	it('should, on an object, pass if the number of keys is greater than, or equal to, the given minimum', function () {
		pruve({"a": 1, "b": 2}).min(2).try();
	});
	it('should, on an object, throw if the number of keys is smaller than, or equal to, the given minimum', function () {
		expect(pruve({"a": 1, "b": 2}).min(4).try).to.throw(TypeError);
	});
});

describe('pruve.email()', function () {
	it('should pass if the email address is valid', function () {
		pruve('test@example.com').email().try();
	});
	
	it('should throw if the email address is invalid', function () {
		expect(pruve('Not a valid email address').email().try).to.throw(TypeError);
	});
});

describe('pruve.defined()', function () {
	it('should pass if the value is defined', function () {
		pruve('I am defined').defined().try();
	});
	
	it('should throw if the value is not defined', function () {
		expect(pruve().defined().try).to.throw(TypeError);
	});
});

describe('pruve.has()', function () {
	it('should pass if the value has the given property', function () {
		pruve({"foo": "bar"}).has('foo').try();
	});
	it('should throw if the value does not have the given property', function () {
		expect(pruve({"foo": "bar"}).has('cat').try).to.throw(TypeError);
	});
	it('should throw if the value is not an object', function () {
		expect(function(){ pruve("I am not an object").has('cat')}).to.throw(TypeError);
	});
});

describe('chaining', function () {
	it('should pass if the value is a string and shorter than the max limit', function () {
		pruve('I am a longish string').defined().string().max(255).min(3).try();
		pruve(6).int().max(10).min(1).try();
	});
});
