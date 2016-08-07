/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2014 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

 /*
 * Note from Ash: I've heavily removed things; see their original for more.
 */

var lunrIndex = null;
var lunrMap  = null;

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
  var MQL = 1170;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('.navbar-custom').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-visible');
          } else {
            $('.navbar-custom').removeClass('is-visible is-fixed');
          }
        } else {
          //if scrolling down...
          $('.navbar-custom').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-fixed');
          }
        }

        this.previousTop = currentTop;
      });
  }

  // Download search json and set up.
  $.ajax({
    url: '/search.json',
    cache: true,
    method: 'GET',
    success: function(data) {
      console.log('Downloaded Search JSON.');
      setupSearch(data);
    }
  });
});

var trackMaretingLink = function(link) {
   ga('send', 'event', 'marketing', link);
}

// Setup lunr index and callback for search-as-you-type. 
function setupSearch(lunrData) {
  console.log('Creating search index.');
  lunrIndex = lunr.Index.load(lunrData.index);
  lunrMap = lunrData.docs;

  $('#search').unwrap();
  $('#search-result-group').remove();

  $("#search").bind("keyup", function(){
    $(".search-results").empty();

    var query = $(this).val();

    if (query.length <= 2) { return; }

    var options = { year: "numeric", month: "long", day: "numeric" };
    var results = lunrIndex.search(query)

    if (results.length == 0) {
      $(".search-results").append('<p>No results.</p>');
    } else {
      $.each(results, function(index, result) {
        page = lunrMap[result.ref];
        date = new Date(page.date.match(/\d{4}-\d{2}-\d{2}/)).toLocaleDateString("en-US", options);
        $(".search-results").append(
          '<div class="result">' +
            '<a href="' + page.url + '">' + 
              page.title +
            '</a> &nbsp; ' +
            '<div class="post-meta">' + date + '</div>' +
          '</div>'
        );
      });
    }
  }).keyup();
}
