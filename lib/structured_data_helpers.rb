module StructuredDataHelpers
  def structured_data_markup
    puts "Hi!"
    puts "Current Resource: #{current_resource}"
    puts "Current Article: #{current_article}"

    [
      person_structured_data,
      web_site_structured_data,
      article_structured_data
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
    nil
  end
end
