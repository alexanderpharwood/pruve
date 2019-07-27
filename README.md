# Pruve

Declarative JavaScript data validation

![npm](https://img.shields.io/npm/v/jimcares.svg)
[![Build Status](https://travis-ci.org/alexanderpharwood/jimcares.svg?branch=master)](https://travis-ci.org/alexanderpharwood/jimcares)
![npm bundle size](https://img.shields.io/bundlephobia/min/jimcares.svg)
![npm](https://img.shields.io/npm/dm/jimcares.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/alexanderpharwood/jimcares.svg)
![GitHub issues](https://img.shields.io/github/issues/alexanderpharwood/jimcares.svg)  

Pruve is a declarative data validator which ...


## Usage

#### Unpkg
```
<script src="https://unpkg.com/pruve/dist/bundle.min.js"></script>
```

#### Npm
```
npm install pruve --save
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
Pruve does not return boolean values telling you whether or not validation has been successful. Instead, it throws a custom ValidationException error which should be caught. Here is a very crude example:
```
function ((request, res) => {
	try {
		pruve(request).has('a_required_property');
	} catch (exception) {
		res.render(422);
	}
}
```
## API

#### pruve()
This method, which of course can be named anything you like (check, validate, etc.), returns an instance of the pruve validator class. Validation methods can be chained on to it.
**Parameter** {mixed}  
**Returns** Pruve 
```
pruve('I am a string!')
```

#### string()
Validate that the value is a string.  
**Returns** void  
**Throws** ValidationException
```
pruve('I am a string!').string()

```

More documentation coming soon...
