

# Pruve

Declarative JavaScript data validation

![npm](https://img.shields.io/npm/v/pruve.svg)
[![Build Status](https://travis-ci.org/alexanderpharwood/pruve.svg?branch=master)](https://travis-ci.org/alexanderpharwood/pruve)
![npm bundle size](https://img.shields.io/bundlephobia/min/pruve.svg)
![npm](https://img.shields.io/npm/dm/pruve.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alexanderpharwood/pruve.svg)
![GitHub issues](https://img.shields.io/github/issues/alexanderpharwood/pruve.svg)  

Pruve is a declarative data validator which allows for validation of individual variables or objects containing data for validation, as you would find with request objects.


## Usage

#### Unpkg
```
<script src="https://unpkg.com/pruve/dist/bundle.min.js"></script>
```

#### Npm
```
npm install pruve
```

#### Yarn
```
yarn add pruve
```
You can require the pruve validation method like so:
```
const pruve = require('pruve');
```
Alternatively, you can import the module directly if you are using an ES6-aware build tool like Webpack or Rollup, which makes use of the 'module' field in package.json.
```
import pruve from 'pruve';
```

## Trying and catching
Pruve does not return boolean values telling you whether or not validation has been successful. Each validator method which fails will add an error to the Pruve object it returns. The try method -- of which more below -- throws a ValidationException error which should be caught. Here is a very crude example using Express:
```
app.post('/users', (req, res) => {
	try {
  	  pruve(req.body.name).string().max(255).try();
    } catch (exception) {
  	  res.render(422);
    }
})
```

Alternatively, you can use a promise-based approach. The Pruve object is "thenable"; it contains a `then` function which checks for validation errors and throw if it finds any, much like the `try` method. Because the `then` function is async, it will automatically return a promise for you to catch:

 ```
pruve('Example string!').string()
	.then(pruve => {
	 	// the pruve object
	}).catch(exception => {
		// ValidationException
	})
 ```

 This approach is particularly useful when you are using custom validation functions, which can now return promises, and therefore be asynchronous. Checking the database for a unique email address on registration is a good real-world example.

## ValidationException

If the `try` or `then` methods are called on a Pruve instance which contains errors, a ValidationException will be thrown. Here are two examples of how this exception might look:

```
pruve(null).string().try()
// This will throw
ValidationException {
	value: null,
	message: 'Validation failed',
	errors: [
		'null is not a string'
	]
}

pruve({name: null}).passes({name: "string"}).try()
// This will throw
ValidationException {
	value: null,
	message: 'Validation failed',
	errors: {
			name: [
				'null is not a string'
			]
		}
}
```

As shown above, the passes() method returns an object of errors, keyed by the name of the property which has failed validation, whereas single validation methods return only single errors as strings.

## The Pruve Object

**constructor( _{value}_ )**  
A helper method is exposed, which allows for the creation of a Pruve validator instance, for ease of access. Of course, it can be named anything you like (check, validate, etc.). Validation methods can be chained on to it.  
**Parameter** _{mixed}_ value  
**Returns** Pruve  
```
pruve('I am a string!').string()
```

### Properties

**value** _{mixed}_  
The value to be validated  

**errors** [public getter] _{array|object}_  
A list of errors for validation failures from either namedErrors or anonymousErrors

**_namedErrors** [private] _{object}_  
A list of errors of named validation failures.

**_anonymousErrors** [private] _{array}_  
A list of errors for anonymous validation failures.

**Note:** In almost all scenarios, it is far more reasonable to access errors through the errors getter, rather than through the `_namedErrors` and `_anonymousErrors` properties. It is also important to note that `_namedErrors` is an object whereas `_anonymousErrors` is an array:

Anonymous errors:
```
let errors = pruve(123).string().errors
// ['"123" is not a string']
```

Named errors:
```
let errors = pruve({name: 123}).passes({name: 'string'}).errors
// { "name": ['"123" is not a string'] }
```

## Custom Error Messages

Pruve supports custom error messages. They are handled like so:

```
let data = {
	"name": "Dave",
}

let rules = {
	"name": "string.max:255.min:2",
}

let messages = {
	"name.string": "Name is not valid",
	"name.max": "Name is too long",
	"name.min": "Name is too short",
}

pruve(data).passes(rules, messages);
```

**Note:** If you do not provide a validation rule when defining you error messages, and give only the name of the property, that message will override all validation errors. For example:

```
let messages = {
	"name": "Name is not valid",
}
```

This will however only appear once in the errors array. This is a good option of you don't want to go into specifics about why the validation failed.

## Promises & custom validation functions

Pruve also supports custom validation functions. These can be regular functions, which return `false` on fail, functions which return promises, or direct promise objects. As rules, they must be provided within an object. The key can be anything, but should match any custom errors you wish you use for your custom validation functions. See below for usage.

#### Functions
To trigger a validation failure regular functions must return false.

#### Promises
Promises are handled differently to regular functions. If a function returns a promise, or a promise is passed in directly, there are a few ways to trigger a validation failure. The promise can either resolve to false, reject, or throw. The contents of the rejection or thrown error is irrelevant as it will not be used for any validation error message. Promises must always resolve, be it successfully or otherwise. Unresolved promises will cause the validation process to hang.


Here is an example using a custom validation function and a promise. Notice how `customFunction` and `customPromise` are passed into rules as properties of an object:

```

const customFunction = value => value < 40;
const customPromise = axios.get('www.example.com/verify-age')
	.then(response => response.data === true);

let values = {
	"age": 50
};

let rules = {
	"age": ["number", {customFunction, customPromise}]
};

let messages = {
	"age.number": "Age must be a number"
	"age.customAge": "Age is invalid",
	"age.customPromise": "Age is invalid",
};

return pruve(values).passes(rules, messages).then(result => {
	// All good!
}).catch(exception => {
	//exception.errors
})

```

The custom function alone is not asynchronous, and therefore `then` is only required because of the promise. If a custom validator is a promise or returns a promuse, you must call `then` to ensure all validations are executed before accessing any errors.

---

## Pruve Methods

**try()**  
Assess errors and throw a ValidationException if any are present.  
**Throws** ValidationException  
**Returns** Pruve

**then()**  
Resolve any pending promises and assess errors. Throw a ValidationException if errors are present or any promises resolve false, reject, or throw. This method should always be followed by a .catch()  
**async**  
**Returns** Pruve  
**Throws** ValidationException

### Named Validation
To perform named validation you must use the passes() method, and provide an object with named properties to validate, along with a ruleset. Named validation means the errors property on the Pruve object and ValidationException will be a keyed object rather than an array. Named validation required more code but provides more verbose errors. It also allows for custom error messages.

**passes()**  
Validate that the values inside the object pass the validation rules.  
**Parameter** _{object}_ rules  
**Returns** Pruve  

```
let data = {
	"name": "Dave",
	"email": "dave@iamdave.com",
	"age": 36
}

// Your rulesets can be either period-separated strings, or arrays:
let rules = {
	"name": ["string", "max:255", "min:2"],
	"email": "email.max:255",
	"age": "int.min:16.max:120",
}

pruve(data).passes(rules);
```

You can also do wildcard validation, which will apply to every property in the object being validated, like so:
```
let data = {
	"name": "Dave",
	"email": "dave@iamdave.com"
}

let rules = {
	"*": "string.max:255.min:2",
	"email": "email",
}

pruve(data).passes(rules);
```

### Anonymous Validation
Anonymous validator methods simply perform validation on the value given in the Pruve constructor. The errors property these methods set on the Pruve object and ValidationException will be an array rather than a keyed object. Anonymous validators require less code but also provide less verbose errors. Neither do they allow for custom error messages.

**string()**  
Validate that the value is a string.  
**Returns** Pruve  

```
pruve('I am a string!').string()
```


**bool()**  
Validate that the value is a boolean.  
**Returns** Pruve  

```
pruve(true).bool()
```

**number()**  
Validate that the value is a number.  
**Returns** Pruve  

```
pruve(1000).number()
```

**int()**  
Validate that the value is an integer.  
**Returns** Pruve  

```
pruve(436).int()
```

**float()**  
Validate that the value is a float.  
**Returns** Pruve  

```
pruve(3.5).float()
```

**array()**  
Validate that the value is an array.  
**Returns** Pruve  

```
pruve(['foo', 'bar']).array()
```

**object()**  
Validate that the value is an object.  
**Returns** Pruve  

```
pruve({foo: 'bar'}).object()
```


**date()**  
Validate that the value is a date object.  
**Returns** Pruve  

```
let dateObj = Date('04/08/1994')
pruve(dateObj).date()
```

**null()**  
Validate that the value is null.  
**Returns** Pruve  

```
pruve(null).null()
```

**undefined()**  
Validate that the value is undefined.  
**Returns** Pruve  

```
pruve(undefined).undefined()
```

**function()**  
Validate that the value is a function.  
**Returns** Pruve  

```
let func = function() {
	return 'I am a function!';
}
pruve(func).function()
```

**max( _{int}_ )**  
Validate that the value is less than the given maximum. Applies to numbers, strings (length), arrays (length), and objects (keys).  
**Param** _{int}_ max  
**Returns** Pruve  

```
pruve(3).max(4)
```

**min( _{int}_ )**  
Validate that the value is more than the given minimum. Applies to numbers, strings (length), arrays (length), and objects (keys).  
**Param** _{int}_ min  
**Returns** Pruve  

```
pruve(3).min(2)
```

**defined()**  
Validate that the value is defined.  
**Returns** Pruve  

```
let defined = 'I am a string!'
pruve(defined).defined()
```

**email()**  
Validate that the value is a valid email address.  
**Returns** Pruve  

```
let email = 'test@test.com'
pruve(email).defined()

**has( _{string}_ )**  
Validate that the object has the given key. Only applicable to objects.  
**Param** _{string}_  key  
**Returns** Pruve
```
**has( _{string}_ )**  
Validate that the object has the given key. Only applicable to objects.  
**Param** _{string}_  key  
**Returns** Pruve

```
let obj = {foo: "bar"};
pruve(obj).has('foo')
```

**eachHas( _{string}_ )**  
Validate that all objects in the array have the given key. Only applicable to arrays of objects.  
**Param** _{string}_  key  
**Returns** Pruve

```
let arr = [
	{foo: "bar"}
	{foo: "baz"}
]
pruve(arr).has('foo')
```

**pattern( _{string}_ )**  
Validate that the matches the given pattern.  
**Param** _{string}_  pattern  
**Returns** Pruve

```
pruve('6 is my age').pattern('^6')
```

**Note:** when using named validation, pattern does not support period-separated strings. Rules must be provided as an array:

```
let values = {
	"name": "Dave"
}

let rules = {
	"name": ["string", "max:255", "pattern:[a-zA-Z]"]
}
```

More documentation coming soon...
