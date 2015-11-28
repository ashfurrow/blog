require 'cgi'
require 'middleman-core'

# Wraps the given HTML in a row/wide col span, and places it outside the usual row/col span.
# Only meant to be used in a blog post.
#
# Usage: surround anything you want wider or narrower with BEGIN_(WIDE|EXTRA_WIDE|NARROW) and END_(WIDE|EXTRA_WIDE|NARROW).
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
      app.after_render do |body, path, locs, template|

        # There are multiple rendering calls and we want to get the one that renders the blog_post template. 
        if (path.to_s.index "blog_post") != nil
          replace_with_size body, "WIDE", 'col-lg-10 col-lg-offset-1 col-md-12'
          replace_with_size body, "EXTRA_WIDE", 'col-lg-12 col-md-12'
          replace_with_size body, "NARROW", 'col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3'
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

def replace_with_size (body, block_delineator, size)
  # Look for matching blocks
  blocks = body.scan(/<p>BEGIN_#{block_delineator}<\/p>(.*?)<p>END_#{block_delineator}<\/p>/m).flatten

  # Enumerate each block, breaking its contents out into their own, specially sized div.
  blocks.each do |section|
    modified = <<-EOS
      </div> <!-- col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 -->
    </div> <!-- row -->

    <div class="row">
      <div class="#{size}">
        #{ section }
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
    EOS
    body.gsub!(section, modified)
  end

  # Remove the block delineators
  body.gsub!(/<p>(BEGIN|END)_#{block_delineator}<\/p>/, '')
end
