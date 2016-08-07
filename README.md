[![Build Status](https://travis-ci.org/ashfurrow/blog.svg?branch=master)](https://travis-ci.org/ashfurrow/blog)

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
- [IcoMoon](https://icomoon.io)
- [CloudFlare](http://cloudflare.com)

Photo Credits
-------------

All banner (full-width) images on the site are my own unless they link to an external source. I release my photos under the same [license](/LICENSE) as this blog; the licenses of others' work vary.

I'd like to thank the following contributors.

Photo | Photographer
--- | ---
Main banner on [Portfio](https://ashfurrow.com/portfolio). | [Andrey Tochilin](https://twitter.com/Tochilin)
"Software" banner on [Portfolio](https://ashfurrow.com/portfolio#software). | [Nick Simmons](http://instagram.com/nsimmons206)
Blogging image on [Portfolio](https://ashfurrow.com/portfolio#community) | [Pete O'Shea](https://www.flickr.com/photos/59668110@N04/5600161625)
Several blog post header backgrounds | [Cloudy Conway](http://twitter.com/CloudyConway) ([license](https://twitter.com/vex0rian/status/625153928364191744))

Server Setup
------------

The site is served from S3, but through CloudFlare's CDN. The CDN caches everything on edges. These edges respect the caching header set on individual files. CloudFlare also sets a browser cache expiration of 30 minutes for all content (if a longer one is not specified, see below).

[After deploying](https://github.com/ashfurrow/blog/blob/f84ffd2b623a8aa244d2d252400b0d58ba9179bf/config.rb#L93-L104), new or modified files in the `javascripts`, `css`, `img`, and `fonts` directories have one year cache expirations set. Afterward, Cloudflare's cached content is invalidated. Users are served fresh css and javascript after changes made to those files because middleman [uses hashes for those resources](https://github.com/ashfurrow/blog/blob/f09370070b062b5319cab2852b8c4cc46095358d/config.rb#L59); updated css/javascript will be stored in a differently named file.
