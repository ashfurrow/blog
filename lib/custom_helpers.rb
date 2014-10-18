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
end
