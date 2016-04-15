var MapPoint = React.createClass({
  getInitialState: function() {
    return {
      pointCoor: this.props.pointcoor
    }
  },
  dragger: {},
  componentDidMount: function(){

    this.dragger = $(this.refs.point).draggabilly({
      containment:true
    });
    this.dragger.on( 'dragEnd', function( event, pointer ) {

      var dragData = $(this.dragger).data('draggabilly');
      //console.log(dragData)
      //console.log(this.props.pointcoor.x);
      //console.log(dragData.dragPoint.x /this.props.overlayDim.width + this.props.pointcoor.x);
      var xChange = (dragData.dragPoint.x / this.props.overlayDim.width)+this.props.pointcoor.x;
      var yChange = (dragData.dragPoint.y / this.props.overlayDim.height)+this.props.pointcoor.y;
      this.props.pointUpdate(xChange,yChange);
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.dragger.off( 'dragEnd');
    this.dragger.draggabilly('destroy');
  },
  stopProp: function(e) {
    e.stopPropagation();
  },
  render: function(){
    return (
      <div ref="point" className="map-point"
        onMouseDown={this.stopProp}
        style={{
          left: (this.props.pointcoor.x * 100)+'%',
          top: (this.props.pointcoor.y * 100)+'%',
        }}
      >


      </div>
    )
  }
});
