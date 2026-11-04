// Pure time helpers shared by the server render and the live client script.

export interface ZonedParts {
  y: number
  m: number
  d: number
  h: number
  min: number
  s: number
}

export function zonedParts(timeZone: string, date: Date): ZonedParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const o: Record<string, string> = {}
  for (const p of formatter.formatToParts(date)) o[p.type] = p.value
  return {
    y: Number(o.year),
    m: Number(o.month),
    d: Number(o.day),
    h: Number(o.hour) % 24,
    min: Number(o.minute),
    s: Number(o.second),
  }
}

/** Hours the given time zone is ahead of UTC at `date` (can be fractional or negative). */
export function offsetHours(timeZone: string, date: Date): number {
  const p = zonedParts(timeZone, date)
  const asUTC = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s)
  const wholeSecond = Math.floor(date.getTime() / 1000) * 1000
  return Math.round((asUTC - wholeSecond) / 60000) / 60
}

export const pad = (n: number) => String(n).padStart(2, "0")

/** Formats a clock hour (may be outside 0–24) as HH:MM. */
export function hm(hours: number): string {
  const h = ((hours % 24) + 24) % 24
  let H = Math.floor(h)
  let M = Math.round((h - H) * 60)
  if (M === 60) {
    H = (H + 1) % 24
    M = 0
  }
  return `${pad(H)}:${pad(M)}`
}

export function clock(timeZone: string, date: Date): string {
  const p = zonedParts(timeZone, date)
  return `${pad(p.h)}:${pad(p.min)}`
}

/** "5 hours", "1 hour", "5 hours 30 minutes". */
export function duration(hours: number): string {
  const h = Math.abs(hours)
  const H = Math.floor(h)
  const M = Math.round((h - H) * 60)
  const hs = H === 1 ? "1 hour" : `${H} hours`
  return M ? `${hs} ${M} minutes` : hs
}

// ---------- Ethiopian calendar ----------

const ETH_MONTHS_EN = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miyazya", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"]
const ETH_MONTHS_AM = ["መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"]

/** Converts a Gregorian date to the Ethiopian calendar via the Julian Day Number. */
export function toEthiopian(y: number, m: number, d: number) {
  const a = Math.floor((14 - m) / 12)
  const yy = y + 4800 - a
  const mm = m + 12 * a - 3
  const jdn =
    d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045
  const r = (jdn - 1723856) % 1461
  const n = (r % 365) + 365 * Math.floor(r / 1460)
  const year = 4 * Math.floor((jdn - 1723856) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460)
  return { year, month: Math.floor(n / 30), day: (n % 30) + 1 }
}

/** Today's date in Addis Ababa on the Ethiopian calendar, in English and Amharic. */
export function ethiopianToday(date: Date) {
  const p = zonedParts("Africa/Addis_Ababa", date)
  const e = toEthiopian(p.y, p.m, p.d)
  return {
    en: `${ETH_MONTHS_EN[e.month]} ${e.day}, ${e.year}`,
    am: `${ETH_MONTHS_AM[e.month]} ${e.day}`,
  }
}

// ---------- Working-day overlap ----------

export type Range = [number, number]

/**
 * Finds when `myDay` (hours in `myZone`) overlaps the visitor's `visitorDay` (hours in `visitorZone`),
 * expressed in the visitor's clock hours.
 */
export function workdayOverlap(myZone: string, myDay: Range, visitorZone: string, visitorDay: Range, date: Date) {
  const diff = offsetHours(myZone, date) - offsetHours(visitorZone, date) // hours my zone is ahead
  const mine: Range = [myDay[0] - diff, myDay[1] - diff]
  let best: Range | null = null
  for (const k of [-24, 0, 24]) {
    const s = Math.max(visitorDay[0], mine[0] + k)
    const e = Math.min(visitorDay[1], mine[1] + k)
    if (e > s && (!best || e - s > best[1] - best[0])) best = [s, e]
  }
  return { diff, mine, best }
}
