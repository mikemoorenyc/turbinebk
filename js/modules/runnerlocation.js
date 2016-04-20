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
  $(document).on('mousedown', '#map-overlay', function(event){
    dragging = true;
    cursorX = event.clientX,
    cursorY = event.clientY;
  });
  $(document).on('mouseup',function(){
    dragging = false;
  });
  $(document).on('mouseleave', '#map-overlay',function(){
    dragging = false;
  });
  $(document).on('mousemove', '#map-overlay', function(e){
    e.preventDefault();
    if(dragging) {


      var xChange =  e.clientX - cursorX;
      var yChange =  e.clientY - cursorY;

      $("img#map-img").panzoom("pan", xChange, yChange, { relative: true });
      cursorX = e.clientX,
      cursorY = e.clientY;

    }
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
