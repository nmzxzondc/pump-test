let test_to_get_time_to_fill_cup = false
let test_duration_secs = 10

let pump_running = false
let pump_speed = 255

let milliliters_to_draw = -250

let total_cup_capcity_ml = 798
let time_to_fill_cup = 10
let time_to_fill_1ml = (time_to_fill_cup / total_cup_capcity_ml)

// if pump_speed is greater then 255 or less then -255 it defaults to the closest valid integer
// if you change the pump_speed, record the time it takes to fill the cup up again
/*
error codes: 
ml: the milliliters_to_draw is greater than the cup's total capacity
lib: the SuperBitV2 library was either not found/installed or SuperBitV2.enMotors.M1 was not found
sm: the inputted total cup capacity is lower than 400; 400 being the average solo cup capacity

normal codes:
O: on, nothing running
T: test to get time running
P: pump started/is running
FINI: pump finished running
 */

function showString(text: string) {
    basic.clearScreen()
    basic.showString(text)
}


function RunCheck() {

    if (milliliters_to_draw > total_cup_capcity_ml) {
        showString("ML")
    }
    if (!SuperBitV2.enMotors.M1) {
        showString("LIB")
    }
    if (total_cup_capcity_ml < 400) {
        showString("SM")
    }
    
    if (milliliters_to_draw < 0) {
        pump_speed *= -1
        milliliters_to_draw *= -1
    }

    basic.pause(10 * 1000)
}

showString("O")
basic.forever(RunCheck)

function RunPump(duration: number) {
    SuperBitV2.MotorRun(SuperBitV2.enMotors.M1, pump_speed)
    basic.pause(duration)
    SuperBitV2.MotorStopAll()

    showString("FINI")
    showString("O")
}

function DrawMilliliters(ml: number) {
    let time_to_fill = time_to_fill_1ml * ml
    RunPump(time_to_fill)
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

basic.forever(function () {
    if (!input.buttonIsPressed(Button.A)) {
        return
    }

    if (pump_running) {
        return
    }

    pump_running = true
    if (test_to_get_time_to_fill_cup) {
        showString("T")
        RunPump(test_duration_secs * 1000)
    } else {
        showString("P")
        DrawMilliliters(milliliters_to_draw)
    }
    pump_running = false

})