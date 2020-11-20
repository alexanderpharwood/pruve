const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: null', function () {
	it('should pass', async () => {
		let values = {int: 1};
		let rules = {int: "int"};
		const validated = await pruve(values).passes(rules);
		expect(validated.int).to.equal(1);
	});

    it('should fail', async () => {
        let values = {int: 'Dog'};
		let rules = {int: "int"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.int).to.include("Value must be an integer");
        }
	});
});
