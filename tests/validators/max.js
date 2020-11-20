const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: max', function () {
	it('should pass with number', async () => {
		let values = {maxNumber: 5};
		let rules = {maxNumber: "max:6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.maxNumber).to.equal(5);
	});

    it('should fail with number', async () => {
		let values = {maxNumber: 5};
		let rules = {maxNumber: "max:3"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.maxNumber).to.include("Value must be less in length or value than 3");
        }
	});

	it('should pass with string', async () => {
		let values = {maxString: 'abc'};
		let rules = {maxString: "max:6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.maxString).to.equal('abc');
	});

    it('should fail with string', async () => {
		let values = {maxString: 'Long string'};
		let rules = {maxString: "max:3"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.maxString).to.include("Value must be less in length or value than 3");
        }
	});

	it('should pass with array', async () => {
		let values = {maxArray: [1, 2, 3]};
		let rules = {maxArray: "max:6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.maxArray[0]).to.equal(1);
		expect(validated.maxArray[1]).to.equal(2);
		expect(validated.maxArray[2]).to.equal(3);
	});

    it('should fail with array', async () => {
		let values = {maxArray: [1, 2, 3, 4, 5]};
		let rules = {maxArray: "max:3"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.maxArray).to.include("Value must be less in length or value than 3");
        }
	});

	it('should pass with object', async () => {
		let values = {maxObject: {one: 1, two: 2, three: 3}};
		let rules = {maxObject: "max:6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.maxObject.one).to.equal(1);
		expect(validated.maxObject.two).to.equal(2);
		expect(validated.maxObject.three).to.equal(3);
	});

    it('should fail with object', async () => {
		let values = {maxObject: {one: 1, two: 2, three: 3}};
		let rules = {maxObject: "max:2"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.maxObject).to.include("Value must be less in length or value than 2");
        }
	});
});
