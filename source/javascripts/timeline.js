$(document).ready(function(e){   
  $('.cntl').cntl({
    // The amount of "scroll padding" to allow 
    // The more, the later the state will be revealed
    revealbefore: 200,
    // The animate class
    // This class should have animation rules in css
    anim_class: 'cntl-animate',
    // A callback once the state has been revealed
    onreveal: null 
  });
});
