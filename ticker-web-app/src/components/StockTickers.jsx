import {useState} from 'react';
import { StockTicker } from './StockTicker';
import './StockTickers.css';

export function StockTickers() {
    const [stocks] = useState([
        {
            symbol:'GFS',
            name: 'GLOBALFOUNDRIES Inc.',
            chart: [],
            value: 1,
            percentageChange: 5.0,
        },
        {
            symbol:'BKR',
            name: 'Baker Hughes Company',
            chart: [],
            value: 1,
            percentageChange: 5.0,
        },
        {
            symbol:'CPRT',
            name: 'Copart, Inc.',
            chart: [],
            value: 1,
            percentageChange: -5.0,
        },
        {
            symbol:'PDD',
            name: 'PDD Holdings Inc.',
            chart: [],
            value: 1,
            percentageChange: 5.0,
        },
        {
            symbol:'CRWD',
            name: 'CrowdStrike Holdings, Inc.',
            chart: [],
            value: 1,
            percentageChange: 5.0,
        },
    ]);

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
