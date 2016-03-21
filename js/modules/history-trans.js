
function theHistory() {

  var $document = $(document);

  var titleState = '';

  if (!History.enabled) {

      return false;
  }

  var root = History.getRootUrl();

  $.expr.filters.internal = function (elem) {
      return (elem.hostname == window.location.hostname && /(\/|\.html)$/i.test(elem.pathname)) || false;
  };

  function find_all($html, selector) {
      return $html.filter(selector).add($html.find(selector));
  }

  function parse_html(html) {
      return $($.parseHTML(html, document, true));
  }

  function parse_response(html) {
      var
          head = /<head[^>]*>([\s\S]+)<\/head>/.exec(html),
          body = /<body[^>]*>([\s\S]+)<\/body>/.exec(html),

          $head = head ? parse_html(head[1]) : $(),
          $body = body ? parse_html(body[1]) : $(),

          title = $.trim(find_all($head, 'title').last().html()),
          $content = $.trim(find_all($body, '#ajax-catcher').first().html());
          description = $.trim(find_all($head, 'meta[name="description"]').last().attr('content'));

      return {
          'pagesub' : $.trim(find_all($body, '#page-sub').first().html()),
          'title': title,
          '$content': $content,
          'description': description
      }
  }

  $document.ready(function () {
      $document.on('click', 'a.internal', function (event) {

        if($('html').hasClass('__page-loading') == true) {
          return false;
        }

        titleState = $('title').last().html();
          if (event.which == 2 || event.ctrlKey || event.metaKey) {
              return true;
          }

          History.pushState(null, null, $(this).attr('href'));
          event.preventDefault();

          return false;
      });
  });

  $(window).on('statechange', function () {

      //INITIATE LOADING ANIMATION
      $('html').addClass("__page-loading");

      //$('html').addClass('__mobile-nav-closed').removeClass('__mobile-nav-opened');

      var loading = true;







      var thenext = History.getState().url,
       therel = thenext.replace(root, '/');


      $('title').last().html(titleState);
      $('#main-content-container').animate({opacity: 0}, 250, function(){
        $("body, html").scrollTop(0);
        runner();
      });


//      $("html").velocity("scroll", { offset: '0px', mobileHA: false});
      function runner(){
        var
            url = History.getState().url,
            rel = url.replace(root, '/');

        $.get(rel).done(function (date) {
            loading = false;
            var response = parse_response(date);

            if (!response.$content.length) {
                document.location.href = url;

                return false;
            }


            var newStuff = response.$content;




            if (response.title.length) {
                $('title').last().html(response.title);
            }

            //NEW LOAD



            var newSlug = $(newStuff).data('slug');

            //var pinAssemblage = $(newStuff).find('#top-header');
        
            $('#main-content-container').empty();
            $('#main-content-container').html($(newStuff).html());
            $('#main-content-container').attr('data-slug', newSlug);
            $("body, html").scrollTop(0);
            $('#main-content-container').animate({opacity:1}, 250);
            //$('.page-content').velocity({opacity:1}, {duration: ts*1.5});
            pageLoader(newSlug);

            $("html").removeClass('__page-loading');


        }).fail(function () {
          console.log('fail');
            document.location.href = url;

            return false;
        });
      }


  });
}


function pageReady() {

}
