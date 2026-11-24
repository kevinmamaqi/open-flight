#pragma once

#include <cstdint>

constexpr int D1 = 1;
constexpr int D2 = 2;
constexpr int D3 = 3;
constexpr int LOW = 0;
constexpr int HIGH = 1;
constexpr int INPUT_PULLUP = 2;
constexpr int OUTPUT = 3;

void pinMode(int pin, int mode);
int digitalRead(int pin);
void digitalWrite(int pin, int value);
unsigned long millis();
