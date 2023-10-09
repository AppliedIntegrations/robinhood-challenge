import { useState, useEffect } from 'react'
import { AppHeader } from './components/AppHeader'
import { AppFooter } from './components/AppFooter'
import { StockTickers } from './components/StockTickers'
import { DummyComponent } from './components/DummyComponent'
import './App.css'


function App() {
    const [userStockSymbols] = useState([
        'GFS',
        'BKR',
        'CPRT',
        'PDD',
        'CRWD',
    ]);
    let [showStockTicker, setShowStockTicker] = useState(true);
    let [ComponentToShow] = useState(null)

    const changeShowStockTicker = () => {
        setShowStockTicker(!showStockTicker)
    }

    if(showStockTicker){
        ComponentToShow = <StockTickers symbols={userStockSymbols} />
    } else {
        ComponentToShow = <DummyComponent />
    }

    return (
        <>
            <AppHeader />
            {ComponentToShow}
            <AppFooter changeShowStockTicker={changeShowStockTicker}/>
        </>
    )
}

export default App
