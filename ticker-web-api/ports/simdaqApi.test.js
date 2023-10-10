require('dotenv').config();
const {
    getLastTrade,
    getSymbolDetails,
    getMultipleSymbolDetails,
    getInitialTickerData,
} = require('../ports/simdaqApi');

const fetch = require('node-fetch');
jest.mock('node-fetch', () => {
    return jest.fn();
})

const SIMDAQ_API_HOST = process.env.SIMDAQ_API_HOST;
const SIMDAQ_API_LAST_TRADE_PATH = process.env.SIMDAQ_API_LAST_TRADE_PATH;
const SIMDAQ_API_SYMBOL_DETAILS_PATH = process.env.SIMDAQ_API_SYMBOL_DETAILS_PATH;


describe('simdaqApi', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });    
    describe('getLastTrade', () => {
        it('should call simdaq last trade rest endpoint with symbol parameters', async () => {
            const symbols = ['FOO','BAZ'];
            const expectedUrlHostPath = `${SIMDAQ_API_HOST}${SIMDAQ_API_LAST_TRADE_PATH}${symbols}`;
            const fakeResponse = Promise.resolve({
                ok: true,
                status: 200,
                json: async () => {
                    return {};
                },
            });
            fetch.mockImplementation(()=> fakeResponse);

            const restult = await getLastTrade(symbols)

            expect(fetch).toHaveBeenCalledWith(expectedUrlHostPath);
        });
    });

    describe('getSymbolDetails', () => {
        it('should call simdaq reference symbol rest endpoint with symbol parameter', async () => {
            const symbol = 'BAR';
            const expectedUrlHostPath = `${SIMDAQ_API_HOST}${SIMDAQ_API_SYMBOL_DETAILS_PATH}${symbol}`;
            const fakeResponse = Promise.resolve({
                ok: true,
                status: 200,
                json: async () => {
                    return {};
                },
            });
            fetch.mockImplementation(()=> fakeResponse);

            const restult = await getSymbolDetails(symbol)

            expect(fetch).toHaveBeenCalledWith(expectedUrlHostPath);
        });
    });
    describe('getMultipleSymbolDetails', () => {
        it('should call simdaq reference symbol rest endpoint for all symbol parameters', async () => {
            const symbols = ['FOO','BAZ'];
            const expectedUrlHostPath = `${SIMDAQ_API_HOST}${SIMDAQ_API_SYMBOL_DETAILS_PATH}`;
            const fakeResponse = Promise.resolve({
                ok: true,
                status: 200,
                json: async () => {
                    return {};
                },
            });
            fetch.mockImplementation(()=> fakeResponse);

            const restult = await getMultipleSymbolDetails(symbols)

            expect(fetch.mock.calls.length).toEqual(symbols.length)
            expect(fetch).toHaveBeenCalledWith(`${expectedUrlHostPath}${symbols[0]}`);
            expect(fetch).toHaveBeenCalledWith(`${expectedUrlHostPath}${symbols[1]}`);
        });        
    });
    describe('getInitialTickerData', () => {
        it('should call simdaq last trade and reference symbol rest endpoints for all symbol parameters', async () => {
            const symbols = ['FOO','BAZ'];

            const expectedLastTradeUrl = `${SIMDAQ_API_HOST}${SIMDAQ_API_LAST_TRADE_PATH}${symbols}`;
            const expectedReferenceSymbolHostPath = `${SIMDAQ_API_HOST}${SIMDAQ_API_SYMBOL_DETAILS_PATH}`;
            const fakeResponse = Promise.resolve({
                ok: true,
                status: 200,
                json: async () => {
                    return {};
                },
            });
            fetch.mockImplementation(()=> fakeResponse);

            const restult = await getInitialTickerData(symbols)

            expect(fetch).toHaveBeenCalledWith(expectedLastTradeUrl);
            expect(fetch).toHaveBeenCalledWith(`${expectedReferenceSymbolHostPath}${symbols[0]}`);
            expect(fetch).toHaveBeenCalledWith(`${expectedReferenceSymbolHostPath}${symbols[1]}`);
        });

    });
});