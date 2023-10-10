const stockTicker = require('./stockTicker');

const simdaqApi = require('../ports/simdaqApi');
jest.mock('../ports/simdaqApi'
, () => {
    return {
        getInitialTickerData: jest.fn(),
    }
});

const simdaqApiResult = [
    {
      status: "fulfilled",
      value: [
        {
          symbol: "GFS",
          timestamp: "2021-07-09T09:17:01.383",
          price: 54,
          size: 9,
          conditions: "@ To",
          exchange: "Q",
          securityClass: "Q",
          changeIndicator: -1
        },
        {
          symbol: "BKR",
          price: 35,
          size: 9,
          conditions: "@ To",
          exchange: "Q",
          securityClass: "Q",
          changeIndicator: 0
        },
        {
          symbol: "CPRT",
          price: 44,
          size: 9,
          conditions: "@ To",
          exchange: "Q",
          securityClass: "Q",
          changeIndicator: -1
        },
        {
          symbol: "PDD",
          price: 110,
          size: 9,
          conditions: "@ To",
          exchange: "Q",
          securityClass: "Q",
          changeIndicator: 1
        },
        {
          symbol: "CRWD",
          price: 188,
          size: 9,
          conditions: "@ To",
          exchange: "Q",
          securityClass: "Q",
          changeIndicator: 1
        }
      ]
    },
    {
      status: "fulfilled",
      value: [
        {
          status: "fulfilled",
          value: {
            symbol: "GFS",
            securityName: "GLOBALFOUNDRIES Inc.",
            listingExchange: "Q",
            etf: false,
            ipoFlag: "N"
          }
        },
        {
          status: "fulfilled",
          value: {
            symbol: "BKR",
            securityName: "Baker Hughes Company",
            listingExchange: "Q",
            etf: false,
            ipoFlag: "N"
          }
        },
        {
          status: "fulfilled",
          value: {
            symbol: "CPRT",
            securityName: "Copart, Inc.",
            listingExchange: "Q",
            etf: false,
            ipoFlag: "N"
          }
        },
        {
          status: "fulfilled",
          value: {
            symbol: "PDD",
            securityName: "PDD Holdings Inc.",
            listingExchange: "Q",
            etf: false,
            ipoFlag: "N"
          }
        },
        {
          status: "fulfilled",
          value: {
            symbol: "CRWD",
            securityName: "CrowdStrike Holdings, Inc.",
            listingExchange: "Q",
            etf: false,
            ipoFlag: "N"
          }
        }
      ]
    }
];

describe('stockTicker', () => {
    describe('getInitialTickerData', () => {
        it('should ', async () => {

            const expectedTickerDataResult = [
                {
                  changeIndicator: -1,
                  conditions: "@ To",
                  exchange: "Q",
                  price: 54,
                  securityClass: "Q",
                  securityName: "GLOBALFOUNDRIES Inc.",
                  size: 9,
                  symbol: "GFS",
                  timestamp: "2021-07-09T09:17:01.383"
                },
                {
                  changeIndicator: 0,
                  conditions: "@ To",
                  exchange: "Q",
                  price: 35,
                  securityClass: "Q",
                  securityName: "Baker Hughes Company",
                  size: 9,
                  symbol: "BKR"
                },
                {
                  changeIndicator: -1,
                  conditions: "@ To",
                  exchange: "Q",
                  price: 44,
                  securityClass: "Q",
                  securityName: "Copart, Inc.",
                  size: 9,
                  symbol: "CPRT"
                },
                {
                  changeIndicator: 1,
                  conditions: "@ To",
                  exchange: "Q",
                  price: 110,
                  securityClass: "Q",
                  securityName: "PDD Holdings Inc.",
                  size: 9,
                  symbol: "PDD"
                },
                {
                  changeIndicator: 1,
                  conditions: "@ To",
                  exchange: "Q",
                  price: 188,
                  securityClass: "Q",
                  securityName: "CrowdStrike Holdings, Inc.",
                  size: 9,
                  symbol: "CRWD"
                }
            ];

            const symbols = ['FOO','BAZ'];
            simdaqApi.getInitialTickerData.mockImplementationOnce(async () => {
                return simdaqApiResult;
            });
            const result = await stockTicker.getInitialTickerData(symbols);

            expect(simdaqApi.getInitialTickerData).toHaveBeenCalledWith(symbols);
            expect(result).toEqual(expectedTickerDataResult);
        })
    })
})