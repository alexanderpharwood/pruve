const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: date', function () {
	it('should pass', async () => {
		let values = {
			instance: new Date(),
			iso: "2021-02-10T14:00:00.000Z",
			mdy: "04/23/1994",
			number: 1613730330259,
		};

		let rules = {
			"*": "date"
		};
		const validated = pruve(values).passes(rules);
		expect(validated.instance instanceof Date).to.equal(true);
		expect(validated.dmy).to.equal(values.dmy);
		expect(validated.iso).to.equal(values.iso);
		expect(validated.mdy).to.equal(values.mdy);
		expect(validated.number).to.equal(values.number);
	});

    it('should fail', async () => {
        let values = {
			string: "Giraffe",
			dmy: "28/04/2021",
			invaliddm: "70/70/2021",
			object: {foo: "bar"},
			rubbish: "thisisgibberish",
		};

		let rules = {"*": "date"};

        try {
            pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.string).to.include("Value must be a date");
            expect(exception.errors.dmy).to.include("Value must be a date");
            expect(exception.errors.invaliddm).to.include("Value must be a date");
            expect(exception.errors.object).to.include("Value must be a date");
            expect(exception.errors.rubbish).to.include("Value must be a date");
        }
	});
});
