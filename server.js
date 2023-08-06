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

fastify.listen({ port: 3000 }, (err) => {
  console.log('Running on 3000');
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})