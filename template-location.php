<?php
/**
 * Template Name: Location Page
 */
?>


<?php include 'header.php'; ?>
<!--
<?php include 'location-galleries.php';?>


<?php include 'location-map.php';?>
-->

<?php
//GET THE MAP
$map = get_option( 'main_map_image', '' );
$imgmeta = wp_get_attachment_image_src($map, 'full');
$imgsrc = $imgmeta[0];
$imgw = $imgmeta[1];
$imgh = $imgmeta[2];

//MAP
//CATEGORIES
$catCounter = 0;
$pointCounter = 1;
$cats = json_decode(get_post_meta( $post->ID, 'map_categories', true ));
$points = json_decode(get_post_meta( $post->ID, 'map_points', true ));

if(empty($cats) || empty($points)) {
  echo '[]';
  exit();
}
$catWPoints = array();
foreach($cats as $c) {
  $id = $c->id;
  $catSchema = array(
    'id' => $c->id,
    'color' => $c->color,
    'name' =>$c->name
  );
  $pointsArray = array();
  foreach($points as $p) {
    if (intval($p->cat) == intval($id)) {
      array_push($pointsArray, $p);
    }
  }
  if(!empty($pointsArray)) {
    $catSchema['points'] = $pointsArray;
    array_push($catWPoints, $catSchema);
  }
}


?>
<div id="map-categories">
  <?php
  foreach($catWPoints as $c) {
    ?>
    <button data-cat="<?php echo $c['id'];?>" ><?php echo $c['name'];?></button>

    <?php
  }

  ?>

  <button data-cat="all">View All</button>
</div>

<div id="map-apparatus" style="padding-top: <?php echo ($imgh/$imgw)*100; ?>%; position:relative; width: 100%; height: 0;">
  <div class="sizer" style="position:absolute; width:100%; height:100%; position: absolute; left: 0; top: 0; pointer-events:none"></div>
  <img id="map-img" src="<?php echo $imgsrc;?>" data-w="<?php echo $imgw;?>" data-h="<?php echo $imgh;?>"/>

  <div id="map-overlay">
    <?php
    foreach($catWPoints as $c) {
      foreach($c['points'] as $p) {
        ?>
        <div class="map-point" data-cat="<?php echo $c['id'];?>" style="left:<?php echo round(($p->coor->x)*100,2);?>%; top: <?php echo round(($p->coor->y)*100,2);?>%">
          <div class="number">
            <?php echo $pointCounter;?>
          </div>

          <div class="title-point">
            <span><?php echo $p->title;?></span>
          </div>
        </div>
        <?php
        $pointCounter++;
      }
    }


    ?>

  </div>

</div>
<div id="map-controls">
  <button class="in">Zoom In</button>
  <button class="out">Zoom Out</button>
</div>
<style>
<?php
//CREATE STYLES
foreach($catWPoints as $c) {
  ?>
  #map-categories button[data-cat="<?php echo $c['id'];?>"] {
    border-color: <?php echo $c['color'];?>;
  }
  #map-overlay .map-point[data-cat="<?php echo $c['id'];?>"] .number {
    background-color: <?php echo $c['color'];?>;
  }
  #map-overlay .map-point[data-cat="<?php echo $c['id'];?>"] .title-point, #map-overlay .map-point[data-cat="<?php echo $c['id'];?>"] .title-point:before {
    border-color: <?php echo $c['color'];?>;
  }
  #map-overlay .map-point[data-cat="<?php echo $c['id'];?>"] .title-point span {
    color: <?php echo $c['color'];?>;
  }

  <?php
}

?>

</style>
<?php include 'footer.php'; ?>
