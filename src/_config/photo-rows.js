// Which photos share a row. The original site decides this in the browser, and the answer depends on the window; here
// it is decided once at build time for two reference windows and written into the HTML (see imageflags.js and
// photo.css). The widths are those of the blog's `.wide` column: 10 of 12 columns at a 1440px window, and the full
// width less the .normal-width margins (0.5rem each side) on a 390px phone.
//
// The rule, as observed on the original site:
//  - The number of rows is how many rows the photos would fill at a target height: the sum of each photo's
//    width-at-that-height, divided by the row width, rounded (at least 1, at most one per photo). The target height is the
//    window height divided by 2.618 (divided by 4.8 on phones), at most 500px.
//  - Photos without #wide are split into that many consecutive rows with an even number of photos each (3 photos in 2
//    rows is 2 + 1); the rows are not packed by width.
//  - A #wide photo is a row of its own, and the photos between fills form their own rows. If that makes fewer rows than
//    the budget, the longest such runs, starting from the last, are split in two (a run longer than 5 absorbs the whole
//    remainder instead).
// Every row then takes the full width with all its photos at one height (flex-grow by aspect ratio, in the CSS).

export const WINDOWS = {
  // width of the photo grid, window height, divisor for the target row height
  desktop: { width: 1200, height: 900, divisor: 1.618 ** 2 },
  phone: { width: 372, height: 844, divisor: 4.8 }
}

// Splits `items` into `count` consecutive chunks, bigger chunks first (7 in 3 -> 3, 2, 2).
function evenSplit(items, count) {
  count = Math.max(1, Math.min(items.length, Math.round(count) || 1))
  const rows = []
  for (let i = 0; i < items.length;) {
    const take = Math.ceil((items.length - i) / count--)
    rows.push(items.slice(i, i + take))
    i += take
  }
  return rows
}

// The runs a #wide photo cuts the photos into: each fill photo alone, and the photos between fills together.
function runs(photos) {
  const out = []
  for (let i = 0; i < photos.length;) {
    const first = photos[i].fill ? 1 : photos.slice(i).findIndex((p) => p.fill)
    const take = photos[i].fill ? 1 : first === -1 ? photos.length - i : first
    out.push(photos.slice(i, i + take))
    i += take
  }
  return out
}

function splitRun(rows, index, count = 2) {
  count = count > 2 ? count : 2
  return [...rows.slice(0, index), ...evenSplit(rows[index], count), ...rows.slice(index + 1)]
}

function partition(photos, count) {
  if (!photos.some((p) => p.fill)) return evenSplit(photos, count)
  let rows = runs(photos)
  if (rows.length === 1) return evenSplit(photos, count)
  if (rows.every((row) => row.length === 1)) return rows
  const long = rows.findIndex((row) => row.length > 5)
  if (long >= 0) return splitRun(rows, long, count - rows.length + 1)
  if (rows.length >= count) return rows
  let missing = count - rows.length
  const multi = rows.flatMap((row, i) => (row.length > 1 ? [i] : [])).sort((a, b) => b - a)
  if (multi.length === 1) return splitRun(rows, multi[0], missing + 1)
  for (const i of multi) if (missing-- > 0) rows = splitRun(rows, i)
  return rows
}

/**
 * @param {{ ratio: number, fill: boolean }[]} photos  two or more photos in one group
 * @param {"desktop" | "phone"} window
 * @returns {number[][]} rows of indexes into `photos`
 */
export function rowsFor(photos, window) {
  const { width, height, divisor } = WINDOWS[window]
  const target = Math.min(500, Math.round(height / divisor))
  const total = photos.reduce((sum, p) => sum + p.ratio * target, 0)
  const count = Math.max(1, Math.min(photos.length, Math.round(total / width)))
  const indexed = photos.map((p, index) => ({ ...p, index }))
  return partition(indexed, count).map((row) => row.map((p) => p.index))
}
