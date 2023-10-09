const db = require('../ports/db')

// Get details for an equities symbol.
function getSymbolDetails(req, reply) {
    let { symbol } = req.params;
    let response = db.getSymbolDetails(symbol);
    reply.send(response);
}

module.exports = {
    getSymbolDetails
}