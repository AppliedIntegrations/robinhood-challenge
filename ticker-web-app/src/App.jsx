import { useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { AppFooter } from './components/AppFooter'
import { StockTickers } from './components/StockTickers'
import './App.css'

function App() {

  return (
    <>
        <AppHeader />
        <StockTickers />
        <AppFooter />
    </>
  )
}

export default App
