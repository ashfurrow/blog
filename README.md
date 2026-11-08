[![Netlify Status](https://api.netlify.com/api/v1/badges/73ec75b9-958c-4274-a66b-0c74a9a43925/deploy-status)](https://app.netlify.com/sites/ashfurrow-blog/deploys)

# My Blog

My [blog](https://ashfurrow.com/).

## Setup

```sh
git clone https://github.com/ashfurrow/blog.git
cd blog
pnpm install
pnpm start # This will take a few seconds the first time
DEBUG=Eleventy* pnpm start # To output console.log() statements from within 11ty
```

Then navigate to [http://localhost:8080](http://localhost:8080).

## Contributing

Contributions, such as typo corrections or bug reports, are very welcome! Feel free to [open an issue](https://github.com/ashfurrow/blog/issues/new) or make a pull request to the `main` branch. All blog posts are written in Markdown in the [`src/blog/`](https://github.com/ashfurrow/blog/tree/main/src/blog) directory, which gets deployed automatically by Netlify when a pull request is merged. See [Server Setup](#server-setup) below.

## Photo posts

A post is a photo post when its front matter has `layout: layouts/photo.njk`. It lives in `src/blog/` like any other post, so it shows up in the [blog archive](https://ashfurrow.com/blog/) (marked with a small image icon), the feeds, and on the [Photos](https://ashfurrow.com/photos/) page, which lists the photo posts as cards.

```md
---
title: Autumn 2025
date: 2025-12-06
banner: cover.jpg # Also the card on /photos and the social image.
layout: layouts/photo.njk
location: Fredericton, NB, Canada # Optional, shown at the end of the post.
# Optional Markdown, shown at the end of the post:
footnotes: |
  All photos taken on film.
randomBanner: false # Optional: keep this banner out of the random banner on /photos.
---

![](01.jpg#bleed)

## A heading

![Alt text](02.jpg)
![](03.jpg)
![](04.jpg)
```

- Photos are files next to the post's `index.md`, referenced like any image. The site resizes them (600, 1200 and 2000px, JPEG and WebP) next to the post when it builds.
- A paragraph of nothing but images is a photo set. Put the images on consecutive lines, with no blank line between them. The build picks the rows, so photos in a row share a height. A lone photo is a set of one.
- Flags go in the image's URL, like `![](photo.jpg#wide)`:
  - `#wide`: a lone photo at the width of the `.wide` column; in a set, the photo gets a row to itself.
  - `#narrow`: a lone photo at the `.narrow` width.
  - `#bleed`: a lone photo at the full width of the window.
  - Flags work in regular posts too, for a paragraph that is a single image. A paragraph that mixes images with text, or links an image, is left as a normal image.
- Clicking a photo opens it in a lightbox (arrows or the arrow keys to move, Escape to close).
- Embeds work with the `{% tweet "https://x.com/..." %}` and `{% instagram "https://www.instagram.com/p/..." %}` shortcodes.
- The code is in `src/_config/` (`imageflags.js` for the flags, `photoposts.js` for the sets, `photo-rows.js` for the rows, `grid.js` for the image sizes), with the styles in `src/assets/photo.css` and `src/assets/photos.css`.

## License

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

This [work](http://purl.org/dc/dcmitype/Text) by [Ash Furrow](https://ashfurrow.com/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Code I've written is [licensed](/LICENSE) under MIT. Other components such as FontAwesome icons have their own license.

## Thanks

Thanks to the following people and projects:

- [Orta Therox](https://twitter.com/orta) for coding and design help
- [Katarina Batina](https://twitter.com/katarinabatina) for design help
- [Tom Creighton](https://twitter.com/ashfurrow/status/523393606431019008) for design help
- [11ty](https://www.11ty.dev)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/)
- [This colour](http://www.colourlovers.com/color/398CCC/Walton)
- [This colour scheme](http://www.colourlovers.com/palette/869489/Caribbean_Dusk)
- [@CloudyConway](http://twitter.com/CloudyConway)
- [@CrookedCosmos](http://twitter.com/CrookedCosmos)

## Photo Credits

All banner (full-width) images on the site are my own unless they link to an external source. I release my photos under the same [license](/LICENSE) as this blog; the licenses of others' work vary.

I'd like to thank the following contributors.

| Photo                                                                       | Photographer                                                                                                                                                                      |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main banner on [Portfolio](https://ashfurrow.com/portfolio).                | [Andrey Tochilin](https://twitter.com/Tochilin)                                                                                                                                   |
| "Software" banner on [Portfolio](https://ashfurrow.com/portfolio#software). | [Nick Simmons](http://instagram.com/nsimmons206)                                                                                                                                  |
| Education image on [Portfolio](https://ashfurrow.com/portfolio#education)   | [Pete O'Shea](https://www.flickr.com/photos/59668110@N04/5600161625)                                                                                                              |
| Community image on [Portfolio](https://ashfurrow.com/portfolio#community)   | [Paul Hudson](https://twitter.com/twostraws/status/974561090880274433)                                                                                                            |
| Recent blog post header backgrounds                                         | [Cloudy Conway](http://twitter.com/CloudyConway) ([license](https://twitter.com/vex0rian/status/625153928364191744)) and [Crooked Cosmos](http://twitter.com/CrookedCosmos) (CC0) |

## Server Setup

The site is served from [Netlify](https://www.netlify.com). The feeds are served from the `feed.ashfurrow.com` subdomain (aliased to the main domain, except everything that's not a feed URL will 404).

Deploys happen automatically on pushes to the `main` branch. The site can also be deployed locally:

```sh
pnpm deploy
```
