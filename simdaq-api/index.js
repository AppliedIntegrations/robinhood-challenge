const fastify = require('fastify')({logger:true});

const start = async () => {
    try{
        await fastify.listen({
            port: 5008,
        });        
    } catch(error){
        fastify.log.error(error);
        exit(1)
    }
}

fastify.register(require('./routes/equities'))


start();