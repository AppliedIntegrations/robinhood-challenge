const fetch = require('node-fetch');

// const options = {
//   hostname: 'yourapi.com',
//   port: 443,
//   path: '/todos',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
// }

async function getLastTrade(symbols) {
    const response = await fetch(`http://localhost:5008/v1/nasdaq/realtime/equities/lasttrade/${symbols}`);
    const data = await response.json();
    return data;
}

async function getSymbolDetails(symbol) {
    const response = await fetch(`http://localhost:5008/v1/reference/symbol/${symbol}`);
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