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
module Embed
  class << self

    def registered(app, options={})
      app.after_render do |body, path, locs, template|

        # There are multiple rendering calls and we want to get the one that renders the blog_post template. 
        if (path.to_s.index "blog_post") != nil
          body.embed_youtube!
        end
        
        body
      end
    end

    alias :included :registered
  end
end

::Middleman::Extensions.register(:embed) do
  ::Embed
end

class String
  def embed_youtube!
    embed = '<div class="embed-responsive embed-responsive-16by9"><iframe src="//www.youtube.com/embed/\1" frameborder="0" allowfullscreen></iframe></div>'
    replace self.gsub(/<p>YOUTUBE ([^#\&\?<]+)<\/p>/, embed)
  end
end
