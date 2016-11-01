/**
 * Created by tamarahills on 10/20/16.
 */

"use strict"

var MPU6050 = require('i2c-mpu6050');
var i2c = require('i2c-bus');
var nconf = require('nconf');
var address = 0x68;

// Use nconf to get the sensitivity for the accelerometer..
nconf.argv()
   .env()
.file({ file: __dirname + '/config.json' });


/**
 * This function listents synchronously for accelerometer activity
 * which is greater than the sensitvity variable.  Once it detects
 * this level of motion, the process exits and it's signaled to the
 * process that called exec on it.  The callback to exec is then 
 * called.
 */
function listen() {
    var i2c1 = i2c.openSync(1);
    var sensor = new MPU6050(i2c1, address);
    var sensitivity = nconf.get('sensitivity');
    while(true) {
        var sensorData = sensor.readSync();
        if (Math.abs(sensorData.accel.x) > sensitivity ||
            Math.abs(sensorData.accel.y) > sensitivity ||
            Math.abs(sensorData.accel.z) > sensitivity) {
              console.log('Detected Motion');
              break;
        }    
    }
};
listen();
