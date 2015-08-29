class Event
  attr_accessor :year
  attr_accessor :heading
  attr_accessor :content
  attr_accessor :image_url

  def initialize (year = nil, heading, content, image_url)
    @year = year
    @heading = heading
    @content = content
    @image_url = image_url
  end

  def formatted_date
    if @year
      "<div class='timeline-icon timeline-center'>#{@year}</div>"
    else
      ""
    end
  end

  def formatted_image
    if @image_url
      "<div class='timeline-image'><img src='#{ @image_url }'></div>"
    else
      ""
    end
  end

  def formatted_heading
    if @heading
      id = @heading.downcase
      id.gsub!(/[^a-zA-Z0-9]/, '')
      "<h3 id='#{ id }'>#{ @heading }</h3>"
    else
      ""
    end
  end

  def formatted_content
    if @content
      @content.map { |p| "<p>#{ p }</p>\n" }.reduce(:+)
    else
      ""
    end
  end

  def to_html
    <<-eos
      <div class="timeline-state">
        #{ formatted_date }
        <div class="timeline-content">
          #{ formatted_heading }
          #{ formatted_content }
        </div>
        #{ formatted_image }
      </div>
    eos
  end

end

module Timeline

  def self.make_event(stuff)
    Event.new(stuff['year'], stuff['heading'], stuff['content'], stuff['img_url'])
  end

  public

  def self.PrintEvents(events_by_year)
    events_by_year.sort_by { |year, events| year.to_int }.map do |hash|
      events = hash.values.first
      year = hash.keys.first
      events[1..-1].prepend(events.first.merge({'year' => year})) .map { |e| make_event(e) }
    end.flatten.map{ |e| e.to_html }.reduce(:+)
  end

end
