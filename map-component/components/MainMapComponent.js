var MainMapComponent = React.createClass({
  getInitialState: function() {
      return {
        points: INITIALPOINTS,
        categories: INITIALCATEGORIES,
        imgwidth: INITIALW,
        imgheight:INITIALH,
        imgSrc: IMGSRC,
        aspect: INITIALH / INITIALW,
        zoom: 1,
        dragging: false,
        mousedown: false,
        mapAttr: {}
      }
  },
  orderer: function(items) {
    var ordered = [];
    $(items).each(function(index,e){
      e.order = index;
      ordered.push(e);
    });
    return ordered;
  },
  idGenerator: function(items) {
    var newID = 1;
    if(items.length > 0) {
      var highNum = 0;

      $(items).each(function(index, e){
        if(e.id > highNum) {
          highNum = e.id;
        }
      });
      newID = highNum+1;
    }
    return newID;
  },
  updatePoints: function(newPoints) {
    var editing = false;
    $(newPoints).each(function(index,e){
      if(e.editing == true) {
        editing = true;
      }
    }.bind(this));

    $(APP).trigger('receiveFromPoints', [newPoints, editing]);
    this.setState({points: newPoints, editing: editing});
  },
  addAPoint: function(e) {
    e.preventDefault();

    var currentPoints = this.state.points;
    var newPoints = currentPoints.concat([
      {
        id: this.idGenerator(currentPoints),
        title:'',
        editing: true,
        newPoint: true,
        cat: false
      }
    ]);

    this.updatePoints(newPoints);
  },
  setPoint: function(point) {

    var currentPoints = this.state.points;
    $(currentPoints).each(function(index, e){
      if(e.id == point.id) {
        currentPoints[index] = point;
      }
    });
    this.updatePoints(currentPoints);
  },
  deletePoint: function(badid, saved) {
    if(saved) {
      var confirmed = confirm("Are you sure you want to delete this map point? This can't be undone.");
      if(!confirmed) {
        return;
      }
    }
    var currentCats = this.state.points;
    var filteredPoints = currentCats.filter(function (el) {
                      return el.id !== badid;
                 });

    this.updatePoints(filteredPoints);
  },
  wheelMove: function(e) {
    e.preventDefault();
    console.log('asfddsf');
    console.log(e.deltaY);
  },
  draggerStart: function() {
    this.setState({mousedown:true});
    setTimeout(function(){
      if(this.state.mousedown == true) {
        this.setState({dragging: true})
      }
    }.bind(this),500)
  },

  draggerEnd: function() {
    var dragState = this.state.dragging;
    this.setState({mousedown:false, dragging:false});
  },
  render: function() {
    if(this.state.points < 1) {

      return (
        <div className="points-component empty-state">
        <input type="hidden" name="map_point_data" id="map_point_data" value={JSON.stringify(this.state.points)} />


          <div className="copy">
            <h1>Get Started</h1>

            <p>Start adding points to your map.</p>
            <button onClick={this.addAPoint} className="button button-primary button-hero" disabled={this.state.editing}>Add the first point</button>
          </div>



        </div>
      )
    }
    //NON-EMPTY
    var addButton = <div className="footer">
                      <a href="#" disabled={this.state.disabled} onClick={this.addAPoint} className="addPoint taxonomy-add-new">+ Add New Map Point</a>
                    </div>;

    //CREATE CATEGORY BLOCKS
    var categoryBlocks = this.state.categories;
    $(categoryBlocks).each(function(index,e){
      var category = e;
      var pointArray = [];
      $(this.state.points).each(function(index,e){
        var point = e;

        if(point.cat == category.id) {
          pointArray.push(point);
        }
      });
      categoryBlocks[index].points = pointArray;

    }.bind(this));
    //MAKE THE POINT LIST
    console.log(categoryBlocks);
    var pointList = categoryBlocks.map(function(block){
      if(block.points.length > 0) {
        return <PointCategoryBlock
                  categories={this.state.categories}
                  savePoint={this.setPoint}
                  deletePoint={this.deletePoint}
                  points={block.points}
                  id={block.id}
                  name={block.name}
                  key={block.id}
                  categoryBlocks={categoryBlocks}
                  updatePoints={this.updatePoints}
                  editState={this.state.editing}
                  orderer={this.orderer}/>
      }

    }.bind(this))
    //NEW POINT ITEM
    var newPointItem = false;
    $(this.state.points).each(function(index,e){
      if(e.cat === false) {
        newPointItem = <div className="pointItem currently-editing" ><PointForm title={e.title} lat={e.lat} lng={e.lng} newPoint={e.newPoint} cat={this.state.categories[0].id} id={e.id} savePoint={this.setPoint} deletePoint={this.deletePoint} categories={this.state.categories}/></div>
      }
    }.bind(this));

    return(
      <div id="points-component">
        <input type="hidden" name="map_point_data" id="map_point_data" value={JSON.stringify(this.state.points)} />
        {pointList}
        {newPointItem}
        {addButton}
      </div>
    )
  }






});
