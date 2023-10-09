// (B) Node server to handle API requests
const simdaqApi = require('./ports/simdaqApi');
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

    client.on('request-stocks', async (symbols) => {
        // need to get the lastTrade and reference/symbol 
        const initialLastTrades = await simdaqApi.getLastTrade(symbols);
        client.emit('stocks', initialLastTrades);

        const interval = setInterval(async () => {
            const stocks = await simdaqApi.getLastTrade(symbols);
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
