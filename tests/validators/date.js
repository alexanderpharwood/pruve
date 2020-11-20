const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: date', function () {
	it('should pass', async () => {
		let values = {date: new Date()};
		let rules = {date: "date"};
		const validated = await pruve(values).passes(rules);
		expect(validated.date instanceof Date).to.equal(true);
	});

    it('should fail', async () => {
        let values = {date: 'Giraffe'};
		let rules = {date: "date"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.date).to.include("Value must be a date");
        }
	});
});
