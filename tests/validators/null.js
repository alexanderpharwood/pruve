const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: null', function () {
	it('should pass', async () => {
		let values = {null: null};
		let rules = {null: "null"};
		const validated = await pruve(values).passes(rules);
		expect(validated.null).to.equal(null);
	});

    it('should fail', async () => {
        let values = {null: 'Dog'};
		let rules = {null: "null"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.null).to.include("Value must be null");
        }
	});
});
