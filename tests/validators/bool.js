const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: bool', function () {
	it('should pass', async () => {
		let values = {bool: true};
		let rules = {bool: "bool"};
		const validated = await pruve(values).passes(rules);
		expect(validated.bool).to.equal(true);
	});

    it('should fail', async () => {
        let values = {bool: "cat"};
		let rules = {bool: "bool"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.bool).to.include("Value must be a boolean");
        }
	});
});
