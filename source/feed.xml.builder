xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  site_url = "https://ashfurrow.com/"
  xml.title "Ash Furrow"
  xml.id URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => site_url
  xml.link "href" => URI.join(site_url, current_page.path), "rel" => "self"
  xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?
  xml.author { xml.name "Ash Furrow" }

  blog.articles[0..5].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => URI.join(site_url, article.url)
      xml.id URI.join(site_url, article.url)
      xml.published article.date.to_time.iso8601
      xml.updated (article.metadata[:page]["updated"] || article.date).to_time.iso8601
      xml.author { xml.name "Ash Furrow" }
      xml.content prepare_feed_content(article.body), "type" => "html"
    end
  end
end
