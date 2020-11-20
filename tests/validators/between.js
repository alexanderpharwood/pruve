const pruve = require('../../dist');
const expect = require('chai').expect;

describe('validator: between', function () {
	it('should pass with number', async () => {
		let values = {betweenNumber: 15};
		let rules = {betweenNumber: "between:10,20"};
		const validated = await pruve(values).passes(rules);
		expect(validated.betweenNumber).to.equal(15);
	});

    it('should fail with number', async () => {
		let values = {betweenNumber: 5};
		let rules = {betweenNumber: "between:10,20"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.betweenNumber).to.include("Value must be between 10 and 20 in length or value");
        }
	});

	it('should pass with string', async () => {
		let values = {betweenString: 'abcdefghijklmn'};
		let rules = {betweenString: "between:10,20"};
		const validated = await pruve(values).passes(rules);
		expect(validated.betweenString).to.equal('abcdefghijklmn');
	});

    it('should fail with string', async () => {
		let values = {betweenString: 'abc'};
		let rules = {betweenString: "between:10,20"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.betweenString).to.include("Value must be between 10 and 20 in length or value");
        }
	});

	it('should pass with array', async () => {
		let values = {betweenArray: [1, 2, 3]};
		let rules = {betweenArray: "between:2,6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.betweenArray[0]).to.equal(1);
		expect(validated.betweenArray[1]).to.equal(2);
		expect(validated.betweenArray[2]).to.equal(3);
	});

    it('should fail with array', async () => {
		let values = {betweenArray: [1, 2, 3]};
		let rules = {betweenArray: "between:10,20"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.betweenArray).to.include("Value must be between 10 and 20 in length or value");
        }
	});

	it('should pass with object', async () => {
		let values = {betweenObject: {one: 1, two: 2, three: 3}};
		let rules = {betweenObject: "between:2,6"};
		const validated = await pruve(values).passes(rules);
		expect(validated.betweenObject.one).to.equal(1);
		expect(validated.betweenObject.two).to.equal(2);
		expect(validated.betweenObject.three).to.equal(3);
	});

    it('should fail with object', async () => {
		let values = {betweenObject: {one: 1, two: 2, three: 3}};
		let rules = {betweenObject: "between:10,20"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.betweenObject).to.include("Value must be between 10 and 20 in length or value");
        }
	});
});
