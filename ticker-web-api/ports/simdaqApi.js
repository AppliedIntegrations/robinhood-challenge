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

async function getSymbolDetails(symbols) {
    const response = await fetch(`http://localhost:5008/v1/nasdaq/realtime/equities/lasttrade/${symbols}`);
    const data = await response.json();
    if(Array.isArray(data)){
        return data.filter()
    }
}

module.exports = {
    getLastTrade,
    getSymbolDetails,
}