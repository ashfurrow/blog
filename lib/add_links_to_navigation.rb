require 'cgi'
require 'middleman-core'
require 'nokogiri'

# Used to add octothorpes to h2 and h3 tags that have id's.

# Credit goes to the CocoaPods team in figuring out how to do this: https://github.com/CocoaPods/guides.cocoapods.org/blob/4913cffd1b1bf0b85cdfc33614cb5b2d6240ff02/lib/add_links_to_navigation.rb

module Middleman
  class AddLinksToNavigation < Extension

    def initialize(app, options_hash={}, &block)
      super

      app.after_render do |body, path, locs, template_class|
        # There are multiple rendering calls and we want to only execute this code once.
        if (path.to_s.index "layout.slim") != nil

          doc = Nokogiri::HTML(body)
          nodes = doc.css(".container h2[id], .container h3[id]")

          nodes.each do |header|
            id = header.attributes['id'].content.gsub('\'', '')
            header.attributes['id'].content = id

            if header.parent['class'] == 'timeline-content'
              header.inner_html = "#{header.inner_html} <a class='header-link' href='\##{id}'>\#</a>"
            else
              header.inner_html = "<a class='header-link' href='\##{id}'>\#</a> #{header.inner_html}"
            end
          end

          body = doc.to_s
        end

        body
      end
    end
  end
end

::Middleman::Extensions.register(:add_links_to_navigation, ::Middleman::AddLinksToNavigation)
