const db = require('../ports/db')

function getLastTrade(req, reply) {
    let { symbols } = req.params;
    symbols = symbols.split(',');

    let response = db.getLastTrade(symbols);

    reply.send(response)
}

module.exports = {
    getLastTrade
}