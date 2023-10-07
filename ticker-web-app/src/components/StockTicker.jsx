import './StockTicker.css'

export function StockTicker({ symbol, name, chart, value, percentageChange }) {
    let percentageChangeClass = 'percentage-change';
    percentageChangeClass += percentageChange < 0 ? ' negative': ' positive';
    return (
      <>
        <div className="ticker-row">
            <div className='ticker-cell'>
                <div className='symbol'>{symbol}</div>
                <div className='name'>{name}</div>
            </div>
            <div className='ticker-cell'>
                <div className='value'>{value}</div>
            </div>
            <div className='ticker-cell'>
                <div className={percentageChangeClass}>{percentageChange}%</div>
            </div>
        </div>
        <hr className='stock-tickers-hr'/>
      </>
    )
}
