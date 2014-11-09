module CustomHelpers
  def html_title (current_article, current_resource)
    if current_resource
      title = current_resource.metadata[:page]["title"]
      return title + ' - ' + data.site.name unless title.nil?
    elsif current_article
      return (current_article.title + ' - ' + data.site.name)
    end

    data.site.name
  end

    
  def og_image (current_article, current_resource)
    image = current_resource.metadata[:page]["og_image"]
    image ||= current_resource.metadata[:page]["background_image"]

    if current_article
      doc = Nokogiri::HTML(current_article.body)
      image = doc.xpath("//img").map { |img| img["src"] }.first
    end

    # Default image
    image ||= data.site.dark_image

    if !image.start_with? "http://"
      image.prepend("http://ashfurrow.com")
    end

    image
  end

end
