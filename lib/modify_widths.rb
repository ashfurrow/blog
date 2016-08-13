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
module Middleman
  class ModifyWidths < Extension

    AllowedLayouts = [
      "blog_post",
      "_layout_all_standard_width"
    ]

    def initialize(app, options_hash={}, &block)
      super

      app.after_render do |body, path, locs, template|
        # There are multiple rendering calls and we want to get one that renders a permitted template.
        unless AllowedLayouts.map { |l| path.to_s.index l }.compact.empty?
          body.replace_width_modifiers_with_size! 'WIDE', 'col-lg-10 col-lg-offset-1 col-md-12'
          body.replace_width_modifiers_with_size! 'EXTRA_WIDE', 'col-lg-12 col-md-12'
          body.replace_width_modifiers_with_size! 'NARROW', 'col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2'
        end
        
        body
      end
    end
  end
end

::Middleman::Extensions.register(:modify_widths, ::Middleman::ModifyWidths)

class String
  def self.Pattern(block_delineator)
    /<p>BEGIN_#{block_delineator}<\/p>(.*?)<p>END_#{block_delineator}<\/p>/m
  end

  def replace_width_modifiers_with_size!(block_delineator, size)
    replacement = <<-EOS
        </div> <!-- col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 -->
      </div> <!-- row -->

      <div class="row">
        <div class="#{size}">
          \\1
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
      EOS

    replace self.gsub(String.Pattern(block_delineator), replacement)
  end

  def replace_width_modifiers_with!(string)
    replace self.gsub(String.Pattern('NARROW'), '\1')
    replace self.gsub(String.Pattern('WIDE'), '\1')
    replace self.gsub(String.Pattern('EXTRA_WIDE'), '\1')
  end
end
