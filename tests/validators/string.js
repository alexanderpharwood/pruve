const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: string', function () {
	it('should pass', async () => {
		let values = {string: "Bob"};
		let rules = {string: "string"};
		const validated = await pruve(values).passes(rules);
		expect(validated.string).to.equal("Bob");
	});

    it('should fail', async () => {
		let values = {string: false};
		let rules = {string: "string"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.string).to.include("Value must be a string");
        }
	});
});
