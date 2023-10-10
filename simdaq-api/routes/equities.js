// Real Nasdaq API: https://github.com/Nasdaq/NasdaqCloudDataService-REST-API/blob/main/restapi/lastquote.md
// GET https://<base_url>/v1/<source>/<offset>/equities/lasttrade/<symbols>
// 'https://example.com/v1/nasdaq/realtime/equities/lasttrade/ZVZZT' \ --header "Authorization: Bearer example_token"

const {
    getLastTrade,
} = require('../controllers/equities')

const LastTradeSchema = {
    type: 'object',
    properties: {
        symbol: {
            type: 'string'
        },
        timestamp: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        size: {
            type: 'number'
        },
        conditions: {
            type: 'string'
        },
        exchange: {
            type: 'string'
        },
        securityClass: {
            type: 'string'
        },
        changeIndicator: {
            type: 'number'
        }
    },
}

const getLastTradeOptions = {
    schema: {
      response: {
        200: {
            type: 'array',
            lastTrades: LastTradeSchema,
        }
      },
    },
    handler: getLastTrade,
}

function equitiesRoutes(fastify, options, done) {

    // <symbols> - Security identifier(s): if more than one, use comma separated list
    fastify.get('/v1/nasdaq/realtime/equities/lasttrade/:symbols', getLastTradeOptions);

    done();
}

module.exports = equitiesRoutes