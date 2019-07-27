# Pruve

Declarative JavaScript data validation

![npm](https://img.shields.io/npm/v/pruve.svg)
[![Build Status](https://travis-ci.org/alexanderpharwood/pruve.svg?branch=master)](https://travis-ci.org/alexanderpharwood/pruve)
![npm bundle size](https://img.shields.io/bundlephobia/min/pruve.svg)
![npm](https://img.shields.io/npm/dm/pruve.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alexanderpharwood/pruve.svg)
![GitHub issues](https://img.shields.io/github/issues/alexanderpharwood/pruve.svg)  

Pruve is a declarative data validator which allows for validation of individual variables or or objects containing data for validation, as you would find with request objects.


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
Pruve does not return boolean values telling you whether or not validation has been successful. Instead, it throws a custom ValidationException error which should be caught. Here is a very crude example using Express:
```
app.post('/users', (req, res) => {
	try {
  	  pruve(req.body.name).string().max(255);
    } catch (exception) {
  	  res.render(422);
    }
})

```

You can also 
## API

#### pruve()
This method, which of course can be named anything you like (check, validate, etc.), returns an instance of the pruve validator class. Validation methods can be chained on to it.  
**Parameter** mixed value
**Returns** Pruve 
```
pruve('I am a string!')...
```

#### passes()
Validate that the values inside the object pass the validation rules.  
**Parameter** object rules  
**Returns** void  
**Throws** ValidationException
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

#### string()
Validate that the value is a string.  
**Returns** void  
**Throws** ValidationException
```
pruve('I am a string!').string()

```

More documentation coming soon...
