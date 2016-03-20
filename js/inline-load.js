
//GLOBAL JAVASCRIPT VARIABLES TAKEN FROM PHP
var phpvars_siteDir = '***REPLACEWITHTHEMEDIRECTORY***',
    phpvars_timestamp = '***TIMESTAMP***';

var cssExpand = phpvars_siteDir+"/css/expanded.css?v="+phpvars_timestamp;

function loadCSS(e,t,n){"use strict";function o(){var t;for(var i=0;i<s.length;i++){if(s[i].href&&s[i].href.indexOf(e)>-1){t=true}}if(t){r.media=n||"all"}else{setTimeout(o)}}var r=window.document.createElement("link");var i=t||window.document.getElementById("inline-scripts");var s=window.document.styleSheets;r.rel="stylesheet";r.href=e;r.media="only x";i.parentNode.insertBefore(r,i);o();return r}


loadCSS(cssExpand);
