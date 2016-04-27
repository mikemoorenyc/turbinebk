function runnerlocation() {
  var transformer = $("img#map-transformer");
  function pzSet() {
    var dif = $('#map-img').data('w') / $('#map-apparatus').width();

    if(dif <= 1) {
      return false;
    }
    transformer.panzoom({
      minScale: 1,
      maxScale: dif,
      $zoomIn: $('#map-controls button.in'),
      $zoomOut: $('#map-controls button.out'),
      contain: 'invert',
      transition: false
    });
  }
  pzSet();
  overlaySetter();


  function overlaySetter() {
    var obj = transformer[0].getBoundingClientRect();
    var windowObj = $("#map-apparatus").offset();

    $('#map-overlay, #map-img').css({
      width: obj.width,
      height: obj.height,
      left: (obj.left - windowObj.left)+'px',
      top: (($(window).scrollTop()+obj.top) - windowObj.top)+'px'
    });
  }
  overlaySetter();
  $(window).resize(function(){
    transformer.panzoom('reset',false);
    //transformer.panzoom('destroy');
    overlaySetter();
  });

  var dragging = false;
  var cursorX = 0;
  var cursorY = 0;
  transformer.on('panzoomchange',function(){
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

      transformer.panzoom("pan", xChange, yChange, { relative: true });
      cursorX = e.clientX,
      cursorY = e.clientY;

    }
  });

  $(document).on('mousewheel', '#map-apparatus', function(event){

    event.preventDefault();

    var delta = event.delta ;
    var zoomOut = delta ? delta < 0 : event.originalEvent.deltaY > 0;
    transformer.panzoom('zoom', zoomOut, {
      increment: 0.1,
      animate: false,
      focal: event
    });




  });






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
