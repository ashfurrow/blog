module CustomHelpers
  def html_title(current_article, current_resource)
    if current_resource
      title = current_resource.metadata[:page]["title"]
      return title + ' - ' + data.site.name unless title.nil?
    elsif current_article
      return (current_article.title + ' - ' + data.site.name)
    end

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

end

class String
  def makeAbsoluteURL!
    if !start_with? "http://"
      replace prepend("http://ashfurrow.com")
    end
  end
end
