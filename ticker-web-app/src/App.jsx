import { useState, useEffect } from 'react'
import { StockTickers } from './components/StockTickers'
import './App.css'

function App() {
    const [userStockSymbols] = useState([
        'GFS',
        'BKR',
        'CPRT',
        'PDD',
        'CRWD',
    ]);
    return (
        <>
            <StockTickers symbols={userStockSymbols} />
        </>
    )
}

export default App
