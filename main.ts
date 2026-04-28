let pump_running = false
let speed = 255

let milliliters_to_draw = 250

let total_cup_capcity_ml = 798
let time_to_fill_cup = 10
let time_to_fill_1ml = (time_to_fill_cup / total_cup_capcity_ml)

// if you change the speed, record the time it takes to fill the cup up again
/*
error codes: 
ml: the milliliters_to_draw is greater than the cup's total capacity
lib: the SuperBitV2 library was either not found/installed or SuperBitV2.enMotors.M1 was not found
db: the pump function (RunPump) is already running.
 */

function RunCheck() {
    

    if (milliliters_to_draw < 0) {
        speed = speed * -1
    }

    if (milliliters_to_draw > total_cup_capcity_ml) {
        basic.clearScreen()

        basic.showString("ML")
        basic.pause(10 * 1000)
    }

    if (!SuperBitV2.enMotors.M1) {
        basic.clearScreen()
        
        basic.showString("lib")
        basic.pause(10 * 1000)
    }

    return
}

basic.showString("O")

basic.forever(RunCheck)



function RunPump(duration: number, pump_speed: number, debounce: boolean) {
    if (debounce) {
        basic.showString("db")
        return
    }

    pump_running = true
    basic.showString("P")

    SuperBitV2.MotorRun(SuperBitV2.enMotors.M1, pump_speed)
    basic.pause(10 * 1000)
    SuperBitV2.MotorStopAll

    basic.showString("O")
}

function Drawmilliliters(ml: number) {

    if (pump_running) {
        basic.clearScreen()
        basic.showString("A")
        return
    }
    

    let time_to_fill = time_to_fill_1ml * ml
    RunPump(time_to_fill, speed, pump_running)

    basic.clearScreen()
    basic.showString("FINI")
    pump_running = false
}

input.onButtonPressed(Button.A, function () {
    
    
    Drawmilliliters(milliliters_to_draw)

    
})