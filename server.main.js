const http = require('http');
const app = require('./app.main');

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
    switch (error.code) {
        case "EACCES":
            console.log(bind + ' requires eleveted privilages!');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : "port " + port;
}

const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

const server = http.createServer(app, console.log('server is runing on port: ', port));

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
