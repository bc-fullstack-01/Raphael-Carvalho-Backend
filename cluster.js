const cluster = require('cluster');
const numCPUs = require ('os').cpus().length;
const process = require ('process');

const express  = require('express')
const bodyParser = require('body-parser')

const postsRoute = require ('./posts/router')

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express()
  app.use(bodyparser.json())
  app.use('/posts', postsRoute(process.pid))

  // Workers can share any TCP connection
  // In this case it is an HTTP server
 app.listen(4000, () => console.log('vc ta rodando a parada'))
  
}
