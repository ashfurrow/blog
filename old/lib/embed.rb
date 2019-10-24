require 'cgi'
require 'middleman-core'

# Easy, consistent embeds of Youtube videos. Use:
#
# YOUTUBE videoID
#
# For example, the following used in markdown:
#
# YOUTUBE aLvJ1mqlM98
#
# Will be replaced with
#
# <div class="embed-responsive embed-responsive-16by9"><iframe src="//www.youtube.com/embed/aLvJ1mqlM98" frameborder="0" allowfullscreen></iframe></div>
#
# Sweet.
module Middleman
  class Embed < Extension

    def initialize(app, options_hash={}, &block)
      super

      app.after_render do |body, path, locs, template|
        # There are multiple rendering calls and we want to get the one that renders the blog_post template. 
        if (path.to_s.index "blog_post") != nil
          body.embed_items!
        end
        
        body
      end
    end
  end
end

::Middleman::Extensions.register(:embed, ::Middleman::Embed)

class String
  def embed_items!
    embed_youtube!("YOUTUBE43", "embed-responsive-4by3")
    embed_youtube!("YOUTUBE", "embed-responsive-16by9")
  end

  def embed_youtube!(match, css_class)
    embed = "<div class='embed-responsive #{css_class}'><iframe src='//www.youtube.com/embed/\\1' frameborder='0' allowfullscreen></iframe></div>"
    replace self.gsub(/<p>#{match} ([^#\&\?<]+)<\/p>/, embed)
  end
end
