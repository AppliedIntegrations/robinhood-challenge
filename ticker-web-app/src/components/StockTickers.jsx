import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { StockTicker } from './StockTicker';
import './StockTickers.css';

const socket = io('http://localhost:3000', {
    transports: [
        'websocket',
        'polling',
    ]
});

export function StockTickers({symbols}) {

    socket.on('connect', () => {
        console.log('request stocks ', symbols);
        socket.emit('request-stocks', symbols);
    });
        const [stocks, setStocks] = useState([]);

    useEffect(() => {
        socket.on('stocks', stockData => {
            console.log('socket on stockData is ', stockData);
            setStocks(stockData)
        })
    }, [])
    return (
      <>
        <div className='stock-tickers-header'>
            <div className='stock-tickers-title'>My Stocks</div>
            <div className='stock-tickers-count'>{stocks.length} items</div>
        </div>
        <hr className='stock-tickers-hr'/>
        <div className="stock-ticker-list">
            {stocks.length === 0 && "No Stocks"}
            {stocks.map(stock => {
                console.log('symbol is ', stock.symbol);
                return (
                    <StockTicker
                        {...stock}
                        key={stock.symbol}
                    />
                )
            })}
        </div>       
      </>
    )
}
