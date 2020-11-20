const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: min', function () {
	it('should pass with number', async () => {
		let values = {minNumber: 15};
		let rules = {minNumber: "min:10"};
		const validated = await pruve(values).passes(rules);
		expect(validated.minNumber).to.equal(15);
	});

    it('should fail with number', async () => {
		let values = {minNumber: 5};
		let rules = {minNumber: "min:10"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.minNumber).to.include("Value must be greater in length or value than 10");
        }
	});

	it('should pass with string', async () => {
		let values = {minString: 'abcdefgh'};
		let rules = {minString: "min:6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.minString).to.equal('abcdefgh');
	});

    it('should fail with string', async () => {
		let values = {minString: 'abc'};
		let rules = {minString: "min:6"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.minString).to.include("Value must be greater in length or value than 6");
        }
	});

	it('should pass with array', async () => {
		let values = {minArray: [1, 2, 3]};
		let rules = {minArray: "min:2"};
		const validated = await pruve(values).passes(rules);
		expect(validated.minArray[0]).to.equal(1);
		expect(validated.minArray[1]).to.equal(2);
		expect(validated.minArray[2]).to.equal(3);
	});

    it('should fail with array', async () => {
		let values = {minArray: [1, 2, 3]};
		let rules = {minArray: "min:6"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.minArray).to.include("Value must be greater in length or value than 6");
        }
	});

	it('should pass with object', async () => {
		let values = {minObject: {one: 1, two: 2, three: 3}};
		let rules = {minObject: "min:2"};
		const validated = await pruve(values).passes(rules);
		expect(validated.minObject.one).to.equal(1);
		expect(validated.minObject.two).to.equal(2);
		expect(validated.minObject.three).to.equal(3);
	});

    it('should fail with object', async () => {
		let values = {minObject: {one: 1, two: 2, three: 3}};
		let rules = {minObject: "min:6"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.minObject).to.include("Value must be greater in length or value than 6");
        }
	});
});
