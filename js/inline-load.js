
//GLOBAL JAVASCRIPT VARIABLES TAKEN FROM PHP
var phpvars_siteDir = '***REPLACEWITHTHEMEDIRECTORY***',
    phpvars_timestamp = '***TIMESTAMP***';

var cssExpand = phpvars_siteDir+"/css/expanded.css?v="+phpvars_timestamp;

function loadCSS(e,t,n){"use strict";function o(){var t;for(var i=0;i<s.length;i++){if(s[i].href&&s[i].href.indexOf(e)>-1){t=true}}if(t){r.media=n||"all"}else{setTimeout(o)}}var r=window.document.createElement("link");var i=t||window.document.getElementById("inline-scripts");var s=window.document.styleSheets;r.rel="stylesheet";r.href=e;r.media="only x";i.parentNode.insertBefore(r,i);o();return r}


loadCSS(cssExpand);
$(document).ready(function(){
  console.log($('#box')[0].getBoundingClientRect());
  $('.click').click(function(){
    $('#box').css('transform', 'scale(2)');
    console.log($('#box')[0].getBoundingClientRect());
  });
});

/*
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63358476-5', 'auto');
  ga('send', 'pageview');
  */
