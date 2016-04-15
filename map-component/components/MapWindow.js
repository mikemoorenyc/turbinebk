 var MapWindow = React.createClass({

   getInitialState: function() {
     var coordinates = this.props.pointCoor;
     if(!coordinates) {
       coordinates = {
         x: .5,
         y: .5
       }
     }
     return {
       aspect: INITIALH/INITIALW,
       windowDim: {
         width:0,
         height:0
       },
       zoom: 1,
       overlayPos: {
         weightX:.5,
         weightY: .5,
         x: 0,
         y: 0
       },
       pointcoor: coordinates,
       dragging:false,
       mousePos: {}
     }
   },
   getWindowSize: function() {
     var height = $(this.refs.mapWindow).width() * this.state.aspect
     this.setState({
       windowDim: {
         width: $(this.refs.mapWindow).width(),
         height: height
       },
       overlayPos: {
         x: ($(this.refs.mapWindow).width() - ($(this.refs.mapWindow).width()*this.state.zoom)) /2,
         y: (height- (height*this.state.zoom)) /2
       }
     })
   },
   componentDidMount: function() {
     $(window).on('resize',function(){
       this.getWindowSize();
       this.setState({
         zoom:1
       })
     }.bind(this));
     this.getWindowSize();


   },
   componentWillUnmount: function() {
     $(window).off('resize');
   },
   pointcoorUpdate: function(x,y) {
     this.setState({
       pointcoor: {
         x: x,
         y: y
       }
     });
     this.props.updateCoor({x:x,y:y});
   },
   zoomIncrease: function() {
    // this.setState({zoom:this.state.zoom+.2});
    this.zoomState('up',.2);
   },
   zoomDecrease: function() {
    // this.setState({zoom:this.state.zoom-.2});
    this.zoomState('down',.2);
   },
   zoomState: function(dir, increment) {
     var inc = increment;
     if(dir == 'down') {
       inc= -inc;
     }
     if((this.state.zoom+inc < 1 && dir =='down')) {
       return false;
     }
     if(this.state.zoom+inc >2 && dir == 'up') {
       return false;
     }

     var  newZoom = this.state.zoom + inc;
     var  newW = this.state.windowDim.width * newZoom,
          newH = this.state.windowDim.height * newZoom,
          threshX = this.state.windowDim.width - (this.state.windowDim.width * this.state.zoom),
          threshY = this.state.windowDim.height - (this.state.windowDim.height * this.state.zoom),
          newthreshX = this.state.windowDim.width - newW,
          newthreshY = this.state.windowDim.height - newH,
          currentX = parseFloat($(this.refs.mapOverlay).css('left')),
          currentY = parseFloat($(this.refs.mapOverlay).css('top'));
    function coorSetter(currentX, newW, threshX, newthreshX, point) {
      if(point <= .33) {
        return 0;
      }
      if(point >.33 && point <= .66) {
        return newthreshX * .5;
      }
      if(point >.66) {
        return newthreshX;
      }
      /*
      if(currentX == 0 && threshX == 0) {
        return newthreshX * .5;
      }
      //FIND PERCENT
      var perc = currentX / threshX;
      var newCoor = perc * newthreshX;
      if(newCoor > 0) {
        return 0;
      }
      if(newCoor < newthreshX) {
        return newthreshX;
      }
      */
      return newthreshX * .5;
    }
    this.setState({
      zoom: newZoom,
      overlayPos: {
        x: coorSetter(currentX,newW,threshX,newthreshX, this.state.pointcoor.x),
        y: coorSetter(currentY,newH,threshY,newthreshY, this.state.pointcoor.y)
      }
    });
   },
   mDown: function(e) {
     e.stopPropagation();
     this.setState({
       dragging:true,
       mousePos: {
         x: e.pageX,
         y: e.pageY
       }
     })
   },
   mUp: function(e) {
     this.setState({dragging:false})
   },
   mMove: function(e) {
     e.preventDefault()
     if(!this.state.dragging) {

       return false;
     }
     this.positionFinder(e.pageX,e.pageY, this.state.mousePos.x, this.state.mousePos.y)

     this.setState({
       mousePos: {
         x: e.pageX,
         y: e.pageY
       }
     })
     return false;


   },
   positionFinder: function(nX,nY,pX,pY) {

     var  oX = parseFloat($(this.refs.mapOverlay).css('left')),
          oy = parseFloat($(this.refs.mapOverlay).css('top')),
          oW = $(this.refs.mapOverlay).width(),
          oH = $(this.refs.mapOverlay).height(),
          xThresh = ($(this.refs.mapWindow).width() - oW),
          yThresh = $(this.refs.mapWindow).height() - oH;
     var xDif = nX - pX,
          yDif = nY - pY;

      var newX = xDif + this.state.overlayPos.x;
      var newY = yDif + this.state.overlayPos.y;
      var xPos = this.state.overlayPos.x,
          yPos = this.state.overlayPos.y;
      if(newX < 0 && newX > (xThresh)) {
        xPos = newX

      }
      if(newY < 0 && newY > yThresh) {
        yPos = newY;
      }
      this.setState({
        overlayPos: {
          x: xPos,
          y: yPos
        }
      })
   },
  render: function() {

    var zoomin,
        zoomout;
    if(this.state.zoom <2) {
      zoomin= <div className="zoom-increase" onClick={this.zoomIncrease}>Increase</div>

    }
    if(this.state.zoom >1) {
      zoomout=<div className="zoom-decrease" onClick={this.zoomDecrease}>Decrease</div>
    }
    var xDif = ((this.state.windowDim.width * this.state.zoom) - this.state.windowDim.width);
    var yDif = ((this.state.windowDim.height* this.state.zoom) - this.state.windowDim.height);
    var mapDim = {
      width: this.state.windowDim.width * this.state.zoom,
      height: this.state.windowDim.height * this.state.zoom,
      left: this.state.overlayPos.x+'px',
      top: this.state.overlayPos.y+'px'
    }
    return (
      <div className="map-window" ref="mapWindow"
      style={{
        height: this.state.windowDim.height
      }}
      >
        <img className="map-image"
        style={mapDim}

        ref="mapImage" src={IMGSRC} />
        <div className="map-overlay"
          onMouseDown={this.mDown}
          onMouseUp={this.mUp}
          onMouseLeave={this.mUp}
          onMouseMove={this.mMove}
          style={mapDim}
          ref="mapOverlay"
        >
        <MapPoint
        overlayDim={mapDim}
        pointcoor={this.state.pointcoor}
        pointUpdate={this.pointcoorUpdate}

        />


        </div>

        <div className="zoom-controls">
          {zoomin}
          {zoomout}

        </div>


      </div>
    )
  }
});
