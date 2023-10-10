import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { StockTicker } from './StockTicker';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
} from 'recharts';
import './StockTickers.css';

export function StockTickers({symbols}) {

    const [stocks, setStocks] = useState([]);
    const [chartData, setChartData] = useState([]);
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
            // console.log('request stocks ', symbols);
            socket.emit('request-stocks', symbols);
        });    

        socket.on('stocks', stockUpdate => {
            setStocks(currentStocks => {
                return applyStockUpdate(currentStocks, stockUpdate);
            });
            setChartData(currentChartData => {
                return [...currentChartData, {
                    symbol: stockUpdate[0].symbol,
                    price: stockUpdate[0].price,
                }]
            });
            setChartDataObject(currentChartData => {
                const newState = JSON.parse(JSON.stringify(currentChartData));
                for(let stockUpdateItem of stockUpdate){
                    if(!Array.isArray(newState[stockUpdateItem.symbol])) {
                        newState[stockUpdateItem.symbol] = [];
                    }
                    newState[stockUpdateItem.symbol].push({
                        symbol: stockUpdateItem.symbol,
                        price: stockUpdateItem.price,
                    });
                }
                return newState;
            });
        });
        return function cleanup() {
            socket.disconnect();
        };
    }, []);

    function applyStockUpdate(currentStocks, stockUpdate) {
        if(currentStocks.length === 0){
            for(let stockUpdateItem of stockUpdate){
                stockUpdateItem.priceHistory = [{
                    symbol: stockUpdateItem.symbol,
                    price: stockUpdateItem.price,
                }]
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
                stock.priceHistory.push({
                    symbol: stock.symbol,
                    price: stock.price,                    
                });
                return stock;
            });            
            return updatedStocks;
        }
    }
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
