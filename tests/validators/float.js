const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: float', function () {
	it('should pass', async () => {
		let values = {float: 1.5};
		let rules = {float: "float"};
		const validated = await pruve(values).passes(rules);
		expect(validated.float).to.equal(1.5);
	});

    it('should fail', async () => {
        let values = {float: 10};
		let rules = {float: "float"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.float).to.include("Value must be a float");
        }
	});
});
