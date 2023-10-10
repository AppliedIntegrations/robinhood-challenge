
import {
    applyStockUpdate,
    applyPriceHistoryUpdate
} from '../adapters/tickerAdapters'


describe('ticketAdapters', () => {

    describe('applyStockUpdate', () => {

        it('should return the stockUpdate data when current stock data is empty array', () => {
            const expectedObject = {
                foo:'bar',
                baz:'foo',
            };
            const stockUpdate = [
                expectedObject
            ];
            const result = applyStockUpdate([], stockUpdate);

            expect(result[0]).toEqual(expect.objectContaining(expectedObject));
        });

        it('should append percentageChange of 0.00 to all ticker items when current stock data is empty array', () => {
            const expectedObject = {
                percentageChange: 0.00
            };
            const stockUpdate = [
                {},
                {},
            ];
            const result = applyStockUpdate([], stockUpdate);
            expect(result[0]).toEqual(expect.objectContaining(expectedObject));
            expect(result[1]).toEqual(expect.objectContaining(expectedObject));

        });

        it('should return a copy of the current stock data with the new price when current stock data has been initialized', () => {
            const expectedCurrentStockData = {
                foo:'bar',
                baz:'foo',
            };
            const newPrice1 = 50.71;
            const newPrice2 = 101.44;
            const currentStockData = [
                {...expectedCurrentStockData, ...{symbol: 'AAA', price: 1.01}},
                {...expectedCurrentStockData, ...{symbol: 'BBB', price: 1.01}},
            ];
            const stockUpdate = [
                {symbol: 'AAA', price: newPrice1},
                {symbol: 'BBB', price: newPrice2},
            ];
            const result = applyStockUpdate(currentStockData, stockUpdate);
            expect(result[0]).toEqual(expect.objectContaining(expectedCurrentStockData));
            expect(result[0].price).toEqual(newPrice1);
            expect(result[1]).toEqual(expect.objectContaining(expectedCurrentStockData));
            expect(result[1].price).toEqual(newPrice2);
        });

        it('should return a copy of the current stock data with percentageChange when current stock data has been initialized', () => {
            const expectedCurrentStockData = {
                foo:'bar',
                baz:'foo',
            };
            const newPrice1 = 50.71;
            const newPrice2 = 101.44;
            const currentPrice1 = 100.01;
            const currentPrice2 = 60.01;
            const currentStockData = [
                {...expectedCurrentStockData, ...{symbol: 'AAA', price: currentPrice1}},
                {...expectedCurrentStockData, ...{symbol: 'BBB', price: currentPrice2}},
            ];
            const stockUpdate = [
                {symbol: 'AAA', price: newPrice1},
                {symbol: 'BBB', price: newPrice2},
            ];
            const result = applyStockUpdate(currentStockData, stockUpdate);
            expect(result[0]).toEqual(expect.objectContaining(expectedCurrentStockData));
            expect(result[0].percentageChange).toEqual(-49.3);
            expect(result[1]).toEqual(expect.objectContaining(expectedCurrentStockData));
            expect(result[1].percentageChange).toEqual(69.04);
        });

    });

})