require 'lib/helper_helpers'

module OpenGraphHelpers
  def og_title
    # Get a list of titles, in least-to-most preferrable.
    titles = [data.site.name]
    if current_resource
      titles += [current_resource.metadata[:page][:title]]
    end
    if current_article
      titles += [current_article.title]
    end
    titles.compact.last.gsub(/"([^"]+)"/) { "&ldquo;#{$1}&rdquo;" }
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
