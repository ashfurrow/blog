module CustomHelpers
  def html_title
    if current_article
    	(current_article.title + ' - ' + data.site.name) unless current_article.nil?
    end

  	data.site.name
  end
end
