xml.instruct! :xml, :version => '1.0'
xml.rss :version => "2.0", "xmlns:atom" => "http://www.w3.org/2005/Atom" do

  xml.channel do
    site_url = "http://ashfurrow.com/"

    xml.tag! 'atom:link', :href => "http://ashfurrow.com/feed.rss.xml", :rel => "self", :type => "application/rss+xml"

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
