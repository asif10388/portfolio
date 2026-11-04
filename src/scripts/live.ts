import { SITE } from "@/data/site"
import { clock, duration, ethiopianToday, hm, workdayOverlap, type Range } from "@/lib/time"

const VISITOR_DAY: Range = [9, 18]

function setSegment(node: HTMLElement, start: number, end: number) {
  const s = Math.max(0, start)
  const e = Math.min(24, end)

  if (e <= s) {
    node.hidden = true
    return
  }
  node.hidden = false
  node.style.left = `${(s / 24) * 100}%`
  node.style.width = `${((e - s) / 24) * 100}%`
}

/** Draws a range on a 24-hour track, wrapping past midnight into a second segment. */
function drawRange(track: HTMLElement, range: Range | null) {
  const [main, wrap] = track.querySelectorAll<HTMLElement>("[data-seg]")

  if (!main || !wrap) return
  if (!range) {
    main.hidden = true
    wrap.hidden = true
    return
  }

  const start = ((range[0] % 24) + 24) % 24
  const end = start + (range[1] - range[0])
  setSegment(main, start, end)
  setSegment(wrap, 0, end - 24)
}

function updateOverlap(now: Date) {
  const text = document.querySelector<HTMLElement>("[data-overlap]")
  if (!text) return

  let visitorZone = "UTC"
  try {
    visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  } catch {
    /* keep UTC */
  }
  const { diff, mine, best } = workdayOverlap(SITE.homeZone, SITE.workingHours, visitorZone, VISITOR_DAY, now)
  const place = visitorZone.split("/").pop()!.replace(/_/g, " ")

  if (Math.abs(diff) < 0.01) {
    text.textContent = `You're on ${SITE.homeCity} time too, so any part of my working day works for you.`
  } else {
    const relation = diff > 0 ? "behind" : "ahead of"
    const window = best
      ? `Our working days overlap from ${hm(best[0])} to ${hm(best[1])} your time. That's the best window for a call.`
      : "Our working days barely meet, so I'll take an early or late call on my side."
    text.textContent = `You're on ${place} time, ${duration(diff)} ${relation} ${SITE.homeCity}. ${window}`
  }

  const lanes = document.querySelectorAll<HTMLElement>("[data-lane]")
  for (const lane of lanes) {
    const which = lane.dataset.lane
    drawRange(lane, which === "you" ? VISITOR_DAY : which === "me" ? mine : best)
  }
}

function tick() {
  const now = new Date()

  for (const el of document.querySelectorAll<HTMLElement>("[data-clock]")) {
    el.textContent = clock(el.dataset.clock!, now)
  }

  const eth = ethiopianToday(now)
  for (const el of document.querySelectorAll<HTMLElement>("[data-eth]")) el.textContent = eth.en
  for (const el of document.querySelectorAll<HTMLElement>("[data-eth-am]")) el.textContent = eth.am

  updateOverlap(now)
}

let timer: ReturnType<typeof setInterval> | undefined

document.addEventListener("astro:page-load", () => {
  tick()
  clearInterval(timer)
  timer = setInterval(tick, 20_000)
})
