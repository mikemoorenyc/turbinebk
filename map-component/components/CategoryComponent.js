var CategoryComponent = React.createClass({
  mixins: [SortableMixin],
  sortableOptions: {
    ref: 'catList',
    model: 'categories',
    handle: '.drag-handle',
    animation: 100,

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
  getInitialState: function() {
    return {
      points: INITIALPOINTS,
      categories: this.orderer(INITIALCATEGORIES),
      editing: false,
      disabled: false
    }
  },
  updateCat: function(newcategories) {
    var editing = false;
    $(newcategories).each(function(index,e){
      if(e.editing == true) {
        editing = true;
      }
    }.bind(this));

    $(APP).trigger('receiveFromCategories', [newcategories, editing]);
    this.setState({categories: newcategories, editing: editing});
  },
  addACat: function(e) {
    e.preventDefault();
    var currentCats = this.state.categories;
    var newCats = currentCats.concat([
      {
        id: this.idGenerator(currentCats),
        name:'',
        editing: true,
        newCat: true,
        color: '#cc0000'
      }
    ]);
    this.updateCat(newCats);
  },
  deleteCat: function(badid, saved) {

    if(saved === true) {
      if(this.state.categories.length < 2) {
        alert("You need to have at least one category.");
        return false;
      }
      var cancel;
      $(this.state.points).each(function(index,e){
        if(e.cat == badid) {

          cancel = true;
        }
      });
      if(cancel) {
        alert("Sorry. You can't delete this category because some map points are using it. Delete those points or change their category.");
        return false;
      }
      var confirmed = confirm("Are you sure you want to delete this category? This can't be undone.");
      if(!confirmed) {
        return false;
      }

    }
    var currentCats = this.state.categories;
    var filteredPoints = currentCats.filter(function (el) {
                      return el.id !== badid;
                 });

    this.updateCat(filteredPoints);
  },
  setCat: function(point) {

    var currentPoints = this.state.categories;
    $(currentPoints).each(function(index, e){
      if(e.id == point.id) {
        currentPoints[index] = point;
      }
    });
    this.updateCat(currentPoints);

  },
  render: function() {
    var canDrag = !this.state.editing;
    if(this.state.categories.length < 2) {
      canDrag = false;
    }

    var catList = this.state.categories.map(function(cat){

      var catItem = false,
          catForm = false,
          catClass = 'categoryItem drag-container';
      if(cat.editing) {
        catClass = catClass+' currently-editing';
        catForm = <CatForm
                    name={cat.name}
                    id={cat.id}
                    color={cat.color}
                    newPoint={cat.newCat}
                    deleteCat={this.deleteCat}
                    saveCat={this.setCat}
                  />;
      }
      if(cat.name && !cat.editing) {
        catItem = <CatItem
                    canDrag = {canDrag}
                    name={cat.name}
                    id={cat.id}
                    deleteCat={this.deleteCat}
                    saveCat={this.setCat}
                  />;
      }
      return (
        <div className={catClass} key={cat.id} >
          {catItem}
          {catForm}

        </div>
      )
    }.bind(this));

    return (
      <div id="category-component" data-disabled={this.state.disabled}>
        <input type="hidden" name="category_data" id="category_data" value={JSON.stringify(this.state.categories)} />
        <div ref="catList">
        {catList}
        </div>
        <div className="footer">
          <a href="#" disabled={this.state.disabled} onClick={this.addACat} className="taxonomy-add-new">+ Add New Category</a>
        </div>
      </div>
    )
  }

})
