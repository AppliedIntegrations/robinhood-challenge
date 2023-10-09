export function AppFooter({changeShowStockTicker}) {
    return (
        <>
            <footer >
                <button  onClick={() => changeShowStockTicker()}>show hide stock ticker</button>
            </footer>
        </>
    )
}