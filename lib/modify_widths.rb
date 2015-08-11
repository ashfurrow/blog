require 'cgi'
require 'middleman-core'
require 'nokogiri'

# Wraps the given HTML in a row/wide col span, and places it outside the usual row/col span.
# Only meant to be used in a blog post.
#
# Usage: surround anything you want wider or narrower with BEGIN_(WIDE|NARROW) and END_(WIDE|NARROW).
# Example:
#
# BEGIN_WIDE
#
# ![](/awesome/pic.jpg)
#
# END_WIDE
#
# This is a simple regex-based text replacement that happens at the end of the rendering pipeline.
module ModifyWidths
  class << self

    def registered(app, options={})

      app.after_render do |body, path, locs, template_class|

        wide_sizeclass = 'col-lg-10 col-lg-offset-1 col-md-12'
        extra_wide_sizeclass = 'col-lg-12 col-md-12'
        narrow_sizeclass = 'col-lg-6 col-lg-offset-3 col-md-12'

        def make (sizeclass, contents)
          <<-EOS
            </div>
          </div>

          <div class="row">
            <div class="#{sizeclass}">
              #{ contents }
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          EOS
        end
        
        # There are multiple rendering calls and we want to get the one that renders the blog_post template. 
        if (path.to_s.index "blog_post") != nil

          wides = body.scan(/<p>BEGIN_WIDE<\/p>(.*?)<p>END_WIDE<\/p>/m).flatten

          wides.each do |section|
            body.gsub!(section, make(wide_sizeclass, section))
          end

          body.gsub!(/<p>(BEGIN|END)_WIDE<\/p>/, '')





          extra_wides = body.scan(/<p>BEGIN_EXTRA_WIDE<\/p>(.*?)<p>END_EXTRA_WIDE<\/p>/m).flatten

          extra_wides.each do |section|
            body.gsub!(section, make(extra_wide_sizeclass, section))
          end

          body.gsub!(/<p>(BEGIN|END)_EXTRA_WIDE<\/p>/, '')




          narrows = body.scan(/<p>BEGIN_NARROW<\/p>(.*?)<p>END_NARROW<\/p>/m).flatten

          narrows.each do |section|
            body.gsub!(section, modified = make(narrow_sizeclass, section))
          end

          body.gsub!(/<p>(BEGIN|END)_NARROW<\/p>/, '')

        end
        
        body
      end
    end

    alias :included :registered
  end

end

::Middleman::Extensions.register(:modify_widths) do
  ::ModifyWidths
end
