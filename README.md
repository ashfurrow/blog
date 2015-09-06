[![Build Status](https://travis-ci.org/ashfurrow/blog.svg?branch=master)](https://travis-ci.org/ashfurrow/blog)

My Blog
=======

My [blog](http://ashfurrow.com).

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

This [work](http://purl.org/dc/dcmitype/Text) by [Ash Furrow](http://ashfurrow.com/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Code I've written is [licensed](/LICENSE) under MIT; other components such as [Bootstrap](http://getbootstrap.com) or the [original blog theme](http://startbootstrap.com/template-overviews/clean-blog/) have the own licenses.

Credits
-------

Thanks to the following people and projects:

- [Tom Creighton](https://twitter.com/ashfurrow/status/523393606431019008)
- [Middleman](http://middlemanapp.com)
- [Clean Blog Theme](http://startbootstrap.com/template-overviews/clean-blog/)
- [middleman-s3_sync](https://github.com/fredjean/middleman-s3_sync)
- [middleman-cdn](https://github.com/leighmcculloch/middleman-cdn)
- [middleman-syntax](https://github.com/middleman/middleman-syntax)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/)
- [This colour](http://www.colourlovers.com/color/398CCC/Walton)
- [This colour scheme](http://www.colourlovers.com/palette/869489/Caribbean_Dusk)
- [s3cmd](http://s3tools.org/)
- [vertical timeline jquery thingy](http://www.jqueryscript.net/other/Responsive-Vertical-Timeline-With-jQuery-CSS3.html)
- [@CloudyConway](http://twitter.com/CloudyConway)
- [IcoMoon](https://icomoon.io)

Photo Credits
-------------

All banner (full-width) images on the site are my own unless they link to an external source. I release my photos under the same [license](/LICENSE) as this blog; the licenses of others' work vary.

I'd like to highly the following contributors.

Photo | Photographer
--- | ---
Main banner on [Portfio](http://ashfurrow.com/portfolio). | [Andrey Tochilin](https://twitter.com/Tochilin)
"Software" banner on [Portfolio](http://ashfurrow.com/portfolio#software). | [Nick Simmons](http://instagram.com/nsimmons206)
Blogging image on [Portfolio](http://ashfurrow.com/portfolio#community) | [Pete O'Shea](https://www.flickr.com/photos/59668110@N04/5600161625)
Several blog post header backgrounds | [Cloudy Conway](http://twitter.com/CloudyConway) ([license](https://twitter.com/vex0rian/status/625153928364191744))

Server Setup
------------

The site is served from S3, but through CloudFlare's CDN. The CDN caches everything on edges. These edges respect the caching header set on individual files. CloudFlare also sets a cache expiration of 4 hours for all content (if a longer one is not specified).

[After deploying](https://github.com/ashfurrow/blog/blob/f09370070b062b5319cab2852b8c4cc46095358d/config.rb#L89-L106), new or modified files in the `javascripts`, `css`, and `img` directories have one year cache expirations set. Afterward, Cloudflare's cached content is invalidated. Users are served fresh css and javascript after changes made to those files because middleman [uses hashes for those resources](https://github.com/ashfurrow/blog/blob/f09370070b062b5319cab2852b8c4cc46095358d/config.rb#L59); updated css/javascript will be stored in a differently named file.
