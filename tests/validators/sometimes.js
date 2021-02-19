const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: sometimes', function () {
	it('should pass', () => {
		let values = {bar: "I exist!"};
		let rules = {
			foo: ["sometimes", "string"],
			bar: ["string"]
		};
		const validated = pruve(values).passes(rules);
		expect(validated.bar).to.equal("I exist!");
		expect(validated.foo).to.be.undefined;
	});

    it('should fail', () => {
		let values = {foo: 566};
		let rules = {foo: ["sometimes", "string"]};

        try {
            const validated = pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.foo).to.include("Value must be a string");
        }
	});
});
