const {setChangeIndicator, getRandomPriceInRange} = require('./priceFunctions');

describe('priceFunctions', () => {
    describe('setChangeIndicator', () => {
        it('should return zero when parameters are equal', () => {
            const testValue1 = 1234;
            const testValue2 = 999444234.21;
            expect(setChangeIndicator(testValue1, testValue1)).toEqual(0);
            expect(setChangeIndicator(testValue2, testValue2)).toEqual(0);
        });
        it('should return negative one when newPrice is less than originalPrice', () => {
            const newPrice = 1234;
            const originalPrice = 999444234.21;
            expect(setChangeIndicator(newPrice, originalPrice)).toEqual(-1);
        });
        it('should return positive one when newPrice is greater than originalPrice', () => {
            const newPrice = 888134.9;
            const originalPrice =2342;
            expect(setChangeIndicator(newPrice, originalPrice)).toEqual(1);
        });
    });

    describe('getRandomPriceInRange', () => {

    });
})