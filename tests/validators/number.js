const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: number', function () {
	it('should pass', async () => {
		let values = {number: 5};
		let rules = {number: "number"};
		const validated = await pruve(values).passes(rules);
		expect(validated.number).to.equal(5);
	});

    it('should fail', async () => {
        let values = {number: 'Dog'};
		let rules = {number: "number"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.number).to.include("Value must be a number");
        }
	});
});
