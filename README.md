

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
Pruve does not return boolean values telling you whether or not validation has been successful. Instead, it throws a ValidationException error which should be caught. Here is a very crude example using Express:
```
app.post('/users', (req, res) => {
	try {
  	  pruve(req.body.name).string().max(255).try();
    } catch (exception) {
  	  res.render(422);
    }
})
```

## ValidationException

If a property or variable fails validation, a ValidationException will be thrown:

```
ValidationException {
	value: {
		name: null,
		email: 'Not an email address!'
	},
	message: 'Validation failed',
	errors: {
		name: [
			'name must be a string'
		],
		email: [
			'email must be a valid email address'
		]
	}
}
```

## The Pruve Object

**constructor( _{value}_ )**  
A helper method is exposed, which allows for the creation of a Pruve validator instance, for ease of access. Of course, it can be named anything you like (check, validate, etc.). Validation methods can be chained on to it.  
**Parameter** _{mixed}_ value  
**Returns** Pruve  
```
pruve('I am a string!').string()
```

### Properties

**value** _{string}_  
The value to be validated  

**errors** _{array}_  
A list of errors for validation failures

---

### Methods

**try()**  
Assess errors and throw a ValidationException if any are present.  
**Throws** ValidationException

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
let rules = {
	"name": "string.max:255.min:2",
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
```
**has( _{string}_ )**  
Validate that the object has the given key. Only applicable to objects.  
**Param** _{string}_  key  
**Returns** Pruve

```
let obj = {foo: 'bar'}
pruve(obj).has('foo')
```

More documentation coming soon...
