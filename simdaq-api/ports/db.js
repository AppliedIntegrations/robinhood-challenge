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
]

function getLastTrade(symbols){
    const result = lastTrades
        .filter(lastTrade => (symbols.includes(lastTrade.symbol)))
        .map(lastTrade => {
            const originalPrice = lastTrade.price;
            lastTrade.price = getRandomPriceInRange(originalPrice);
            lastTrade.changeIndicator = setChangeIndicator(lastTrade.price, originalPrice);
            return lastTrade;
        });

    return result;
}

function setChangeIndicator(newPrice, originalPrice){
    if(newPrice === originalPrice) {
        return 0;
    } else if(newPrice > originalPrice ){
        return 1;
    } else {
        return -1;
    }
}
function getRandomPriceInRange(originalPrice) {
    originalPrice *= 100;
    let min = originalPrice - (originalPrice * .05);
    let max = originalPrice + (originalPrice * .05);
    const newPrice =  Math.floor(Math.random() * (max - min + 1) + min);
    return +(Math.round(newPrice/100 + "e+2")  + "e-2")
}

function getSymbolDetails(symbol){
    const detail = symbolDetails.find(symbolDetail => {
        if(symbolDetail.symbol === symbol){
            return true
        }
    });
    return detail;
}


module.exports = {
    getLastTrade,
    getSymbolDetails,
}