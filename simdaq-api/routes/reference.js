// Real Nasdaq API: https://github.com/Nasdaq/NasdaqCloudDataService-REST-API/blob/main/restapi/lastquote.md
// GET https://<base_url>/v1/<source>/<offset>/equities/lasttrade/<symbols>
// GET 'https://example.com/v1/reference/symbol/ZXZZT' \ --header "Authorization: Bearer example_token"
const {
    getSymbolDetails,
} = require('../controllers/reference')

// LastTrade schema
const SymbolDetails = {
    type: 'object',
    properties: {
        symbol: {
            type: 'string'
        },
        securityName: {
            type: 'string'
        },
        listingExchange: {
            type: 'string'
        },
        etf: {
            type: 'boolean'
        },
        ipoFlag: {
            type: 'string'
        },
    },
}


const getSymbolDetailsOptions = {
    schema: {
      response: {
        200: SymbolDetails
      },
    },
    handler: getSymbolDetails,
}


function referencRoutes(fastify, options, done) {

    // <symbol> - Identifier for the security
    fastify.get('/v1/reference/symbol/:symbol', getSymbolDetailsOptions);
    done();
}


module.exports = referencRoutes