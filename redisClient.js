const {createClient} = require(`redis`);

const redis =   createClient();

redis.on('error', (err) => console.log('Redis Client Error', err));

(async ()=>{

await redis.connect();
})();



module.exports = redis;

