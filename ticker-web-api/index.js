// (B) Node server to handle API requests
require('dotenv').config();
console.log(process.env) // remove this after you've confirmed it is working
const io = require('socket.io')(3000, {
    cors: {
        origin: [
            'http://localhost:5173'
        ]
    }
});
const stockTicker = require('./controllers/stockTicker')

const clientIntervals = {};

io.on('connection', client => {
    console.log('client id ', client.id);

    client.on('request-stocks', async (symbols) => {
        const initialLastTrades = await stockTicker.getInitialTickerData(symbols);
        // console.log('initialLastTrades ', initialLastTrades);
        client.emit('stocks', initialLastTrades);

        const interval = setInterval(async () => {
                const stocks = await stockTicker.getLastTrade(symbols);
            client.emit('stocks', stocks);
            console.log('emitting stocks ', stocks);
        }, 1000);

        if(clientIntervals[client.id]){
            clearInterval(clientIntervals[client.id])
        }
        clientIntervals[client.id] = interval;
    });
    client.on("disconnect", (reason) => {
        console.warn('client disconnected ', client.id);
        clearInterval(clientIntervals[client.id])
    });    
});
