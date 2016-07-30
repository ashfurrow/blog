/*!
loadCSS: load a CSS file asynchronously.
[c]2015 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
!function(e){"use strict";e.loadCSS=function(t,n,i){var s,o=e.document.createElement("link");if(n)s=n;else if(e.document.querySelectorAll){var a=e.document.querySelectorAll("style,link[rel=stylesheet],script");s=a[a.length-1]}else s=e.document.getElementsByTagName("script")[0];var l=e.document.styleSheets;return o.rel="stylesheet",o.href=t,o.media="only x",s.parentNode.insertBefore(o,n?s:s.nextSibling),o.onloadcssdefined=function(e){for(var t,n=0;n<l.length;n++)l[n].href&&l[n].href===o.href&&(t=!0);t?e():setTimeout(function(){o.onloadcssdefined(e)})},o.onloadcssdefined(function(){o.media=i||"all"}),o}}(this);