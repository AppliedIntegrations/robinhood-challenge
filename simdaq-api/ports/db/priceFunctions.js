function setChangeIndicator(newPrice, originalPrice){
    if(newPrice === originalPrice) {
        return 0;
    } else if(newPrice > originalPrice ){
        return 1;
    } else {
        return -1;
    }
}

function getRandomPriceInRange(originalPrice) {
    originalPrice *= 100;
    let min = originalPrice - (originalPrice * .05);
    let max = originalPrice + (originalPrice * .05);
    const newPrice =  Math.floor(Math.random() * (max - min + 1) + min);
    // done for accurate rounding
    // see https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary/60363414#60363414
    return Number(Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(newPrice/100))
}

module.exports = {
    setChangeIndicator,
    getRandomPriceInRange,
}