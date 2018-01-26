module StructuredDataHelpers
  def structured_data_markup
    [
      person_structured_data,
      web_site_structured_data,
      article_structured_data,
      article_breadcrumbs_structured_data,
      index_summary_carousel_structured_data
    ].compact.map(&:to_json)
    .map do |markup|
      (
        <<~EOS
          <script type="application/ld+json">
            #{markup}
          </script>
        EOS
      ).strip
    end
    .join("\n")
  end

  private

  def person_structured_data
    {
      "@context" => "http://schema.org",
      "@type" => "Person",
      "name" => "Ash Furrow",
      "url" => "https://ashfurrow.com",
      "image" => "https://static.ashfurrow.com/ashfurrow_thumbsup_square.jpeg",
      "sameAs" => [ "https://twitter.com/ashfurrow", "https://instagram.com/ashfurrow", "https://github.com/ashfurrow" ]
    }
  end

  def web_site_structured_data
    {
      "@context" => "http://schema.org",
      "@type" => "WebSite",
      "url" => "https://ashfurrow.com",
      "potentialAction" => {
        "@type" => "SearchAction",
        "target" => "https://ashfurrow.com/search?q={search_term_string}",
        "query-input" => "required name=search_term_string"
      }
    }
  end

  def article_structured_data
    return nil unless current_article
    {
      "@context" => "http://schema.org",
      "@type" => "NewsArticle",
      "image" => resource_images,
      "author" => "Ash Furrow",
      "datePublished" => current_article.date.to_s,
      "headLine" => current_article.title,
      "mainEntityOfPage" => {
        "@type" => "WebPage",
        "@id" => absoluteify(current_resource.url)
      },
      "publisher" => {
        "@type" => "Organization", # lol
        "name" => "Ash Furrow",
        "logo" => {
          "@type": "ImageObject",
          "url" => data.site.ash_picture
        }
      }
    }
  end

  def article_breadcrumbs_structured_data
    crumbs = [
      {
        "@id" => "https://ashfurrow.com",
        "name" => "Ash Furrow",
        "image" => data.site.ash_picture
      }
    ]

    if current_article.nil?
      crumbs << {
        "@id" => absoluteify(current_resource.url),
        "name" => current_resource.metadata[:page][:title],
        "image" => resource_images.first
      }
    else
      crumbs += [
        {
          "@id" => "https://ashfurrow.com/blog",
          "name" => "Blog",
          "image" => absoluteify(data.site.dark_image)
        },
        {
          "@id" => absoluteify(current_article.url),
          "name" => current_article.title,
          "image" => resource_images.first
        }
      ]
    end

    item_list = crumbs.map.with_index do |crumb, index|
      {
        "@type" => "ListItem",
        "position" => index + 1,
        "item" => crumb
      }
    end

    {
      "@context" => "http://schema.org",
      "@type" => "BreadcrumbList",
      "itemListElement" => item_list
    }
  end

  def index_summary_carousel_structured_data
    return nil unless current_resource.url == '/'
    recent_post_markups = page_articles.map.with_index do |post, index|
      {
        "@type" => "ListItem",
        "position" => index + 1,
        "url": absoluteify(post.url)
      }
    end
    {
      "@context" => "http://schema.org",
      "@type" => "ItemList",
      "itemListElement" => recent_post_markups
    }
  end

  # Okay so these methods below are, like, EXTRA private.

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
end
