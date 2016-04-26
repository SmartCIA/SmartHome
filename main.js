var Cylon       = require('cylon'),
    express     = require('express.io'),
    Stepper_lib = require('jsupm_uln200xa'),
    ExeStepper  = require('./motor.js'),
    app         = express();
    
//Variable declarations of Microcontroller lamps.
var bathroom = connection_lamp_all = kitchen = room = room2 = controlAll_lamp = bedroom = controlStepper = 0;

app.sensorsReady = false;
app.sensors = {};

app.use(express.static(__dirname + '/public'));
app.http().io();

//Add the routes
routes = require('./routes/smartroute.js')(app);

app.io.route('readySensors', function(req) {
    Cylon.robot({
      connections: {
        galileo: { adaptor: 'intel-iot' }
      },
      devices: {
          temp_bathroom:{ driver: 'analogSensor', pin: 0},
          temp_kitchen:{driver: 'analogSensor', pin:1},
          temp_bedroom:{driver: 'analogSensor', pin:2},
          temp_room:{driver: 'analogSensor', pin:3},
          relay_bathroom: { driver: 'direct-pin', pin: 4 },
          relay_kitchen: { driver: 'direct-pin', pin: 5 },
          relay_room: { driver: 'direct-pin', pin: 6 },
          relay_room2: { driver: 'direct-pin', pin: 3 },
          relay_bedroom: { driver: 'direct-pin', pin: 2 }
      },

      work: function(my) {
          
        app.sensorsReady = true;
        app.sensors = {
            temp_bathroom: my.temp_bathroom,
            temp_kitchen: my.temp_kitchen,
            temp_bedroom: my.temp_bedroom,
            temp_room: my.temp_room,
            relay_bathroom: my.relay_bathroom,
            relay_kitchen: my.relay_kitchen,
            relay_room: my.relay_room,
            relay_room2: my.relay_room2,
            relay_bedroom: my.relay_bedroom,
        };
        every((7).second(), function() {
            app.tempBroadcast();
        });
      }
    }).start();
});
app.tempBroadcast = function()
{
    // TEMPERATURA
    var B = 3975;
    // Analog SENSORS READING
    var analog_bathroom = app.sensors.temp_bathroom.analogRead();
    var analog_kitchen = app.sensors.temp_kitchen.analogRead();
    var analog_bedroom = app.sensors.temp_bedroom.analogRead();
    var analog_room = app.sensors.temp_room.analogRead();
    // READING CONFIGURATION --------|
    var resistance_bathroom = (1023 - analog_bathroom) * 10000 / analog_bathroom; //get the resistance of the sensor;
    var resistance_kitchen = (1023 - analog_kitchen) * 10000 / analog_kitchen; //get the resistance of the sensor;
    var resistance_bedroom = (1023 - analog_bedroom) * 10000 / analog_bedroom; //get the resistance of the sensor;
    var resistance_room = (1023 - analog_room) * 10000 / analog_room; //get the resistance of the sensor;
    var celsius_temperature_bathroom = 1 / (Math.log(resistance_bathroom / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
    var celsius_temperature_kitchen = 1 / (Math.log(resistance_kitchen / 10000) / B + 1 / 298.15) - 273.15;
    var celsius_temperature_bedroom = 1 / (Math.log(resistance_bedroom / 10000) / B + 1 / 298.15) - 273.15;
    var celsius_temperature_room = 1 / (Math.log(resistance_room / 10000) / B + 1 / 298.15) - 273.15;
    celsius_temperature_room = celsius_temperature_room / 6.5;
    var media = (celsius_temperature_bathroom + celsius_temperature_kitchen + celsius_temperature_bedroom + celsius_temperature_room)/4;
    app.io.broadcast('controlData',{temp_bathroom:celsius_temperature_bathroom,
                                 temp_kitchen:celsius_temperature_kitchen,
                                temp_bedroom:celsius_temperature_bedroom,
                                temp_room:celsius_temperature_room,
                                temp_media:media,
                                limp:bathroom});

};
app.relay_connect_allController = function(){
    if(connection_lamp_all === 0){
        console.log(connection_lamp_all);
        connection_lamp_all = 1;
        app.sensors.relay_kitchen.digitalWrite(0);
        app.sensors.relay_bathroom.digitalWrite(0);
        app.sensors.relay_room.digitalWrite(0);
        app.sensors.relay_room2.digitalWrite(0);
        app.sensors.relay_bedroom.digitalWrite(0);
        bathroom = 1;
        kitchen = 1;
        room = 1;
        room2 = 1;
        bedroom = 1;
        controlAll_lamp = 1;
    }else{
        console.log(connection_lamp_all);
        connection_lamp_all = 0;
        app.sensors.relay_kitchen.digitalWrite(1);
        app.sensors.relay_bathroom.digitalWrite(1);
        app.sensors.relay_room.digitalWrite(1);
        app.sensors.relay_room2.digitalWrite(1);
        app.sensors.relay_bedroom.digitalWrite(1);
        bathroom = 0;
        kitchen = 0;
        room = 0;
        room2 = 0;
        bedroom = 0;
        controlAll_lamp = 0;
    }
}
app.relay_bathroomController = function(){
    console.log(bathroom);
    controlAll_lamp += 1;
    if(bathroom == 0){
        bathroom = 1;
        if(connection_lamp_all === 1){
            app.sensors.relay_bathroom.digitalWrite(0);
        }
        else{
            app.sensors.relay_bathroom.digitalWrite(0);
        }
        statusLamps();
    }
    else{
        bathroom = 0;
        if(connection_lamp_all === 0){ 
            app.sensors.relay_bathroom.digitalWrite(1);
        }
        else{
            app.sensors.relay_bathroom.digitalWrite(1);
        }
        statusLamps();
    }
}

app.relay_kitchenContoller = function(){
         console.log(kitchen);
         if(kitchen == 0){
            kitchen = 1;
              if(connection_lamp_all === 1){
                app.sensors.relay_kitchen.digitalWrite(0);
              }
             else{
                app.sensors.relay_kitchen.digitalWrite(0);
             }
             controlAll_lamp += 1;
             statusLamps();
         }
         else{
            kitchen = 0;
            if(connection_lamp_all === 0){
                app.sensors.relay_kitchen.digitalWrite(1);
            }
             else{
                app.sensors.relay_kitchen.digitalWrite(1);
             }
             controlAll_lamp -= 1;
             statusLamps();
         }
}
app.relay_bedroomContoller = function(){
         console.log(bedroom);
         if(bedroom == 0){
            bedroom = 1;
              if(connection_lamp_all === 1){
                app.sensors.relay_bedroom.digitalWrite(0);
              }
              else{
                app.sensors.relay_bedroom.digitalWrite(0);
              }
             controlAll_lamp += 1;
             statusLamps();
         }
         else{
            bedroom = 0;
            if(connection_lamp_all === 0){
                app.sensors.relay_bedroom.digitalWrite(1);
            }
             else{
                app.sensors.relay_bedroom.digitalWrite(1);
             }
             controlAll_lamp -= 1;
             statusLamps();
         }
}
app.relay_roomController = function(){
         console.log(room);
         if(room == 0){
            room = 1;
            if(connection_lamp_all === 1){ 
                app.sensors.relay_room.digitalWrite(0);
            }
            else{
                app.sensors.relay_room.digitalWrite(0);
            }
             controlAll_lamp += 1;
             statusLamps();
         }
         else{
            room = 0;
            if(connection_lamp_all === 0){
                app.sensors.relay_room.digitalWrite(1);
            }
            else{
                app.sensors.relay_room.digitalWrite(1);
            }
             controlAll_lamp -= 1;
             statusLamps();
         }
}
app.relay_room2Controller = function(){
         console.log(room2);
         if(room2 == 0){
            room2 = 1;
            if(connection_lamp_all === 1){
                app.sensors.relay_room2.digitalWrite(0);
            }
            else{
                app.sensors.relay_room2.digitalWrite(0);
            }
             controlAll_lamp += 1;
             statusLamps();
         }
         else{
            room2 = 0;
            if(connection_lamp_all === 0){
                app.sensors.relay_room2.digitalWrite(1);
            }
            else{
                app.sensors.relay_room2.digitalWrite(1);
            }
             controlAll_lamp -= 1;
             statusLamps();
         }
}
function statusLamps(){
    if(controlAll_lamp == 5){
        connection_lamp_all = 1;
    }else if(controlAll_lamp < 5){
        connection_lamp_all = 0;
    }
}
app.control_curtain = function(){
    ExeStepper.controlmotor();
}


app.listen(5040);
console.log('Im listening on port 5040');