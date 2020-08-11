const express = require('express');
var app = express();
var mongoose = require("mongoose");
var amqp = require('amqplib/callback_api');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost/logop', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);

var logSchema = new mongoose.Schema({

    CreatedTime : {type : Date, default:Date.now} ,
      logObject  :  Object 
  });
  
var logging = mongoose.model('logging', logSchema, 'objlog');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        } 
        var queue = 'logChannel';
        channel.assertQueue(queue, {
            durable: false
        });
        //console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (data) {
            objList = JSON.parse(data.content.toString());

            for (var i = 0; i < objList.length; i++) {
                var objLog = new logging(objList[i]);
                var result = objLog.save();
            }
            
            console.log("MongoDB'ye Kaydedilen Veri : %s", objList);
        }, {
            noAck: true
        });
    });
});