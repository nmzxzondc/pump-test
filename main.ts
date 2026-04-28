let pump_running = false
let speed = 255

let mililiters_to_draw = 250

let total_cup_capcity_ml = 798
let time_to_fill_cup = 10
let time_to_fill_1ml = (time_to_fill_cup / total_cup_capcity_ml)

// if you change the speed, record the time it takes to fill a cup up again
/*

error codes: 
ml: the mililiters_to_draw is below 0 or greater than the cup's total capacity
lib: the SuperBitV2 library was either not found or SuperBitV2.MotorRun was not found
db: the pump is already running
hi: the pump speed exceeds 255 or is less then -255.
 */

if (!SuperBitV2.enMotors.M1) {
    basic.showString("lib")
    basic.forever(function () {
        basic.pause(5 * 1000)
    })
} else {
    basic.showString("P")
}

function RunPump(duration: number, pumpspeed: number) {
    if (pump_running) {
        basic.showString("db")

        basic.pause(2 * 1000)

        basic.showString("P")
        return
    }

    if (pumpspeed > 255 || pumpspeed < -255) {
        basic.showString("hi")
        return
    }

    pump_running = true

    SuperBitV2.MotorRun(SuperBitV2.enMotors.M1, pumpspeed)
    basic.pause(duration)
    SuperBitV2.MotorStopAll

    pump_running = false
}

function DrawMililiters(ml: number) {
    if (ml < 0 || ml > total_cup_capcity_ml) {
        basic.showString("ml")
        return
    }
    let time_to_fill = time_to_fill_1ml * ml
    RunPump(time_to_fill, speed)
}

input.onButtonPressed(Button.A, function () {
    DrawMililiters(mililiters_to_draw)
})

