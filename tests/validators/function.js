const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: function', function () {
	it('should pass', async () => {
		let values = {function: () => {}};
		let rules = {function: "function"};
        const validated = await pruve(values).passes(rules);
		expect(typeof validated.function).to.equal('function');
	});

    it('should fail', async () => {
        let values = {function: 'Dog'};
		let rules = {function: "function"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.function).to.include("Value must be a function");
        }
	});
});
