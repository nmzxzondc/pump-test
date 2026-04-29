let test_to_get_time_to_fill_cup = false
let test_duration_secs = 10

let pump_running = false
let pump_speed = 255

let milliliters_to_draw = 250

let total_cup_capcity_ml = 798
let time_to_fill_cup = 10
let time_to_fill_1ml = (time_to_fill_cup / total_cup_capcity_ml)

// if pump_speed is greater then 255 or less then -255 it defaults to the closest valid integer
// if you change the pump_speed, record the time it takes to fill the cup up again
/*
error codes: 
ml: the milliliters_to_draw is greater than the cup's total capacity
lib: the SuperBitV2 library was either not found/installed or SuperBitV2.enMotors.M1 was not found
db: the pump function (RunPump) is already running.

normal codes:
O: on, nothing running
T: test to get time running
P: pump running
 */

function showString(text: string) {
    basic.clearScreen()
    basic.showString(text)
}


function RunCheck() {
    if (milliliters_to_draw < 0) {
        pump_speed = pump_speed * -1
    }
    if (milliliters_to_draw > total_cup_capcity_ml) {
        showString("ML")
        basic.pause(10 * 1000)
    }
    if (!SuperBitV2.enMotors.M1) {
        showString("LIB")
        basic.pause(10 * 1000)
    }

    return
}

basic.showString("O")
basic.forever(RunCheck)

function RunPump(duration: number) {
    SuperBitV2.MotorRun(SuperBitV2.enMotors.M1, pump_speed)
    basic.pause(duration)
    SuperBitV2.MotorStopAll

    showString("O")
}

function DrawMilliliters(ml: number) {
    let time_to_fill = time_to_fill_1ml * ml
    RunPump(time_to_fill)

    showString("FINI")
}

/*
basic.forever(function () {
    if (!pump_running && input.buttonIsPressed(Button.A)) { 
        if (!test_to_get_time_to_fill_cup) {
            showString("P")
            pump_running = true
            DrawMilliliters(milliliters_to_draw)
            pump_running = false
        } else {
            showString("T")
            pump_running = true
            RunPump(test_duration_secs * 1000)
            pump_running = false
        }


    }
}) */ // old version

basic.forever(function() {
    if (!input.buttonIsPressed(Button.A)) {
        return
    }

    if (pump_running) {
        showString("db")
        return
    }

    pump_running = true

    if (test_to_get_time_to_fill_cup) {
        showString("T")
        RunPump(test_duration_secs * 1000)
        pump_running = false
        return
    }

    showString("P")
    DrawMilliliters(milliliters_to_draw)

    pump_running = false

}) // cleaned up version
