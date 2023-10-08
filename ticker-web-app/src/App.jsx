import { useState, useEffect } from 'react'
import { AppHeader } from './components/AppHeader'
import { AppFooter } from './components/AppFooter'
import { StockTickers } from './components/StockTickers'
import './App.css'


function App() {
    const [userSymbols] = useState([
        'GFS',
        'BKR',
        'CPRT',
        'PDD',
        'CRWD',
    ]);
    return (
        <>
            <AppHeader />
            <StockTickers symbols={userSymbols}/>
            <AppFooter />
        </>
    )
}

export default App
