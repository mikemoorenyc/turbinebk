<?php

//MAP POINTS
$mpoints= get_post_meta( $post->ID, 'map-points', true );

//CREATE CATEGORIES
$mcats = array();
foreach($mpoints as $mp) {
  $cat = lilSlugMaker($mp['category']);
  $in = false;
  foreach($mcats as $mc) {
    if($mc['slug'] == $cat) {
      $in = true;
    }
  }
  if($in == false) {
    array_push($mcats, array('title' => $mp['category'], 'slug'=> $cat));
  }
}
//MAKE THE SELECTOR
?>
  <div class="map-selector">
    <div class="selected-text"><?php echo $mcats[0]['title'];?></div>
    <select>
      <?php
      $selected = 'selected';
      foreach($mcats as $mc) {
        ?>
        <option value='<?php echo $mc['slug'];?>' <?php echo $selected;?>>

          <?php echo $mc['title'];?>
        </option>

        <?php
        $selected= '';
      }
      ?>
    </select>
  </div>

<div id="location-points">
  <?php
  $selected = 'selected';
  foreach($mcats as $mc) {
    ?>
    <ul data-cat="<?php echo $mc['slug'];?>" class="point-list <?php echo $selected;?>">
      <?php
      $number = 1;
      foreach($mpoints as $mp) {
        $cat = lilSlugMaker($mp['category']);
        if($cat == $mc['slug']) {
          ?>
          <li class="mpoint" data-point="<?php echo $cat.'-'.$number;?>">
            <?php echo $mp['name'];?>
          </li>
          <?php
          $number++;
        }
      }

      ?>
    </ul>
    <?php
    $selected="";
  }




  ?>



</div>
