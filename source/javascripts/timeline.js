// Adapted from http://www.jqueryscript.net/other/Responsive-Vertical-Timeline-With-jQuery-CSS3.html

(function($) {
  $.fn.timeline = function(options) {

    /* default settings */
    var settings = $.extend({
      revealbefore : 200, /* this is the amount of "scroll padding" to allow (the more, the later the state will be revealed) */
      anim_class : 'timeline-animate', /* the anim class, this class should have animation rules in css */
      onreveal : null /* a callback once the state has been revealed */
    }, options);


    return this.each(function(){
      var statelist = $(this).find('.timeline-state');
      var bar_fill = $(this).find('.timeline-bar-fill');
      var states = [];
      var tbf = 0;

      function setupElements(){
        for (var i = 0; i < statelist.length; i++){
          states[i] = {};
          states[i]['top'] = $(statelist[i]).offset().top + settings.revealbefore;
          states[i]['elm'] = $(statelist[i]);
        };

        revealElements();
      }

      function revealElements(){
        var windowtop = $(window).scrollTop();
        var windowbtm = windowtop + $(window).height();

        for (var i = 0; i < states.length; i++){

          if (states[i].top > windowtop && states[i].top < windowbtm){
            if (!states[i].elm.hasClass(settings.anim_class) && $.isFunction(settings.onreveal)){
              settings.onreveal.call(this, states[i].elm);
            }

            states[i].elm.addClass(settings.anim_class);
            var h = states[i].elm.position().top;

            if(h > tbf){
              tbf = h;
            }
            bar_fill.height(tbf);
          }
        };
      }

      $(window).on('scroll', revealElements);
      $(window).on('load', setupElements)
    });
  }
}(jQuery));

// Start when the document is ready.
$(document).ready(function(e){
  $('.timeline').timeline();
});
