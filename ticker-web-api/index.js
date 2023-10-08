// (B) Node server to handle API requests

const io = require('socket.io')(3000, {
    cors: {
        origin: [
            'http://localhost:5173'
        ]
    }
});

const clientIntervals = {};

io.on('connection', client => {
    console.log('client id ', client.id);

    client.on('request-stocks', symbols => {
        const interval = setInterval(() => {
            const stocks = getStocks(symbols);
            client.emit('stocks', stocks);
            console.log('emitting stocks ', stocks);
        }, 1000);

        if(clientIntervals[client.id]){
            clearInterval(clientIntervals[client.id])
        }
        clientIntervals[client.id] = interval;
    });
    client.on("disconnect", (reason) => {
        console.warn('disconnect ', client.id);
        clearInterval(clientIntervals[client.id])
    });    
});


function queryStocks(symbols){
    const stocks = [
        {
            symbol:'GFS',
            name: 'GLOBALFOUNDRIES Inc.',
            chart: [],
            price: 56.92,
            percentageChange: 5.0,
        },
        {
            symbol:'BKR',
            name: 'Baker Hughes Company',
            chart: [],
            price: 33.73,
            percentageChange: 5.0,
        },
        {
            symbol:'CPRT',
            name: 'Copart, Inc.',
            chart: [],
            price: 44.83,
            percentageChange: -5.0,
        },
        {
            symbol:'PDD',
            name: 'PDD Holdings Inc.',
            chart: [],
            price: 105.64,
            percentageChange: 5.0,
        },
        {
            symbol:'CRWD',
            name: 'CrowdStrike Holdings, Inc.',
            chart: [],
            price: 176.69,
            percentageChange: 5.0,
        },
    ];
    return stocks.filter(stock => (symbols.includes(stock.symbol)))
}
function getStocks(symbols) {
    const stocks = queryStocks(symbols);
    return stocks.map(stock => {
        const originalPrice = stock.price;
        const min = originalPrice - (originalPrice * .05);
        const max = originalPrice + (originalPrice * .05);
        stock.price = getRandomPriceInRange(min, max);
        const difference = stock.price-originalPrice;
        stock.percentageChange = +(Math.round((difference/originalPrice)*100 + "e+2")  + "e-2");
        return stock;
    });
}

function getRandomPriceInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

