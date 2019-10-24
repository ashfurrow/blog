def absoluteify(url)
  return nil if url.nil?
  if url[0] == '/'
    url.replace "https://ashfurrow.com#{url}"
  end
  url
end

def resource_images
  images = [absoluteify(current_resource.metadata[:page][:og_image])]
  unless current_article.nil?
    doc = Nokogiri::HTML(current_article.body)
    images += doc.xpath("//img").map { |img| absoluteify(img["src"]) }
  end
  images << absoluteify(current_resource.metadata[:page][:background_image])
  images.compact.uniq
end
