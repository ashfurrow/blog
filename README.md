[![Build Status](https://travis-ci.org/ashfurrow/blog.svg?branch=master)](https://travis-ci.org/ashfurrow/blog) [![Netlify Status](https://api.netlify.com/api/v1/badges/73ec75b9-958c-4274-a66b-0c74a9a43925/deploy-status)](https://app.netlify.com/sites/ashfurrow-blog/deploys)

# My Blog

My [blog](https://ashfurrow.com/).

## Setup

```sh
git clone https://github.com/ashfurrow/blog.git
cd blog
yarn install
yarn start # This will take a few minutes the first time
```

Then navigate to [http://localhost:8000](http://localhost:8000).

## Contributing

Contributions, such as typo corrections or bug reports, are very welcome! Feel free to [open an issue](https://github.com/ashfurrow/blog/issues/new) or make a pull request to the `master` branch. All blog posts are written in Markdown in the [`blog/`](https://github.com/ashfurrow/blog/tree/master/blog) directory, which gets deployed automatically by Netlify when a pull request is merged. See [Server Setup](#server-setup) below.

## License

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

This [work](http://purl.org/dc/dcmitype/Text) by [Ash Furrow](https://ashfurrow.com/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Code I've written is [licensed](/LICENSE) under MIT. Other components such as [Gatsby](https://www.gatsbyjs.org) or the [original blog start](https://github.com/mhadaily/gatsby-starter-typescript-power-blog) have their own licenses.

## Thanks

Thanks to the following people and projects:

- [NavBar Tutorial](https://dev.to/nunocpnp/your-very-first-responsive-and-animated-navigation-bar-with-react-and-react-spring-17co)
- [react-timeline](https://react-timeline.com)
- [gatsby-starter-typescript-power-blog](https://github.com/mhadaily/gatsby-starter-typescript-power-blog)
- [Orta Therox](https://twitter.com/orta) for coding and design help
- [Katarina Batina](https://twitter.com/katarinabatina) for design help
- [Tom Creighton](https://twitter.com/ashfurrow/status/523393606431019008) for design help
- [Gatsby](https://www.gatsbyjs.org)
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
| Main banner on [Portfio](https://ashfurrow.com/portfolio).                  | [Andrey Tochilin](https://twitter.com/Tochilin)                                                                                                                                   |
| "Software" banner on [Portfolio](https://ashfurrow.com/portfolio#software). | [Nick Simmons](http://instagram.com/nsimmons206)                                                                                                                                  |
| Education image on [Portfolio](https://ashfurrow.com/portfolio#education)   | [Pete O'Shea](https://www.flickr.com/photos/59668110@N04/5600161625)                                                                                                              |
| Community image on [Portfolio](https://ashfurrow.com/portfolio#community)   | [Paul Hudson](https://twitter.com/twostraws/status/974561090880274433)                                                                                                            |
| Recent blog post header backgrounds                                         | [Cloudy Conway](http://twitter.com/CloudyConway) ([license](https://twitter.com/vex0rian/status/625153928364191744)) and [Crooked Cosmos](http://twitter.com/CrookedCosmos) (CC0) |

## Server Setup

The site is served from [Netlify](https://www.netlify.com). The feeds are served from the `feed.ashfurrow.com` subdomain (aliased to the main domain, except everything that's not a feed URL will 404).
