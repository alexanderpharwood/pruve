const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: object', function () {
	it('should pass', async () => {
		let values = {object: {fruit: 'apple'}};
		let rules = {object: "object"};
		const validated = await pruve(values).passes(rules);
		expect(validated.object.fruit).to.equal('apple');
	});

    it('should fail', async () => {
        let values = {object: 'Giraffe'};
		let rules = {object: "object"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.object).to.include("Value must be an object");
        }
	});
});
