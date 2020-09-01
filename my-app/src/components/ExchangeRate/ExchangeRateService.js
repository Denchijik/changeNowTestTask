 
export const getExchangeRate = () => {
    return fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHBTC", {
        "method": "GET",
    })
};