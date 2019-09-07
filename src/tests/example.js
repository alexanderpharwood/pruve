const pruve = require('../../dist/bundle.js');


let valid = pruve({"name": "Alex"}).passes({"*": "max:3"})
console.log(valid.errors)

valid = pruve(2).string()
console.log(valid.errors)
