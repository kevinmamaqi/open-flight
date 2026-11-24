// SPDX-License-Identifier: Apache-2.0
#pragma once

#include <stddef.h>
#include <stdint.h>

class PhoneBlink {
 public:
  static constexpr uint32_t pulseMs = 600;
  static constexpr uint32_t restMs = 400;

  bool on() const { return phase == Phase::pulse; }

  void stop(uint32_t now) {
    if (on()) {
      phase = Phase::rest;
      since = now;
    }
  }

  void update(uint32_t now) {
    if (on() && now - since >= pulseMs) {
      stop(now);
    }
    if (phase == Phase::rest && now - since >= restMs) {
      phase = Phase::idle;
    }
  }

  void write(const uint8_t* bytes, size_t size, uint32_t now) {
    update(now);
    if (size != 1) return;
    if (bytes[0] == 0x00) {
      stop(now);
    } else if (bytes[0] == 0x01 && phase == Phase::idle) {
      phase = Phase::pulse;
      since = now;
    }
  }

 private:
  enum class Phase { idle, pulse, rest };
  Phase phase = Phase::idle;
  uint32_t since = 0;
};
