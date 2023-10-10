import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { StockTicker } from './StockTicker';
import {
    applyStockUpdate,
    applyPriceHistoryUpdate
} from '../adapters/tickerAdapters.js'
import './StockTickers.css';

export function StockTickers({symbols}) {

    const [uniqueKey, setUniqueKey] = useState(0);
    const [stocks, setStocks] = useState([]);
    const [chartDataObject, setChartDataObject] = useState({});

    useEffect(() => {
        const socket = io(import.meta.env.VITE_TICKET_WEB_API_HOST, {
            withCredentials: true,
            transports: [
                'websocket',
                'polling',
            ]
        });
        
        socket.on('connect', () => {
            socket.emit(import.meta.env.VITE_REQUEST_STOCKS_EVENT_NAME, symbols);
        });

        socket.on(import.meta.env.VITE_STOCK_UPDATE_EVENT_NAME, stockUpdate => {
            setStocks(currentStocks => {
                return applyStockUpdate(currentStocks, stockUpdate);
            });
            setChartDataObject(currentPriceHistory => {
                return applyPriceHistoryUpdate(currentPriceHistory, stockUpdate);
            });
            setUniqueKey(currentValue => {
                return performance.now();
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
            {stocks.map((stock, index) => {
                stock.chartData = chartDataObject[stock.symbol];
                return (
                    <StockTicker
                        key={'ticker-'+stock.symbol}
                        {...stock}
                    />
                )
            })}
        </div>
      </>
    )
}
