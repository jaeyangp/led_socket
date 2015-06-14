// UCSC extension
// Designing with Xilinx FPGA
// Final project
// Zybo and node.js
// LED on/off via Web
//
// node.js modules: socket.io, onoff
//
// Jae Yang Park (jaeyangp@gmail.com)
// 

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var sock;

app.listen(8001, function() {
    console.log('listening on *.8001');
});

// ZYBO PMOD JB 1: 86, 2: 87, 3: 88,..
var GPIO = require('onoff').Gpio;
var led1 = new GPIO(86, 'out');
var led2 = new GPIO(87, 'out');
var led3 = new GPIO(88, 'out');

//Init LED to off
led1.writeSync(0);
led2.writeSync(0);
led3.writeSync(0);
 
function handler (req, res) {
    fs.readFile('index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function (socket) {
    sock = socket;
    socket.on('led1', function (data) {
        console.log(data);

        if (data == 'on'){
            led1.writeSync(1);
            socket.emit('ledstatus', 'green');
        }else{
            led1.writeSync(0);
            socket.emit('ledstatus', 'white');
        }
     });

     socket.on('led2', function (data) {
        console.log(data);
        if (data == 'on'){
            led2.writeSync(1);
            socket.emit('ledstatus', 'red');
        }else{
            led2.writeSync(0);
            socket.emit('ledstatus', 'white');
        }
     });

     socket.on('led3', function (data) {
        console.log(data);
        if (data == 'on'){
            led3.writeSync(1);
            socket.emit('ledstatus', 'yellow');
        }else{
            led3.writeSync(0);
            socket.emit('ledstatus', 'white');
        }
     });
});
