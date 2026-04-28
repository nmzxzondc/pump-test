def on_button_pressed_a():
    global button_a_function_running, speed
    if button_a_function_running:
        return
    button_a_function_running = True
    speed = 255
    SuperBitV2.motor_run(SuperBitV2.enMotors.M1, speed)
    basic.pause(5 * 1000)
    SuperBitV2.motor_stop_all
    button_a_function_running = False
input.on_button_pressed(Button.A, on_button_pressed_a)

def DrawMililiters(ml: number):
    pass
button_a_function_running = False
speed = 0
remove_amount = 50
while speed != 0 or speed < 0:
    basic.pause(100)
    if speed - remove_amount < 0:
        speed = 0
        SuperBitV2.motor_stop_all()
    else:
        speed = speed - remove_amount
basic.show_string("P")