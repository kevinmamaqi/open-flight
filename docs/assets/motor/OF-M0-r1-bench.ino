// SPDX-License-Identifier: Apache-2.0
// OF-M0-r1. LED-only bench demonstration for Seeed XIAO nRF52840.
#include <Arduino.h>
#if defined(ARDUINO_ARCH_NRF52)
// The Seeed core uses TinyUSB for its USB serial runtime.
#include <Adafruit_TinyUSB.h>
#endif

constexpr auto buttonPin = D1;
constexpr auto enablePin = D2;
constexpr auto drivePin = D3;
constexpr auto pulseLimit = uint32_t{750};
constexpr auto releaseDebounce = uint32_t{30};

enum class Stage { waitForRelease, ready, on };

Stage stage = Stage::waitForRelease;
bool timingRelease = false;
uint32_t releasedAt = 0;
uint32_t startedAt = 0;

void drive(bool active) {
  if (active) {
    digitalWrite(drivePin, HIGH);
    digitalWrite(enablePin, HIGH);
  } else {
    digitalWrite(enablePin, LOW);
    digitalWrite(drivePin, LOW);
  }
}

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(enablePin, OUTPUT);
  pinMode(drivePin, OUTPUT);
  drive(false);
}

void loop() {
  const uint32_t now = millis();
  const bool held = digitalRead(buttonPin) == LOW;

  switch (stage) {
    case Stage::waitForRelease:
      if (held) {
        timingRelease = false;
      } else if (!timingRelease) {
        releasedAt = now;
        timingRelease = true;
      } else if (now - releasedAt >= releaseDebounce) {
        stage = Stage::ready;
      }
      break;
    case Stage::ready:
      if (held) {
        startedAt = now;
        stage = Stage::on;
        drive(true);
      }
      break;
    case Stage::on:
      if (!held || now - startedAt >= pulseLimit) {
        drive(false);
        stage = Stage::waitForRelease;
        timingRelease = false;
      }
      break;
  }
}
