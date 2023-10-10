const simdaqApi = require('../ports/simdaqApi');

const tickerResult = [
    {
      "status": "fulfilled",
      "value": [
        {
          "symbol": "GFS",
          "timestamp": "2021-07-09T09:17:01.383",
          "price": 54,
          "size": 9,
          "conditions": "@ To",
          "exchange": "Q",
          "securityClass": "Q",
          "changeIndicator": -1
        },
        {
          "symbol": "BKR",
          "price": 35,
          "size": 9,
          "conditions": "@ To",
          "exchange": "Q",
          "securityClass": "Q",
          "changeIndicator": 0
        },
        {
          "symbol": "CPRT",
          "price": 44,
          "size": 9,
          "conditions": "@ To",
          "exchange": "Q",
          "securityClass": "Q",
          "changeIndicator": -1
        },
        {
          "symbol": "PDD",
          "price": 110,
          "size": 9,
          "conditions": "@ To",
          "exchange": "Q",
          "securityClass": "Q",
          "changeIndicator": 1
        },
        {
          "symbol": "CRWD",
          "price": 188,
          "size": 9,
          "conditions": "@ To",
          "exchange": "Q",
          "securityClass": "Q",
          "changeIndicator": 1
        }
      ]
    },
    {
      "status": "fulfilled",
      "value": [
        {
          "status": "fulfilled",
          "value": {
            "symbol": "GFS",
            "securityName": "GLOBALFOUNDRIES Inc.",
            "listingExchange": "Q",
            "etf": false,
            "ipoFlag": "N"
          }
        },
        {
          "status": "fulfilled",
          "value": {
            "symbol": "BKR",
            "securityName": "Baker Hughes Company",
            "listingExchange": "Q",
            "etf": false,
            "ipoFlag": "N"
          }
        },
        {
          "status": "fulfilled",
          "value": {
            "symbol": "CPRT",
            "securityName": "Copart, Inc.",
            "listingExchange": "Q",
            "etf": false,
            "ipoFlag": "N"
          }
        },
        {
          "status": "fulfilled",
          "value": {
            "symbol": "PDD",
            "securityName": "PDD Holdings Inc.",
            "listingExchange": "Q",
            "etf": false,
            "ipoFlag": "N"
          }
        },
        {
          "status": "fulfilled",
          "value": {
            "symbol": "CRWD",
            "securityName": "CrowdStrike Holdings, Inc.",
            "listingExchange": "Q",
            "etf": false,
            "ipoFlag": "N"
          }
        }
      ]
    }
  ]


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