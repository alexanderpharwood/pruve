const pruve = require('../../dist');
const validateArray = require('../../dist/validators/array');
const expect = require('chai').expect;

describe('validator: array', function () {
	it('should pass using individual validator', async () => {
		expect(validateArray(['apple', 'orange'])).to.equal(true);
	});

	it('should fail using individual validator', async () => {
		expect(validateArray('cat')).to.equal(false);
	});

	it('should pass via using passes()', async () => {
		let values = {array: ['apple', 'orange']};
		let rules = {array: "array"};
		const validated = await pruve(values).passes(rules);
		expect(validated.array[0]).to.equal('apple');
		expect(validated.array[1]).to.equal('orange');
	});

    it('should pass via using passes()', async () => {
        let values = {array: 'Giraffe'};
		let rules = {array: "array"};

        try {
            const validated = await pruve(values).passes(rules);
        } catch (exception) {
            expect(exception.errors.array).to.include("Value must be an array");
        }
	});
});
