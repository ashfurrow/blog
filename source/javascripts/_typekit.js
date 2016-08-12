// From https://github.com/morris/typekit-cache
!function(e,t,n,a,r,c,l,s,o){l=a[r],l&&(s=e.createElement("style"),s.innerHTML=l,e.getElementsByTagName("head")[0].appendChild(s),e.documentElement.className+=" wf-cached"),o=t[n],t[n]=function(e,p,u,i){if("string"==typeof p&&p.indexOf(c)>-1){try{u=new XMLHttpRequest,u.open("GET",p,!0),u.onreadystatechange=function(){try{4==u.readyState&&(i=u.responseText.replace(/url\(\//g,"url("+c+"/"),i!==l&&(a[r]=i))}catch(e){s&&(s.innerHTML="")}},u.send(null)}catch(d){}t[n]=o}return o.apply(this,arguments)}}(document,Element.prototype,"setAttribute",localStorage,"tk","https://use.typekit.net");

(function(d) {
  var config = {
    kitId: 'fmr6vlo',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);