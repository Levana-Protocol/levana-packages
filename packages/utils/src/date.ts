// All in milliseconds
export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export const dateUtcTime = (date: Date): number => {
  const timezoneOffset = date.getTimezoneOffset() * MINUTE
  return date.getTime() + timezoneOffset
}

export interface TimediffSplitDHMS {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface TimediffSplitHMS {
  hours: number
  minutes: number
  seconds: number
}

export const getTimediffSplitDHMS = (d1: Date, d2: Date): TimediffSplitDHMS => {
  const millisecondsLeft = dateUtcTime(d1) - dateUtcTime(d2)

  return {
    days: Math.floor(millisecondsLeft / DAY),
    hours: Math.floor((millisecondsLeft % DAY) / HOUR),
    minutes: Math.floor((millisecondsLeft % HOUR) / MINUTE),
    seconds: Math.floor((millisecondsLeft % MINUTE) / SECOND),
  }
}

export const getTimediffSplitHMS = (d1: Date, d2: Date): TimediffSplitHMS => {
  const millisecondsLeft = dateUtcTime(d1) - dateUtcTime(d2)

  return {
    hours: Math.floor(millisecondsLeft / HOUR),
    minutes: Math.floor((millisecondsLeft % HOUR) / MINUTE),
    seconds: Math.floor((millisecondsLeft % MINUTE) / SECOND),
  }
}
