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

function showString(text: string) {
    basic.clearScreen()
    basic.showString(text)
}


function RunCheck() {
    

    if (milliliters_to_draw < 0) {
        speed = speed * -1
    }

    if (milliliters_to_draw > total_cup_capcity_ml) {
        basic.clearScreen()

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

//basic.forever(RunCheck)

function RunPump(duration: number, pump_speed: number, debounce: boolean) {
    SuperBitV2.MotorRun(SuperBitV2.enMotors.M1, pump_speed)
    basic.pause(5 * 1000)
    SuperBitV2.MotorStopAll

    showString("O")
}

function DrawMilliliters(ml: number) {
    let time_to_fill = time_to_fill_1ml * ml
    RunPump(time_to_fill, speed, pump_running)

    showString("FINI")
}

basic.forever(function() {
    if (!pump_running && input.buttonIsPressed(Button.A)) {
        showString("P")
        pump_running = true
        DrawMilliliters(milliliters_to_draw)
        pump_running = false
    }
})

input.onButtonPressed(Button.A, function() {
    if (pump_running) {
        showString("db")
    }
})
    