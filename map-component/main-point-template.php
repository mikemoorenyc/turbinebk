<div id="points-component"></div>
<div id="gmap-container"style="display:none;">
  <div id="theMap" >
    <div id="mapConnector" style="position:absolute; left: 0; top:0; width:100%; height:100%;"></div>

    <div id="search-holder">
      <input type="text" id="search-input" placeholder="Search for a place or address..." />
    </div>

  </div>

</div>

<!--
<script>
window.onbeforeunload = function(){
    var mce = typeof(tinyMCE) != 'undefined' ? tinyMCE.activeEditor : false, title, content;

    if ( mce && !mce.isHidden() ) {
        if ( mce.isDirty() )
            return autosaveL10n.saveAlert;
    } else {
        title = $('#post #title').val(), content = $('#post #content').val();
        if ( ( title || content ) && title + content != autosaveLast )
            return autosaveL10n.saveAlert;
    }

};

</script>-->
