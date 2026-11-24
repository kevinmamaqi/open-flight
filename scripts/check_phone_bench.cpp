// SPDX-License-Identifier: Apache-2.0
#include <cassert>
#include <iostream>

#include "../apps/editor/assets/motor/phone-bench/OpenFlightPhoneBlink/PhoneBlink.h"

int main() {
  const uint8_t start = 0x01;
  const uint8_t cancel = 0x00;
  const uint8_t invalid = 0x02;
  const uint8_t malformed[] = {0x01, 0x01};
  PhoneBlink blink;

  assert(!blink.on());
  blink.write(nullptr, 0, 1);
  blink.write(&invalid, 1, 2);
  blink.write(malformed, sizeof(malformed), 3);
  assert(!blink.on());

  blink.write(&start, 1, 10);
  assert(blink.on());
  blink.write(&start, 1, 609);
  assert(blink.on());
  blink.update(610);
  assert(!blink.on());
  blink.write(&start, 1, 1009);
  assert(!blink.on());
  blink.write(&start, 1, 1010);
  assert(blink.on());

  blink.stop(1020);  // BLE link-down calls this same method.
  assert(!blink.on());
  blink.write(&start, 1, 1030);
  assert(!blink.on());
  blink.update(1430);  // No queued start survives disconnect and rest.
  assert(!blink.on());
  blink.write(&start, 1, 1440);
  assert(blink.on());
  blink.write(&cancel, 1, 1450);
  assert(!blink.on());
  blink.write(&cancel, 1, 1700);
  blink.write(&start, 1, 1850);
  assert(blink.on());  // Repeated cancel leaves the existing rest deadline alone.

  PhoneBlink wrap;
  const uint32_t nearWrap = UINT32_MAX - 300;
  wrap.write(&start, 1, nearWrap);
  wrap.update(nearWrap + 599);
  assert(wrap.on());
  wrap.update(nearWrap + 600);
  assert(!wrap.on());
  wrap.write(&start, 1, nearWrap + 1000);
  assert(wrap.on());

  std::cout << "PASS: pulse timing, duplicate and malformed writes, disconnect, cancel, and clock rollover\n";
}
