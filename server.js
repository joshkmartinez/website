const fastify = require('fastify')({ logger: true })
const path = require('path');
const staticServe = require('@fastify/static');

fastify.register(staticServe, {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

const curlResponse = `Why hello there. I'm Joshua. I can be reached at contact(at)jkm.sh
`

fastify.get('/', function (request, reply) {
  if(request.headers['user-agent'].includes("curl")){
    return reply.send(curlResponse)
  }

  return reply.sendFile('index.html');
});

const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT }, (err) => {
  console.log('Running on ' + PORT);
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})