module Speaking

  public

  # This is an example of a "full" talk instance.
  # <li>
  #   <div class="image-container">
  #     <img src="/img/portfolio/blogging.jpg" />
  #     <a><i class='fa fa-file'></i></a>
  #   </div>
  #   <div class="details">
  #     <h3>Teaching &amp; Learning</h3>
  #     <p><a><i class='fa fa-quote-left'></i>MBLTDev</a></p>
  #     <p><a><i class='fa fa-calendar'></i>May 16, 2014</a></p>
  #     <p><a><i class='fa fa-map-marker'></i>Moscow, Russia</a></p>
  #     <p><a><i class='fa fa-code'></i>Sample Code</a></p>
  #     <p><a><i class='fa fa-youtube-play'></i>Video Recording</a></p>
  #   </div>
  # </li>

  def self.talk_to_html(type, talk)
    missing_image_source = 'missing_image.png'

    talk_name = talk["name"]
    conference = talk["conference"]
    conference_url = talk["url"]
    location = talk["location"]
    dates = talk["dates"]
    slides = talk["slides"]
    video = talk["video"]
    code = talk["code"]
    image_source = talk["image"]
    image_source ||= missing_image_source

    html = "<li>"

    # Image
    html += "<div class='image-container'>"
    img_tag = "<img src='/img/speaking/talks/#{image_source}' />"

    # Kind of complex. Future talks' images always link to the conference.
    # Past talks link to the slides, if they're available.
    if type == :future
      html += "<a href='#{conference_url}'>#{img_tag}</a>"
    elsif type == :past
      if slides
        html += "<a href='#{slides}'>#{img_tag}</a>"
        if image_source != missing_image_source
          html += "<a href='#{slides}' class='mouseover-link'><i class='fa fa-file'></i></a>"
        end
      else
        html += img_tag
      end
    end

    html += "</div>"

    # Details
    html += "<div class='details'>"
    if type == :future
      if conference_url
        html += "<h3><a href='#{conference_url}'>#{conference}</a></h3>"
      else
        html += "<h3>#{conference}</h3>"
      end
    elsif type == :past
      html += "<h3>#{talk_name}</h3>"
      if conference_url
        html += "<p><a href='#{conference_url}'><i class='fa fa-quote-left'></i>#{conference}</a></p>"
      else
        html += "<p><i class='fa fa-quote-left'></i>#{conference}</p>"
      end
    end

    if location
      html += "<p><i class='fa fa-map-marker'></i>#{location}</p>"
    end

    if dates
      html += "<p><i class='fa fa-calendar'></i>#{dates}</p>"
    end

    if code
      html += "<p><a href='#{code}'><i class='fa fa-code'></i>Sample Code</a></p>"
    end

    if video
      html += "<p><a href='#{video}'><i class='fa fa-youtube-play'></i>Recorded Video</a></p>"
    end
    html += "</div>"

    html += "</li>"

    html
  end

  def self.talks_to_html(type, talks)
    if talks &&  talks.count > 0
      formatted_talks = talks.select{ |talk| talk["hidden"] != true }.map { |talk| talk_to_html(type, talk) }.reduce(:+)
      formatted_talks
    else
      # Just gonna assume we always have past talks, error always says 'upcoming' ¯\_(ツ)_/¯
      "<p>No upcoming talks at this time.</p>"
    end
  end
end
