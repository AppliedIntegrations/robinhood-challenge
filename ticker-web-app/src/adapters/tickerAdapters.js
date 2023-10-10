export function applyStockUpdate(currentStocks, stockUpdate) {
    if(currentStocks.length === 0){
        for(let stockUpdateItem of stockUpdate){
            stockUpdateItem.percentageChange = 0.00;
        }
        return stockUpdate;
    } else {
        const updatedStocks = currentStocks.map(stock => {
            const newPriceData = stockUpdate.find(stockUpdateItem => {
                return stockUpdateItem.symbol === stock.symbol;
            });
            const originalPrice = stock.price;
            const difference = newPriceData.price - originalPrice;
            stock.price = newPriceData.price;
            stock.percentageChange = +(Math.round((difference/originalPrice)*100 + "e+2")  + "e-2");
            return stock;
        });            
        return updatedStocks;
    }
}

export function applyPriceHistoryUpdate(currentPriceHistory, stockUpdate) {
    const newState = JSON.parse(JSON.stringify(currentPriceHistory));
    console.log('currentPriceHistory ', newState)
    for(let stockUpdateItem of stockUpdate){
        console.log('loop stock update ', stockUpdateItem)
        if(!Array.isArray(newState[stockUpdateItem.symbol])) {
            newState[stockUpdateItem.symbol] = [];
        }
        newState[stockUpdateItem.symbol].push({
            symbol: stockUpdateItem.symbol,
            price: stockUpdateItem.price,
        });
        console.log('after append newState is ', newState);
    }
    return newState;    
}

