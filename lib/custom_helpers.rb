module CustomHelpers
  def html_title(current_article, current_resource)
    # If it's an article, generate only this way.
    if current_article
      return "#{current_article.title} - #{data.site.name}"
    end

    # If there is a resource, it is responsible for assigning a title.
    if current_resource
      url = current_resource.url

      # Need to check if it's a numbered page or the homepage.
      if url == '/'
        return data.site.name
      elsif url =~ /\/page\/[0-9]+\//
        page_number = url.split('/')[2]
        return "#{data.site.name} – Blog – Page #{page_number}"
      end

      page_title = current_resource.metadata[:page]["title"]
      return page_title + ' - ' + data.site.name unless page_title.nil?
    end

    # Default to site's name.
    data.site.name
  end

  def og_title(current_article, current_resource)
    if current_resource
      title = current_resource.metadata[:page]["title"]
      return title unless title.nil?
    elsif current_article
      return current_article.title
    end

    data.site.name
  end

  def og_image_or_default(current_article, current_resource)
    image = og_image(current_resource)

    if current_article
      doc = Nokogiri::HTML(current_article.body)
      image ||= doc.xpath("//img").map { |img| img["src"] }.first
    end

    image.makeAbsoluteURL! unless image.nil?

    # Default image
    image ||= data.site.dark_image

    image
  end

  def og_image(current_resource)
    image = current_resource.metadata[:page]["og_image"]
    image ||= current_resource.metadata[:page]["background_image"]

    image.makeAbsoluteURL! unless image.nil?

    image
  end

  def page_description
    # Default to any description in the frontmatter of the resource.
    description = current_resource.metadata[:page]["description"]

    # If this is a blog article, we can use its summary.
    if current_article
      # Retrieve the summary through frontmatter, or the generated summary.
      summary = (current_article.metadata[:page]["summary"] or current_article.summary)
      # Grab the first two paragraph tags, strip their HTML, and concatentate them.
      description ||= Nokogiri::HTML(summary).xpath('//p').collect.first(2).map { |paragraph|
        # Escape any HTML in the paragraph. Add a space betwen then all. We'll strip later.
        "#{paragraph.to_str} "
      }.reduce('', :+).strip
    end

    description or data.site.description
  end

end

class String
  def makeAbsoluteURL!
    if !start_with? "http://"
      replace prepend("http://ashfurrow.com")
    end
  end
end
