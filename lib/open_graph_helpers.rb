require 'lib/helper_helpers'

module OpenGraphHelpers
  def og_title
    if current_resource
      title = current_resource.metadata[:page][:title]
      return title unless title.nil?
    elsif current_article
      return current_article.title
    end

    data.site.name
  end

  def og_image_or_default
    image = resource_images.first || data.site.dark_image
    absoluteify(image)    
  end

  def og_image_or_background(current_resource)
    image = current_resource.metadata[:page][:og_image]
    image ||= current_resource.metadata[:page][:background_image]
    absoluteify(image)
  end

  def twitter_card_type
    return 'summary_large_image' if current_resource.metadata[:page][:og_image]
    'summary'
  end
end
