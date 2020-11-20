/**
 * @file
 * The purpose of this test is to verify that the compiled esm code functions as expected.
 * It utilises esm in order to import es6 modules.
 */

import pruve from '../../dist/esm';
import {
    validateMax,
    validateInt,
    validateMin,
    validateHas,
    validateNull,
    validateBool,
    validateDate,
    validateFile,
    validateBlob,
    validateEmail,
    validateFloat,
    validateArray,
    validateString,
    validateNumber,
    validateObject,
    validateDefined,
    validatePattern,
    validateBetween,
    validateEachHas,
    validateFunction,
    validateUndefined,
    validateFileReader
} from '../../dist/esm';
const expect = require('chai').expect;

describe('dist: esm', function () {
    it('should import the pruve object', () => {
        expect(typeof pruve).to.equal('function');
    });

    it('should import all individual validators', () => {
        expect(typeof validateMax).to.equal('function');
        expect(typeof validateInt).to.equal('function');
        expect(typeof validateMin).to.equal('function');
        expect(typeof validateHas).to.equal('function');
        expect(typeof validateNull).to.equal('function');
        expect(typeof validateBool).to.equal('function');
        expect(typeof validateDate).to.equal('function');
        expect(typeof validateFile).to.equal('function');
        expect(typeof validateBlob).to.equal('function');
        expect(typeof validateEmail).to.equal('function');
        expect(typeof validateFloat).to.equal('function');
        expect(typeof validateArray).to.equal('function');
        expect(typeof validateString).to.equal('function');
        expect(typeof validateNumber).to.equal('function');
        expect(typeof validateObject).to.equal('function');
        expect(typeof validateDefined).to.equal('function');
        expect(typeof validatePattern).to.equal('function');
        expect(typeof validateBetween).to.equal('function');
        expect(typeof validateEachHas).to.equal('function');
        expect(typeof validateFunction).to.equal('function');
        expect(typeof validateUndefined).to.equal('function');
        expect(typeof validateFileReader).to.equal('function');
    });

    it('should use the pruve object to perform validation', () => {
        const validated = pruve({test: 'Hello'}).passes({test: 'string'});
        expect(validated.test).to.equal('Hello');
    });
});
