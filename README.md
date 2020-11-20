

# Pruve

Declarative JavaScript data validation

![npm](https://img.shields.io/npm/v/pruve.svg)
[![Build Status](https://travis-ci.org/alexanderpharwood/pruve.svg?branch=master)](https://travis-ci.org/alexanderpharwood/pruve)
![npm bundle size](https://img.shields.io/bundlephobia/min/pruve.svg)
![npm](https://img.shields.io/npm/dm/pruve.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alexanderpharwood/pruve.svg)
![GitHub issues](https://img.shields.io/github/issues/alexanderpharwood/pruve.svg)  

Pruve is a declarative data validator that comes with modular validation methods, as well methods for validating large objects with custom rules and error messages.

## Usage

#### Npm
```
npm install pruve
```

#### Yarn
```
yarn add pruve
```
#### Browser (Unpkg)
```
<script src="https://unpkg.com/pruve/dist/browser"></script>
```
Import the validation constructor:
```
// ESM
import pruve from 'pruve';

// CommonJs
const pruve = require('pruve');
```

Individual validation methods are also available:

```
// ESM
import { validateString } from 'pruve';

// CommonJs
const validateString = require('pruve/validators/string');
```

## Performing validation
The individual validation methods simply return true or false to indicate a pass or a fail. For example:

```
validateString('I am a string!') // true
validateString(3.14) // false
```
The pruve constructor, however, is much more powerful. It accepts an object containing the data to be validated. The `passes` method is then called, which accepts an object of rules and then performs the validation. It either throws, or returns the validated data. For example:

```
const data = {name: "Dave"};
const rules = {name: 'string.max:255.min:2'}

const validated = pruve(data).passes(rules);
// {name: "Dave"}

```

As mentioned above, the `passes` methd will throw a `ValidationException` -- of which more below -- if validation fails. This must be caught:

```
const data = {name: 3.14};
const rules = {name: 'string'}

try {
	const validated = pruve(data).passes(rules);
} catch (exception) {
	exception.errors // {name: ["Value must be a string"]}
}

```

## Custom functions, promises, and asynchronous validation

Pruve also supports custom validation functions. These can be regular functions, which return `false` on fail, functions which return promises, or direct promise objects. As rules, they must be provided within an object. The key can be anything, but should match any custom errors you wish you use for your custom validation functions. See below for usage.

#### Functions
To trigger a validation failure regular functions can either return false or throw. Functions can accept one parameter: the value being validated. Again, see below for usage.

#### Promises
Promises are handled differently to regular functions. If a function returns a promise, or a promise is passed in directly, there are a few ways to trigger a validation failure. The promise can either resolve to false, reject, or throw. The contents of the rejection or thrown error is irrelevant as it will not be used for any validation error message. Promises must always resolve, be it successfully or otherwise. Unresolved promises will cause the validation process to hang.


Here is an example using a custom validation function and a promise. Notice how our functions are properties of the rules object, the keys of which map to the keys in the messages object:

```

const customFunction = value => value > 21;

const customPromise = axios.get('www.example.com/verify-age?age=50')
	.then(response => response.data === true);

const customFunctionReturningPromise = value => {
	axios.get('www.example.com/verify-age?age=' + value)
	.then(response => response.data === true);
}

let values = {
	"age": 50
};

let rules = {
	"age": ["number", {customFunction, customPromise, customFunctionReturningPromise}]
};

let messages = {
	"age.number": "Age must be a number"
	"age.customFunction": "Age is invalid",
	"age.customPromise": "Age is invalid",
	"age.customFunctionReturningPromise": "Age is invalid",
};

return pruve(values).passes(rules, messages).then(validated => {
	// All good!
}).catch(exception => {
	//exception.errors
})

```

The custom function alone is not asynchronous, and therefore `then` is only required because of the other functions, which are promise based. If a promise is used in the validation instance, Pruve will return a promise for you to resolve, either by using the `await` keyword, or by calling `then`.



## ValidationException

As mentioned above, if there are pending promises within the validation instance, you must either `await` the result or call `then` on the instance in order for an exception to be thrown. If there are no pending promises, the `passes` method will throw itself:

```
pruve({name: null}).passes({name: "string"})
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

## The Pruve Object

**constructor( _{value}_ )**  
A helper method is exposed, which allows for the creation of a Pruve validator instance. Of course, it can be named anything you like (check, validate, etc.). Validation methods can be chained on to it.  
**Parameter** _{mixed}_ value  
**Returns** Pruve  
```
pruve('I am a string!').passes(...
```

### Properties

**values** [public getter] _{object}_  
The values being validated

**errors** [public getter] _{object}_  
A list of errors for validation failures

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

---

## Methods

`passes`  
Perform validation on the given data  
**Param** rules {Object} The list of rules  
**Param** mesages {Object} The list of custom error messages  
**Throws** {ValidationException }  
**Returns** {Object|Promise} If there are promises pending, this method will return a promise. If not, it will return the validated data


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

## Validation rules

Rules rules can be provided as period-seperated strings, or as arrays. Here is a list of all built-in validators:

| Rule        | Description | Notes      |
| ----------- | ----------- | -----------
| string      | Validates the value is a string |
| bool        | Validates the value is a boolean |
| number      | Validates the value is a number |
| int         | Validates the value is an integer |
| float       | Validates the value is a float |
| array       | Validates the value is an array |
| object      | Validates the value is an object |
| date        | Validates the value is a date | This rule checks for an actual Date object, not a string or number representing a date
| null        | Validates the value is null |
| undefined   | Validates the value is undefined |
| function    | Validates the value is a function |
| max         | Validates the value is less than the given maximum  | The maximum is provided like so: `max:3`. Arrays and strings get tested for length. Numbers get tested for value. Objects get tested for number of properties.
| min         | Validates the value is greater than the given minimum | The minimum is provided like so: `min:3`. Arrays and strings get tested for length. Numbers get tested for value. Objects get tested for number of properties.
| between         | Validates the value is between the given minimum and maximum | The minimum and maximum are provided like so: `between:3,6`. Arrays and strings get tested for length. Numbers get tested for value. Objects get tested for number of properties.
| defined     | Validates the value is defined |
| email       | Validates the value is a valid email address |
| promise       | Validates the value is a promise |
| has         | Validates the value has the given property | This value in this case should be an object.
| eachHas     | Validates that each item in the value has the given property | This value in this case should be an array of objects.
| pattern     | Validates that the value passes the given pattern | JavaScript uses backslashes ("\\") to escape characters in strings. If your regular expression contains backslashes, you must double-escape them. The alternative is to use a custom function for more complex regular expression tests, as documented above, rather than the pattern helper.
