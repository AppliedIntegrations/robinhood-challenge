import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
} from 'recharts';
import './StockTicker.css'

export function StockTicker({ symbol, securityName, price, percentageChange, chartData }) {

    let percentageChangeClass = 'percentage-change';
    let chartColor = '#3edb5b';
    if(percentageChange < 0){
        percentageChangeClass += ' negative';
        chartColor = '#ff392a'
    } else {
        percentageChangeClass += ' positive';
    }

    return (
      <>
        <div className="ticker-row" key={'row-'+symbol}>
            <div className='ticker-cell'>
                <div className='symbol'>{symbol}</div>
                <div className='name'>{securityName}</div>
            </div>
            <div className='ticker-cell'>
                <div className='chart'>
                    <LineChart key={'chart-'+symbol} width={110} height={100} data={chartData}>
                        <Line type="monotone" dataKey="price" stroke={chartColor} />
                    </LineChart>
                </div>
            </div>
            <div className='ticker-cell'>
                <div className='price'>{price.toFixed(2)}</div>
            </div>
            <div className='ticker-cell'>
                <div className={percentageChangeClass}>{percentageChange.toFixed(2)}%</div>
            </div>
        </div>
        <hr className='stock-tickers-hr'/>
      </>
    )
}
