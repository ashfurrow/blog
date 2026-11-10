// Font Awesome icons as inline SVG, made at build time, so pages load no Font Awesome script.
//   {% icon "solid/bars" %}                        an icon
//   {% icon "solid/bars", "hamburger-icon" %}      with more classes
//   {% icon "brands/github", "", true %}           the icon cut out of a circle (the footer's social icons)
//   {% icon "solid/image", "photo-marker", false, "Photo post" %}   with a label for screen readers
import { icon, parse } from "@fortawesome/fontawesome-svg-core"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as brands from "@fortawesome/free-brands-svg-icons"

const sets = { solid, brands }

// "magnifying-glass" -> faMagnifyingGlass
const exportName = (name) => "fa" + name.replace(/(^|-)(\w)/g, (_, __, letter) => letter.toUpperCase())

/**
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  eleventyConfig.addShortcode("icon", (spec, classes = "", circled = false, label = "") => {
    const [set, name] = spec.split("/")
    const definition = sets[set]?.[exportName(name)]
    if (!definition) throw new Error(`No Font Awesome icon "${spec}"`)
    const options = { classes: classes.split(" ").filter(Boolean) }
    if (circled) {
      // The ids are needed by the mask, and must not change between builds.
      Object.assign(options, { transform: parse.transform("shrink-8"), mask: solid.faCircle, maskId: `fa-${name}` })
    }
    if (label) Object.assign(options, { attributes: { role: "img", "aria-hidden": "false", "aria-label": label } })
    return icon(definition, options).html[0]
  })
}
