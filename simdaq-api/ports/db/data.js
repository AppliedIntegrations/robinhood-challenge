const lastTrades = [
    {
        symbol:'GFS',
        timestamp: "2021-07-09T09:17:01.383",
        price: 56.92,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
    },
    {
        symbol:'BKR',
        timestamp: "2021-07-09T09:17:01.383",
        price: 33.73,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
    },
    {
        symbol:'CPRT',
        timestamp: "2021-07-09T09:17:01.383",
        price: 44.83,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
    },
    {
        symbol:'PDD',
        timestamp: "2021-07-09T09:17:01.383",
        price: 105.64,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
    },
    {
        symbol:'CRWD',
        timestamp: "2021-07-09T09:17:01.383",
        price: 176.69,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
    },
];

const symbolDetails = [
    {
        symbol:'GFS',
        securityName: 'GLOBALFOUNDRIES Inc.',
        etf: false,
        listingExchange: "Q",
        ipoFlag: "N"
    },
    {
        symbol:'BKR',
        securityName: 'Baker Hughes Company',
        etf: false,
        listingExchange: "Q",
        ipoFlag: "N"
    },
    {
        symbol:'CPRT',
        securityName: 'Copart, Inc.',
        etf: false,
        listingExchange: "Q",
        ipoFlag: "N"
    },
    {
        symbol:'PDD',
        securityName: 'PDD Holdings Inc.',
        etf: false,
        listingExchange: "Q",
        ipoFlag: "N"
    },
    {
        symbol:'CRWD',
        securityName: 'CrowdStrike Holdings, Inc.',
        etf: false,
        listingExchange: "Q",
        ipoFlag: "N"
    },
];

module.exports = {
    lastTrades,
    symbolDetails,
}