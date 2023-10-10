const {lastTrades, symbolDetails} = require('./data');
const {setChangeIndicator, getRandomPriceInRange} = require('./priceFunctions');

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