xml.instruct! :xml, :version => '1.0'
xml.rss :version => "2.0", "xmlns:atom" => "http://www.w3.org/2005/Atom" do

  xml.channel do
    site_url = "http://ashfurrow.com/"

    xml.tag! 'atom:link', :href => "http://ashfurrow.com/feed.xml", :rel => "self", :type => "application/rss+xml" 

    xml.title "Ash Furrow"
    xml.description data.site.description
    xml.link "http://ashfurrow.com/"

    blog.articles[0..5].each do |post|
      xml.item do
        xml.title post.title
        xml.link URI.join(site_url, post.url)
        xml.description post.body
        xml.pubDate Time.parse(post.date.to_time.to_s).rfc822()
        xml.guid URI.join(site_url, post.url)
      end
    end
  end

end


# xml.instruct!
# xml.feed "xmlns" => "http://purl.org/rss/1.0/modules/content/" do
#   site_url = "http://ashfurrow.com/"
#   xml.title "Ash Furrow"
#   xml.id URI.join(site_url, blog.options.prefix.to_s)
#   xml.link "href" => URI.join(site_url, blog.options.prefix.to_s)
#   xml.link "href" => URI.join(site_url, current_page.path), "rel" => "self"
#   xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?
#   xml.author { xml.name "Ash Furrow" }

#   blog.articles[0..5].each do |article|
#     xml.entry do
#       xml.title article.title
#       xml.link "rel" => "alternate", "href" => URI.join(site_url, article.url)
#       xml.id URI.join(site_url, article.url)
#       xml.published article.date.to_time.iso8601
#       xml.updated File.mtime(article.source_file).iso8601
#       xml.author { xml.name "Ash Furrow" }
#       xml.content article.body, "type" => "html"
#     end
#   end
# end
