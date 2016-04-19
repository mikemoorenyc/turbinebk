//PAGE LOADER FUNCTION
function pageLoader(newSlug) {

  // BASE STUFF

  //NAV ACTIVE CLASSES
  $('nav#top-menu ul li').removeClass("active");
  $('nav#top-menu ul li.'+newSlug).addClass('active');


  //SEND CURRENT STATE TO GOOGLE
  var currentURL = window.location.href ;

  if(typeof ga !=='undefined') {
    ga('send', 'pageview', currentURL);
  }
  //MAKE INTERNAL LINKS
  var siteURL = "http://" + top.location.host.toString();
  var internalLinks = $("a[href^='"+siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../']");
  $(internalLinks).addClass('internal');
  $('a.internal').each(function(){
    var linkstr = $(this).attr('href');
    if($(this).attr('target') == "_blank" || linkstr.indexOf('.pdf') >= 0 || linkstr.indexOf('.jpg') >= 0 || linkstr.indexOf('.png') >= 0 || linkstr.indexOf('.zip') >= 0 ||  linkstr.indexOf('.gif') >= 0) {
      $(this).removeClass('internal');
    }
  });

  //RUN PAGE SPECIFIC FUNCTIONS


  if (typeof window['runner'+newSlug] == 'function') {

    window['runner'+newSlug]();
  } else {
  }



}
