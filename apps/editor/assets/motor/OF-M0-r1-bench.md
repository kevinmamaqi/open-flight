# OF-M0-r1 · LED-first motor-driver bench

This is an adult tabletop exercise. The LED stands in for the motor and makes the command visible. Use the USB-powered Seeed Studio XIAO nRF52840, a normally open momentary pushbutton, a red LED, and a 1 kΩ resistor. The optional driver exercise uses a TI DRV8837 on a suitable carrier with the required pins exposed, two bypass capacitors and a 10 kΩ pulldown. Leave motors, propellers, batteries and the paper airplane off the bench circuit.

The sketch compiled to ARM ELF and HEX for the stock XIAO nRF52840 with Seeed nRF52 Boards 1.1.13. A host-side test exercises button timing and GPIO outputs. Wiring, reset transients and power behavior still need a record from a real bench. Revision OF-M0-r1 uses Apache 2.0.

## Start with the LED

| From | To |
| --- | --- |
| D1 | One side of the normally open button. Firmware enables the internal pullup. |
| XIAO GND | Other side of the button and LED cathode. |
| D2 | 1 kΩ resistor in series with the red LED anode. |
| USB | XIAO USB-C, with the wiring inspected before connecting. |

Save `OF-M0-r1-bench.ino` inside a folder named `OF-M0-r1-bench`. Install Seeed nRF52 Boards 1.1.13 using Seeed’s instructions and select the XIAO nRF52840 board. Build and upload over USB. Start with the button released. Press it briefly and expect one LED pulse. If held, the sketch stops the pulse at about 750 ms. Hold the button while connecting or resetting and expect the output to stay low until you release it for at least 30 ms and press it again. Opening the switch during a pulse turns the output off on the next loop iteration. Disconnect USB if the output behaves unexpectedly, the board heats up or the supply drops.

[Seeed documentation, Arduino board setup and pinout](https://wiki.seeedstudio.com/XIAO_BLE/)

## Move the LED to the driver output

Disconnect USB first and remove the LED from D2. Use a DRV8837 carrier with separate VM/VCC and exposure of the input/output signals shown below. Cross-check every label against the specific carrier. This table shows the IC pin numbering, which may differ from the carrier header. A bare WSON chip needs its thermal pad grounded and an appropriate board. TI’s evaluation module has an onboard controller and its own external-control setup. Use its guide to isolate the onboard controller before driving any inputs.

| Connection | DRV8837 IC pin | XIAO / load |
| --- | --- | --- |
| VM | 1 | Regulated 3.3 V rail for the LED load only. Bypass to ground with 100 nF ceramic close to IC. |
| OUT1 | 2 | 1 kΩ series resistor, then red LED anode. |
| OUT2 | 3 | Red LED cathode. |
| GND | 4 + thermal pad | Common ground, including XIAO GND. |
| IN2 | 5 | Ground fixes the test direction. |
| IN1 | 6 | D3. |
| nSLEEP | 7 | D2. Add a 10 kΩ pulldown to ground at the input and verify the carrier has no conflicting pullup or hard strap. |
| VCC | 8 | Regulated 3.3 V logic rail. Bypass to ground with 100 nF ceramic close to IC. |

Use the XIAO’s regulated 3V3 pin for this LED circuit only. A multimeter check should show about 3.3 V on VM/VCC. The series resistor caps LED load current below 3.3 mA even if the LED shorts. Verify continuity with power disconnected and never short the two bridge outputs. Repeat the button tests while observing the LED and both driver output pins. Use an oscilloscope or logic analyzer if you have one to capture D2 and D3 at startup, reset and expiry. nSLEEP should return low on stop. Record the transition timing and any transient. An LED can show steady state and visible pulses only. The physical USB disconnect is the bench stop. A stalled firmware loop, brownout and lost communications need their own design and tests before a motor is attached.

[TI DRV8837 datasheet, pin configuration and Table 7-1](https://www.ti.com/lit/ds/symlink/drv8837.pdf) · [TI evaluation board guide](https://www.ti.com/lit/ug/slvu749a/slvu749a.pdf)

## Record what happened

| Case | Expected | Measured pulse / result |
| --- | --- | --- |
| Power up, button released | Off until new press | |
| Power up, button held | Off until release and new press | |
| Release before 750 ms | Off on next firmware loop | |
| Hold past 750 ms | Off until released and pressed again | |
| Reset mid-pulse, button still held | nSLEEP and visible load off on reset, no automatic resume | |
| Unplug USB | Outputs lose power | |

Log the board revision, firmware hash, driver carrier, power source, measured 3V3, instrument, observations and date. Retain startup and reset traces if available.

Before a motor stage, confirm the exact motor’s startup and stall current, independently limit current, size the supply and review the stop architecture. A future adult test would use a secured, guarded fixture and keep the paper aircraft out. The LED check establishes no flight performance.

For the later propeller-free characterization, leave the CSV's measurements blank until observed. Bitcraze 316030060 lists 4.2 V and 1 A rated and leaves startup and stall current unspecified. NFP-D0716-3-3.7 lists 3.7 V, 41 mA at no load and 4,000 mA at stall. TI specifies a 1.8 A maximum drive current for the DRV8837. The carrier’s permitted continuous current and pulse duration depend on its thermal conditions and layout. Document those before enabling a real motor. Verify an independent current limit and stop against the specific motor and driver before a short, unloaded pulse. Use a securely restrained bare motor with a guard over the empty shaft, a current-limited bench supply and a physical cutoff. A current limit that trips, a shaft that fails to turn or unknown heat behavior leaves the test incomplete. Record actual supply voltage, peak and running current, pulse duration, temperature, and stop latency. Determine warm behavior independently and avoid a forced stall.

[Propeller-free characterization CSV](OF-M0-r1-characterization.csv) · [Bitcraze 316030060](https://www.bitcraze.io/documentation/hardware/motor_7mm/motor_7mm-datasheet.pdf) · [NFP-D0716 variants](https://nfpmotor.com/products/xz-coreless-dc-motor/7mm-dc-motor-16mm-type-driving-motor-model-nfp-d0716.html)
