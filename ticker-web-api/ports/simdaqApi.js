const fetch = require('node-fetch');

async function getLastTrade(symbols) {
    const response = await fetch(`${process.env.SIMDAQ_API_HOST}${process.env.SIMDAQ_API_LAST_TRADE_PATH}${symbols}`);
    const data = await response.json();
    return data;
}

async function getSymbolDetails(symbol) {
    const response = await fetch(`${process.env.SIMDAQ_API_HOST}${process.env.SIMDAQ_API_SYMBOL_DETAILS_PATH}${symbol}`);
    const data = await response.json();
    return data;
}

async function getMultipleSymbolDetails(symbols) {
    const apiPromises = [];
    for(let symbol of symbols){
        apiPromises.push(getSymbolDetails(symbol));
    }
    return Promise.allSettled(apiPromises);
}

async function getInitialTickerData(symbols) {
    return Promise.allSettled([
        getLastTrade(symbols),
        getMultipleSymbolDetails(symbols)
    ]);
}

module.exports = {
    getLastTrade,
    getSymbolDetails,
    getMultipleSymbolDetails,
    getInitialTickerData,
}