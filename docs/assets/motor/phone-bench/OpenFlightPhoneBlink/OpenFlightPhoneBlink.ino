// SPDX-License-Identifier: Apache-2.0
// Open Flight, USB-powered XIAO nRF52840 on-board LED bench
#include <bluefruit.h>
#include "PhoneBlink.h"

#if !defined(ARDUINO_Seeed_XIAO_nRF52840)
#error Select the stock Seeed XIAO nRF52840 board from Seeed nRF52 Boards.
#endif

static BLEService benchService("bf758001-96cb-45cf-a0e8-027b0d0d6130");
static BLECharacteristic command("bf758002-96cb-45cf-a0e8-027b0d0d6130");
static PhoneBlink blink;

static void showIndicator() {
  digitalWrite(LED_RED, blink.on() ? LOW : HIGH);
}

// Bluefruit's BLE task and the Arduino loop share the indicator.
static void writeCommand(uint16_t, BLECharacteristic*, uint8_t* bytes, uint16_t size) {
  taskENTER_CRITICAL();
  blink.write(bytes, size, millis());
  showIndicator();
  taskEXIT_CRITICAL();
}

static void linkEvent(ble_evt_t* event) {
  if (event->header.evt_id != BLE_GAP_EVT_DISCONNECTED) return;
  taskENTER_CRITICAL();
  blink.stop(millis());
  showIndicator();
  taskEXIT_CRITICAL();
}

void setup() {
  digitalWrite(LED_RED, HIGH);
  pinMode(LED_RED, OUTPUT);
  digitalWrite(LED_RED, HIGH);

  Bluefruit.autoConnLed(false);
  if (!Bluefruit.begin(1, 0)) return;
  Bluefruit.setName("OpenFlight LED");
  Bluefruit.setEventCallback(linkEvent);
  if (benchService.begin() != ERROR_NONE) return;
  command.setProperties(CHR_PROPS_WRITE);
  command.setPermission(SECMODE_NO_ACCESS, SECMODE_OPEN);
  command.setFixedLen(1);
  // Run in BLE event order so a write cannot be left queued after disconnect.
  command.setWriteCallback(writeCommand, false);
  if (command.begin() != ERROR_NONE) return;

  Bluefruit.Advertising.addFlags(BLE_GAP_ADV_FLAGS_LE_ONLY_GENERAL_DISC_MODE);
  Bluefruit.Advertising.addService(benchService);
  Bluefruit.ScanResponse.addName();
  Bluefruit.Advertising.restartOnDisconnect(true);
  Bluefruit.Advertising.start(0);
}

void loop() {
  taskENTER_CRITICAL();
  blink.update(millis());
  showIndicator();
  taskEXIT_CRITICAL();
  delay(5);
}
