[![Build Status](https://travis-ci.org/ashfurrow/blog.svg?branch=master)](https://travis-ci.org/ashfurrow/blog) [![Netlify Status](https://api.netlify.com/api/v1/badges/73ec75b9-958c-4274-a66b-0c74a9a43925/deploy-status)](https://app.netlify.com/sites/ashfurrow-blog/deploys)

My Blog
=======

My [blog](https://ashfurrow.com/).

Setup
-----

```shell
git clone https://github.com/ashfurrow/blog.git 
cd blog
bundle install
rake
```

Then navigate to [http://0.0.0.0:4567](http://0.0.0.0:4567).

Contributing
------------

Contributions, such as typo corrections or bug reports, are very welcome! Feel free to [open an issue](https://github.com/ashfurrow/blog/issues/new) or make a pull request to the `master` branch. All blog posts are written in Markdown in the [`source/blog/`](https://github.com/ashfurrow/blog/tree/master/source/blog) directory, which gets deployed automatically by [Travis CI](https://travis-ci.org/ashfurrow/blog) when a pull request is merged. See [Server Setup](#server-setup) below.

License
-------

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

This [work](http://purl.org/dc/dcmitype/Text) by [Ash Furrow](https://ashfurrow.com/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Code I've written is [licensed](/LICENSE) under MIT. Other components such as [Bootstrap](http://getbootstrap.com) or the [original blog theme](http://startbootstrap.com/template-overviews/clean-blog/) have their own licenses.

Thanks
------

Thanks to the following people and projects:

- [Orta Therox](https://twitter.com/orta)
- [Katarina Batina](https://twitter.com/katarinabatina)
- [Tom Creighton](https://twitter.com/ashfurrow/status/523393606431019008)
- [Middleman](http://middlemanapp.com)
- [Clean Blog Theme](http://startbootstrap.com/template-overviews/clean-blog/)
- [middleman-gh-pages](https://github.com/edgecase/middleman-gh-pages)
- [middleman-syntax](https://github.com/middleman/middleman-syntax)
- [middleman-inliner](https://github.com/kaiinui/middleman-inliner)
- [middleman-search](https://github.com/manastech/middleman-search)
- [loadCSS](https://github.com/filamentgroup/loadCSS)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/)
- [This colour](http://www.colourlovers.com/color/398CCC/Walton)
- [This colour scheme](http://www.colourlovers.com/palette/869489/Caribbean_Dusk)
- [Tutorial on static site search](http://frontendcollisionblog.com/javascript/jekyll/tutorial/2015/03/26/getting-started-with-a-search-engine-for-your-site-no-server-required.html)
- [s3cmd](http://s3tools.org/)
- [vertical timeline jquery thingy](http://www.jqueryscript.net/other/Responsive-Vertical-Timeline-With-jQuery-CSS3.html)
- [@CloudyConway](http://twitter.com/CloudyConway)
- [@CrookedCosmos](http://twitter.com/CrookedCosmos)
- [IcoMoon](https://icomoon.io)

Photo Credits
-------------

All banner (full-width) images on the site are my own unless they link to an external source. I release my photos under the same [license](/LICENSE) as this blog; the licenses of others' work vary.

I'd like to thank the following contributors.

Photo | Photographer
--- | ---
Main banner on [Portfio](https://ashfurrow.com/portfolio). | [Andrey Tochilin](https://twitter.com/Tochilin)
"Software" banner on [Portfolio](https://ashfurrow.com/portfolio#software). | [Nick Simmons](http://instagram.com/nsimmons206)
Education image on [Portfolio](https://ashfurrow.com/portfolio#education) | [Pete O'Shea](https://www.flickr.com/photos/59668110@N04/5600161625)
Community image on [Portfolio](https://ashfurrow.com/portfolio#community) | [Paul Hudson](https://twitter.com/twostraws/status/974561090880274433)
Recent blog post header backgrounds | [Cloudy Conway](http://twitter.com/CloudyConway) ([license](https://twitter.com/vex0rian/status/625153928364191744)) and [Crooked Cosmos](http://twitter.com/CrookedCosmos) (CC0)

Server Setup
------------

The site is served from [Netlify](https://www.netlify.com). The feeds are served from the feed.ashfurrow.com subdomain (aliased to the main domain, except everything that's not a feed URL will 404).

Search
------

Search is done using [lunrjs](http://lunrjs.com) through the [middleman-search plugin](https://github.com/manastech/middleman-search). In summary:

- [Activation and configuration](https://github.com/ashfurrow/blog/blob/88eeda09a6010c014dd02f8d05b63eb8cc7da07a/config.rb#L33-L48).
- [Inclusion in `all.js` sprockets file](https://github.com/ashfurrow/blog/blob/88eeda09a6010c014dd02f8d05b63eb8cc7da07a/source/javascripts/all.js#L3).
- [jQuery to connect the search box to lunrjs](https://github.com/ashfurrow/blog/blob/88eeda09a6010c014dd02f8d05b63eb8cc7da07a/source/javascripts/_site.js#L64-L127).
- [Set up for search box and results](https://github.com/ashfurrow/blog/blob/88eeda09a6010c014dd02f8d05b63eb8cc7da07a/source/search.haml#L11-L22).

Or check out [this blog post](https://ashfurrow.com/blog/static-site-search-with-middleman-and-lunrjs/).
