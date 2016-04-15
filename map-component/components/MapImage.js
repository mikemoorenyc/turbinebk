var MapImage = React.createClass({
  render: function(){
    return(
      <img className="map-image" ref="map-image" src={this.props.img} />
    )
  }
});
