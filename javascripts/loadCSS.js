/*!
loadCSS: load a CSS file asynchronously.
[c]2015 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
!function(e){"use strict";e.loadCSS=function(t,n,l){var o,r=e.document.createElement("link");if(n)o=n;else if(e.document.querySelectorAll){var s=e.document.querySelectorAll("style,link[rel=stylesheet],script");o=s[s.length-1]}else o=e.document.getElementsByTagName("script")[0];var i=e.document.styleSheets;return r.rel="stylesheet",r.href=t,r.media="only x",o.parentNode.insertBefore(r,n?o:o.nextSibling),r.onloadcssdefined=function(e){for(var t,n=0;n<i.length;n++)i[n].href&&i[n].href===r.href&&(t=!0);t?e():setTimeout(function(){r.onloadcssdefined(e)})},r.onloadcssdefined(function(){r.media=l||"all"}),r}}(this);