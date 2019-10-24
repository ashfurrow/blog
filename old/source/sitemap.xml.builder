xml.instruct!
xml.urlset 'xmlns' => "http://www.sitemaps.org/schemas/sitemap/0.9", 'xmlns:image' => "http://www.google.com/schemas/sitemap-image/1.1" do
  sitemap.resources.select { |page| 
    page.path =~ /\.html/ && !page.data.noindex == true 
  }.each do |page|
    xml.url do
      xml.loc "https://ashfurrow.com#{page.url}"
      xml.lastmod Date.today.to_time.iso8601
      xml.changefreq page.data.changefreq || "monthly"

      image_url = og_image_or_background(page)

      if image_url
        # URLs for images must be absolute
        image_url.prepend('https://ashfurrow.com') unless image_url.start_with? 'https://'

        xml.tag! 'image:image' do |image|
          image.tag! 'image:loc', image_url
        end
      end

      if page.url == '/'
        xml.priority "1.0"
      else
        xml.priority page.data.priority || "0.5"
      end
    end
  end
end
