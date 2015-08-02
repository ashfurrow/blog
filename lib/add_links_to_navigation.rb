require 'cgi'
require 'middleman-core'
require 'nokogiri'

# Used to add octothorpes to h2 and h3 tags that have id's.

# Credit goes to the CocoaPods team in figuring out how to do this: https://github.com/CocoaPods/guides.cocoapods.org/blob/4913cffd1b1bf0b85cdfc33614cb5b2d6240ff02/lib/add_links_to_navigation.rb

module AddLinksToNavigation
  class << self

    def registered(app, options={})

      app.after_render do |body, path, locs, template_class|
        
        # There are multiple rendering calls and we want to get the one that renders the blog_post template. 
        if (path.to_s.index "blog_post") != nil
                            
          doc = Nokogiri::HTML(body)
          nodes = doc.css(".container h2[id], .container h3[id]")
          
          if nodes.count > 0
            nodes.each do |header|
              if header.attributes["id"]
                id = header.attributes["id"].content.gsub(/[^a-zA-Z-]/, '')
                header.attributes["id"].value = id
                if header.parent['class'] == 'cntl-content'
                  header.inner_html = header.inner_html + "<a class='header-link' href='\##{id}'>\#</a>"
                else 
                  header.inner_html = "<a class='header-link' href='\##{id}'>\#</a>" + header.inner_html
                end
              end
            end

            body = doc.to_s
          end         
        end
        
        body
      end
    end

    alias :included :registered
  end
end

::Middleman::Extensions.register(:add_links_to_navigation) do
  ::AddLinksToNavigation
end
