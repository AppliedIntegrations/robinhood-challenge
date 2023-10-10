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
    return +(Math.round(newPrice/100 + "e+2")  + "e-2")
}

module.exports = {
    setChangeIndicator,
    getRandomPriceInRange,
}