const express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
app.use(cors());
var amqp = require('amqplib/callback_api');
const rabbitUrl = 'amqp://localhost';

function sendRabbitMQ(logChannel, data){

    amqp.connect('amqp://localhost', function(error0, connection) {
      
        if (error0) {
            throw error0;  
        }
        connection.createChannel(function(error1, channel) { 
             if (error1) {
                throw error1;
            }        
            var queue = logChannel;

            channel.assertQueue(queue, {
                durable: false
             });


            channel.sendToQueue(queue, Buffer.from(data));
            console.log("logChannel Kuyruğuna Giden Veri : %s", data);
        });
        setTimeout(function() { 
            connection.close(); 
            process.exit(0) 
        },500);
    });
}

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}));
 // MONGODB
mongoose.connect('mongodb://localhost/logop', {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set('useFindAndModify',false);

var logSchema = new mongoose.Schema({

  CreatedTime : {type : Date, default:Date.now} ,
    logObject  :  Object
    
});

var logging =mongoose.model('logging', logSchema, 'objlog');

app.post('/insert',async(req,res)=>{      

    try {
     //  var objList = new logging(req.body);
        sendRabbitMQ("logChannel", JSON.stringify(req.body));           
        res.send();
    } 
    catch (error) {

        return res.status(500).send(error);    
     }
 });

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})

