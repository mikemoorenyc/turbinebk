<div id="points-component"></div>
<div id="gmap-container"style="display:none;">
  <div id="theMap" >
    <div id="mapConnector" style="position:absolute; left: 0; top:0; width:100%; height:100%;"></div>

    <div id="search-holder">
      <input type="text" id="search-input" placeholder="Search for a place or address..." />
    </div>

  </div>

</div>
<?php
$cats = get_post_meta( $post->ID, 'map_categories', true );



if(empty($cats)) {
  $cats = "[{id: 1,name: 'Test 1',color: '#cc0000',}]";
}
$points = get_post_meta( $post->ID, 'map_points', true );

if(empty($points)) {
  $points = '[]';
}

?>


<script>
var APP = {};
var INITIALPOINTS = <?php echo $points;?>;

var INITIALCATEGORIES = <?php echo $cats;?>;
var SVGLOCATION = '<?php echo get_bloginfo('description');?>/assets/svgs.svg';
<?php include 'plain.js';?>
<?php include 'initiator.js';?>
<?php include 'build.js';?>
</script>
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

</script>
