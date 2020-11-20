const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: undefined', function () {
	it('should pass', async () => {
		let values = {undefined: undefined};
		let rules = {undefined: "undefined"};
        const validated = await pruve(values).passes(rules);
		expect(validated.undefined).to.equal(undefined);
	});

    it('should fail', async () => {
        let values = {undefined: 'Dog'};
		let rules = {undefined: "undefined"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.undefined).to.include("Value must be undefined");
        }
	});
});
