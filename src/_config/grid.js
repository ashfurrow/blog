// The layout grid of site.css (.normal-width, .wide, .narrow) for code that needs its sizes: 12 columns up to 80rem, and
// a full-width column on phones. The CSS can't import this, so change both together.
export const COLUMNS = 12
export const PHONE = 600 // px: the phone breakpoint (max-width)
export const TABLET = 1200 // px: the tablet breakpoint (max-width)
export const MAX_WIDTH = 1600 // px: 80rem

/** Columns each layout spans: above the tablet breakpoint, then from there down to phones. */
export const SPANS = {
  default: [8, 10],
  wide: [10, 10],
  narrow: [6, 8],
  // Two photos side by side in a wide group.
  grid: [5, 5]
}

/** The width of `columns` of the grid in a window of `windowWidth` px. */
export const columnsWidth = (columns, windowWidth) => Math.round((columns / COLUMNS) * Math.min(windowWidth, MAX_WIDTH))

/** A `sizes` attribute for an image in a layout. Phones get the whole window width. */
export function sizes(layout) {
  if (layout === "bleed") return "100vw"
  const [desktop, tablet] = SPANS[layout]
  const vw = (columns) => `${Math.round((columns / COLUMNS) * 100)}vw`
  return [
    `(min-width: ${MAX_WIDTH}px) ${columnsWidth(desktop, MAX_WIDTH)}px`,
    desktop !== tablet && `(min-width: ${TABLET + 1}px) ${vw(desktop)}`,
    `(min-width: ${PHONE + 1}px) ${vw(tablet)}`,
    "100vw"
  ]
    .filter(Boolean)
    .join(", ")
}
