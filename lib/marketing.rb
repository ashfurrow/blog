class Book
  attr_accessor :book_name
  attr_accessor :body
  attr_accessor :href

  def initialize(book_name)
    @book_name = book_name
    if book_name == 'swift'
      @href = 'http://leanpub.com/yourfirstswiftapp'
      @body = 'My book takes beginners on the journey of building their first full iOS app. I detail everything from opening Xcode for the first time, to building the app, to even submitting to the App Store.'
    elsif book_name == 'collectionview'
      @href = 'http://www.amazon.com/gp/product/B00IHZKDCU/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00IHZKDCU&linkCode=as2&tag=ashfur-20&linkId=T2MHOE5AYIWQTV3G'
      @body = 'UICollectionView: The Complete Guide will help you build highly immersive, cutting-edge iOS user interfaces that transform your apps from good to great!'
    elsif book_name == 'iosfrp' || book_name == 'frpswift'
      @href = 'http://leanpub.com/iosfrp'
      @body = 'My book, aimed at intermediate iOS developers, explores the power and subtlety of functional reactive programming on iOS. Start building apps faster, safer, and with less frustration today!'
    else
      abort "Invalid book name: #{book_name}"
    end
  end
end