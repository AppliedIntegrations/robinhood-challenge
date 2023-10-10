const simdaqApi = require('../ports/simdaqApi');

async function getInitialTickerData(symbols){
    const tickerDataArray = await simdaqApi.getInitialTickerData(symbols);
    const lastTrades = tickerDataArray?.[0]?.value;
    const symbolDetails = tickerDataArray?.[1]?.value;
    return lastTrades.map(lastTrade => {
        const symbolDetail = symbolDetails.find(symbolDetail => {
            return symbolDetail.value.symbol === lastTrade.symbol
        });
        lastTrade.securityName = symbolDetail.value.securityName;
        return lastTrade;
    });
}



function getLastTrade(symbols) {
    return simdaqApi.getLastTrade(symbols);
}

module.exports = {
    getLastTrade,
    getInitialTickerData,
}