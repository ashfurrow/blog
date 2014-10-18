My Blog
================

Work-in-progress for porting my [blog](http://ashfurrow.com) to [middleman](http://middlemanapp.com).

Intructions
----------------

```shell
git clone https://github.com/AshFurrow/blog.git
cd blog
bundle install
bundle exec middleman
```

Then navigate to [http://0.0.0.0:4567](http://0.0.0.0:4567).

Credits
----------------

Thanks to the following people and projects:

- [Tom Creighton](https://twitter.com/ashfurrow/status/523393606431019008)
- [Middleman](http://middlemanapp.com)
- [Clean Blog Theme](http://startbootstrap.com/template-overviews/clean-blog/)
- [middleman-sync](https://github.com/karlfreeman/middleman-sync)
- [middleman-syntax](https://github.com/middleman/middleman-syntax)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/)
- [This colour](http://www.colourlovers.com/color/398CCC/Walton)

You'll need your key/secret defined as environment variables "SITE_AWS_KEY" and "SITE_AWS_SECRET" to deploy. Also change your bucket settings in `config.rb`.
