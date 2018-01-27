require 'lib/helper_helpers'
require 'haml'

module CustomHelpers
  def html_title
    # If it's an article, generate only this way.
    return "#{current_article.title} - #{data.site.name}" unless current_article.nil?
    # Default to the site name if there is no current resource.
    return data.site.name if current_resource.nil?
    
    url = current_resource.url
    return data.site.name if url == '/'

    page_title = current_resource.metadata[:page][:title]
    return page_title + ' - ' + data.site.name
  end

  def page_description
    # Default to any description in the frontmatter of the resource.
    description = current_resource.metadata[:page][:description]

    # If this is a blog article, we can use its summary.
    if current_article
      # Retrieve the summary through frontmatter, or the generated summary.
      summary = (current_article.metadata[:page][:summary] or current_article.summary)
      # Grab the first two paragraph tags, strip their HTML, and concatentate them.
      description ||= Nokogiri::HTML(summary).xpath('//p').select { |paragraph|
        # Filter out any macros we use internally. See: https://github.com/ashfurrow/blog/issues/306
        !paragraph.to_str.include?('_WIDE') || !paragraph.to_str.include?('YOUTUBE')
      }.collect.first(2).map { |paragraph|
        # Escape any HTML in the paragraph. Add a space betwen then all. We'll strip later.
        "#{paragraph.to_str} "
      }.reduce('', :+).strip
    end

    description || data.site.description
  end

  # Takes raw HTML rendered from post and turns it into something consumable by feeds.
  def prepare_feed_content(body)
    # Expand any relative URLs
    body.gsub!('src="/img/', 'src="https://ashfurrow.com/img/') unless body.nil?

    # Embed any YouTube videos
    require('lib/embed.rb')
    body.embed_items!

    # Remove width modifiers
    require('lib/modify_widths.rb')
    body.replace_width_modifiers_with! ''

    body
  end

  # Divs' Widths

  def standard_width_div(&block)
    "<div class='col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1'>#{yield}</div>"
  end

  def alternate_offset_divs(array, &block)
    divs = ''
    array.each_with_index do |element, index|
      if index % 2 == 0
        divs += "<div class='col-lg-4 col-lg-offset-2 col-md-5 col-md-offset-1 col-sm-6 embedded'>#{yield(element)}</div>"
      else
        divs += "<div class='col-lg-4 col-md-5 col-sm-6 embedded'>#{yield(element)}</div>"
      end
    end
    divs
  end
end
