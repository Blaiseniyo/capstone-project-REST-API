const http = require('http');
const app =require('./app');

const port = process.env.PORT || 3700;

const server =http.createServer(app);

server.listen(port,()=>{
    console.log(`CORS-enabled web server listening on port ${port}  ...`);
});