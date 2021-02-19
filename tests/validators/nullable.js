const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: nullable', function () {
	it('should pass', () => {
		let values = {foo: null};
		let rules = {
			foo: ["nullable", "string"]
		};
		const validated = pruve(values).passes(rules);
		expect(validated.foo).to.be.null;
	});

    it('should fail', () => {
		let values = {foo: null};
		let rules = {
			foo: ["string"]
		};

        try {
            const validated = pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.foo).to.include("Value must be a string");
        }
	});
});
