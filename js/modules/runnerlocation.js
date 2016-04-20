function runnerlocation() {
  overlaySetter();
  $("img#map-img").panzoom({
  minScale: 1,
  maxScale: 3,
  $zoomIn: $('#map-controls button.in'),
  $zoomOut: $('#map-controls button.out'),
  contain: 'invert',
  transition: false
  });

  function overlaySetter() {
    var obj = $("img#map-img")[0].getBoundingClientRect();
    var windowObj = $("#map-apparatus").offset();

    $('#map-overlay').css({
      width: obj.width,
      height: obj.height,
      left: (obj.left - windowObj.left)+'px',
      top: (($(window).scrollTop()+obj.top) - windowObj.top)+'px'
    });
  }
  overlaySetter();
  $(window).resize(function(){

    $("img#map-img").panzoom('zoom', 1);
  });

  var dragging = false;
  var cursorX = 0;
  var cursorY = 0;
  $("img#map-img").on('panzoomchange',function(){
    overlaySetter();
  });
  $('#map-overlay').on('mousedown', function(event){
    dragging = true;
    cursorX = event.clientX,
    cursorY = event.clientY;
  });
  $(document).on('mouseup',function(){
    dragging = false;
  });
  $('#map-overlay').on('mouseleave',function(){
    dragging = false;
  });
  $('#map-overlay').on('mousemove', function(e){

    e.preventDefault();
    if(dragging) {


      var xChange =  e.clientX - cursorX;
      var yChange =  e.clientY - cursorY;

      $("img#map-img").panzoom("pan", xChange, yChange, { relative: true });
      cursorX = e.clientX,
      cursorY = e.clientY;

    }
  });
  var wheelClicks = 0 ;
  var wheelReset;
  $(document).on('mousewheel', '#map-overlay', function(event, delta){
    clearTimeout(wheelReset);
    wheelReset = setTimeout(function(){
      wheelClicks = 0;
    },500);
    event.preventDefault();
    wheelClicks++;
    if(wheelClicks > 2) {
      if(event.deltaY > 0) {

        $('#map-controls button.in').click();
      }
      if(event.deltaY < 0) {
        $('#map-controls button.out').click();
      }
      wheelClicks = 0;
    }

  });
  /*



  //FIGURE OUT ZOOMING

  $(document).on('mousewheel', '#map-overlay', function(event, delta){
    event.preventDefault();
    var zoomP = event.deltaY/100;
    var newZoom = zoomL + zoomP;
    if(newZoom < 1 || newZoom > 2) {
      return false;
    }

    var ww = $('#map-apparatus .sizer').width(),
        wh = $('#map-apparatus .sizer').height(),
        wl = $('#map-apparatus').offset().left,
        wt = $('#map-apparatus').offset().top,
        posX = event.pageX - wl,
        posY = event.pageY - wt,
        initTop = parseFloat($('#map-overlay').css('top')),
        initLeft = parseFloat($('#map-overlay').css('left'));
        console.log(posY / wh);

  });

  */


  //BUTTON CLICKS
  $(document).on('click', '#map-categories > button',function(e){
    e.preventDefault;
    var cat = $(this).data('cat');
    if(cat == 'all') {
      $('#map-overlay .map-point').removeClass('__disabled');
      return false;
    }
    $('#map-overlay .map-point').addClass('__disabled');
    $('#map-overlay .map-point[data-cat="'+cat+'"]').removeClass('__disabled');


  });


}
