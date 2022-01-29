const five = require("johnny-five")
const board = new five.Board()
const firmata = require("firmata")
const newfirmata = new firmata
board.on("ready", () => {
   
    const gps = new five.GPS({pins: {rx: 11, tx: 10}})
    const servo1 = new five.Servo({pin: 10, center: true})
    const servo2 = new five.Servo({pin: 11, center: true})
    const servo3 = new five.Servo({pin: 12, center: true})
    const servo4 = new five.Servo({pin: 13, center: true})
    newfirmata.serialConfig({
        portId: SW_SERIAL0,
        baud: 9600,
        rxPin: 4,
        txPin: 7
    });

    gps.on("change", (position) => {
        const {altitude, latitude, longitude} = position;
        newfirmata.serialWrite(newfirmata.SERIAL_PORT_IDs.SW_SERIAL1,Buffer.from(JSON.stringify({ "latitude": latitude, "longitude": longitude, "altitude": altitude })))
    });
    gps.on("navigation", (velocity) => {
        const {course, speed} = velocity;
        newfirmata.serialWrite(newfirmata.SERIAL_PORT_IDs.SW_SERIAL1,Buffer.from(JSON.stringify({ "course": course, "speed": speed })))
    });
    
    newfirmata.serialRead(newfirmata.SERIAL_PORT_IDs.SW_SERIAL0,0,(data) => {
        if(new Buffer(data).toString().startsWith("1:")){
            let Kdata = new Buffer(data).replace(":1", "").toString().split("").toString().replace(/1/g, "").replace(/:/g, "").replace(/,/g, "")
            servo1.to(Kdata)
        }
        if(new Buffer(data).toString().startsWith("2:")){
            let Kdata = new Buffer(data).replace(":2", "").toString().split("").toString().replace(/1/g, "").replace(/:/g, "").replace(/,/g, "")
            servo2.to(Kdata)
        }
        if(new Buffer(data).toString().startsWith("3:")){
            let Kdata = new Buffer(data).replace(":3", "").toString().split("").toString().replace(/1/g, "").replace(/:/g, "").replace(/,/g, "")
            servo3.to(Kdata)
        }
        if(new Buffer(data).toString().startsWith("4:")){
            let Kdata = new Buffer(data).replace(":4", "").toString().split("").toString().replace(/1/g, "").replace(/:/g, "").replace(/,/g, "")
            servo4.to(Kdata)
        }
    })

})
