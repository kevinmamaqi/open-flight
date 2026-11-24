// Run with clang++ -std=c++11 -Wall -Wextra -Werror -I tests/motor-bench-shim tests/motor-bench.cpp -o /tmp/open-flight-motor-bench
#include <cassert>
#include <cstdint>
#include <limits>

#include "../apps/editor/assets/motor/OF-M0-r1-bench.ino"

namespace {
uint32_t clockMs = 0;
bool pressed = false;
bool levels[4] = {};
}

void pinMode(int, int) {}
int digitalRead(int pin) {
  assert(pin == buttonPin);
  return pressed ? LOW : HIGH;
}
unsigned long millis() { return clockMs; }

void digitalWrite(int pin, int value) {
  assert(pin == drivePin || pin == enablePin);
  levels[pin] = value == HIGH;
  assert(!levels[enablePin] || levels[drivePin]);
}

static void expect(uint32_t time, bool held, bool active) {
  clockMs = time;
  pressed = held;
  loop();
  assert(levels[enablePin] == active);
  assert(levels[drivePin] == active);
}

int main() {
  setup();
  assert(!levels[enablePin] && !levels[drivePin]);
  expect(0, true, false);
  expect(1000, true, false);
  expect(1001, false, false);
  expect(1030, true, false); // Contact bounce before release is stable.
  expect(1031, false, false);
  expect(1061, false, false);
  expect(1062, true, true);
  expect(1100, false, false); // Release stops before the limit.
  expect(1101, true, false);
  expect(1200, false, false);
  expect(1230, false, false);
  expect(1231, true, true);
  expect(1980, true, true);
  expect(1981, true, false); // Held switch cannot rearm itself.
  expect(2100, true, false);

  const auto nearWrap = std::numeric_limits<uint32_t>::max() - 752;
  expect(nearWrap - 31, false, false);
  expect(nearWrap - 1, false, false);
  expect(nearWrap + 10, true, true);
  expect(6, true, true);
  expect(7, true, false); // Elapsed time is correct through millis wrap.
}
