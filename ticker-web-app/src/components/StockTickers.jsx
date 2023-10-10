import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { StockTicker } from './StockTicker';
import {
    applyStockUpdate,
    applyPriceHistoryUpdate
} from '../adapters/tickerAdapters.js'

import './StockTickers.css';

export function StockTickers({symbols}) {

    const [stocks, setStocks] = useState([]);
    const [chartDataObject, setChartDataObject] = useState({});

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            withCredentials: true,
            transports: [
                'websocket',
                'polling',
            ]
        });
        
        socket.on('connect', () => {
            socket.emit('request-stocks', symbols);
        });    

        socket.on('stocks', stockUpdate => {
            setStocks(currentStocks => {
                return applyStockUpdate(currentStocks, stockUpdate);
            });
            setChartDataObject(currentPriceHistory => {
                return applyPriceHistoryUpdate(currentPriceHistory, stockUpdate);
            });
        });
        return function cleanup() {
            socket.disconnect();
        };
    }, []);

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
                stock.chartData = chartDataObject[stock.symbol];
                return (
                    <>
                        <StockTicker
                            {...stock}
                            key={'ticker-'+stock.symbol}
                        >
                        </StockTicker>
                    </>
                )
            })}
        </div>
      </>
    )
}
