function runnerlocation() {
  var dragging = false,
      cursorX = 0,
      cursorY = 0;
      zoomL = 1;
  var imgw = $('#map-img').data('w'),
      imgh = $('#map-img').data('h'),
      vw = $('#map-apparatus .sizer').width(),
      vh = $('#map-apparatus .sizer').height();
  $(window).resize(function(){
     vw = $('#map-apparatus .sizer').width(),
        vh = $('#map-apparatus .sizer').height();
        centerer();
  });
  $("#map-img, #map-overlay").width(imgw).height(imgh);

  function centerer() {
    var xDif = imgw - vw,
        yDif = imgh - vh,
        left = 0,
        top = 0;
    if(xDif > 0) {
      left = xDif / 2;
    }
    if(yDif > 0) {
      top = yDif/2;
    }
    $('#map-img, #map-overlay').css({
      'left': -(left)+'px',
      'top': -(top)+'px'
    });
  }
  centerer();

  //
  function positionFinder(e) {
    var int = 0;
    var xChange = cursorX - e.clientX;

    var xThresh = vw - imgw;
    var newX = (parseFloat($('#map-overlay').css('left'))+(-xChange));
    if(newX > 0 && xChange > 0) {
      newX = 0;
    }
    if(newX < xThresh && xChange <0) {
      newX = xThresh;
    }
    if(newX <= 0 && newX >= xThresh) {
      $('#map-img, #map-overlay').css({
        'left': newX+'px'
      });
    }

    var yChange = cursorY - e.clientY;
    var yThresh = vh - imgh;
    var newY = (parseFloat($('#map-overlay').css('top'))+(-yChange));
    if(newY > 0 && yChange > 0) {
      newY = 0;
    }
    if(newY < yThresh && yChange <0) {
      newY = yThresh;
    }
    if(newY <= 0 && newY >= yThresh) {
      $('#map-img, #map-overlay').css({
        'top': newY+'px'
      });
    }
    cursorX = e.clientX,
    cursorY = e.clientY;
  }
  $(document).on('mousedown', '#map-overlay', function(e){
    dragging = true;
    cursorX = event.clientX,
    cursorY = event.clientY;
  });
  $(document).on('mouseup',function(){
    dragging = false;
  });
  $(document).on('mouseleve', '#map-overlay',function(){
    dragging = false;
  });
  $(document).on('mousemove', '#map-overlay', function(event){
    if(dragging) {
      positionFinder(event)
    }
  });


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
        //console.log(posY / wh);

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
