let pump_running = false
let speed = 255

let mililiters_to_draw = 800

let total_cup_capcity_ml = 798
let time_to_fill_cup = 10
let time_to_fill_1ml = (time_to_fill_cup / total_cup_capcity_ml)

// if you change the speed, record the time it takes to fill a cup up again
/*
error codes: 
ml: the mililiters_to_draw is below 0 or greater than the cup's total capacity
lib: the SuperBitV2 library was either not found/installed or SuperBitV2.enMotors.M1 was not found
db: the pump function (RunPump) is already running.
 */

while (!SuperBitV2.enMotors.M1) {
    basic.showString("lib")
    basic.pause(10 * 1000)
}

while (mililiters_to_draw < 0 || mililiters_to_draw > total_cup_capcity_ml) {
        basic.showString("ML")
        basic.pause(10 * 1000)
}

basic.showString("O")

function RunPump(duration: number, pump_speed: number) {
    if (pump_running) {
        basic.showString("DB")

        basic.pause(2 * 1000)

        basic.showString("P")
        return
    }

    basic.showString("P")

    pump_running = true

    SuperBitV2.MotorRun(SuperBitV2.enMotors.M1, pump_speed)
    basic.pause(duration)
    SuperBitV2.MotorStopAll

    pump_running = false
    basic.showString("")
}

function DrawMililiters(ml: number) {
    let time_to_fill = time_to_fill_1ml * ml
    RunPump(time_to_fill, speed)
}

input.onButtonPressed(Button.A, function () {
    DrawMililiters(mililiters_to_draw)
})