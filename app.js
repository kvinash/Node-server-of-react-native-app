const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const database = require('./config');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();

//const users = require('./routes/users');
/**create app*/
const app = express();


/**set cors*/
app.use(cors());

//app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(bodyParser());
/**view engine setup */
  
 //app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
/**setting up environment variable */
env = process.env.ENV_VAR || 'dev';


/**inculding project files*/
const routes = require('./routes/routes');

/**setting up routes*/
app.use('/', routes);


if (cluster.isMaster) {

console.log(`Master ${process.pid} is running`);
console.log(numCPUs);


  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  
    app.use(function(req, res, next) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    });


    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
     // res.status(err.status || 500);
      res.send(500,err);
      console.log(err);
    //  res.render("error", { message: err.message, error: {} });
    });
    app.listen(8080, function(err) {
      if(err){
        console.log(err)
      } else {
        console.log("server started");
      }
    });
    

  console.log(`Worker ${process.pid} started`);
}
