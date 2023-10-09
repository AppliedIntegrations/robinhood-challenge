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

        // name: 'GLOBALFOUNDRIES Inc.',
        // percentageChange: 5.0,
    },
    {
        symbol:'BKR',
        price: 33.73,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
        // name: 'Baker Hughes Company',
        // percentageChange: 5.0,
    },
    {
        symbol:'CPRT',
        price: 44.83,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
        // name: 'Copart, Inc.',
        // percentageChange: -5.0,
    },
    {
        symbol:'PDD',
        price: 105.64,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,

        // name: 'PDD Holdings Inc.',
        // percentageChange: 5.0,
    },
    {
        symbol:'CRWD',
        price: 176.69,
        size: 9,
        conditions: "@ To",
        exchange: "Q",
        securityClass: "Q",
        changeIndicator: 0,
        // name: 'CrowdStrike Holdings, Inc.',
        // percentageChange: 5.0,
    },
];

function getLastTrade(symbols){
    console.log('symbols ', symbols);

    const result = lastTrades
        .filter(lastTrade => (symbols.includes(lastTrade.symbol)))
        .map(lastTrade => {
            const originalPrice = lastTrade.price;
            lastTrade.price = getRandomPriceInRange(originalPrice);
            lastTrade.changeIndicator = setChangeIndicator(lastTrade.price, originalPrice);
            return lastTrade;
        });

    console.log('result is ', result);
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
    let min = originalPrice - (originalPrice * .05);
    let max = originalPrice + (originalPrice * .05);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    getLastTrade,
}