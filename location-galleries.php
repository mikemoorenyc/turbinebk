<?php
//LOCATION GALLERIES
$lgals= get_post_meta( $post->ID, 'location-galleries', true );
$lcats = array();

foreach($lgals as $lg) {
  $cat = lilSlugMaker($lg['category']);
  $in = false;
  foreach($lcats as $lc) {
    if($lc['slug'] == $cat) {
      $in = true;
    }
  }
  if($in == false) {
    array_push($lcats, array('title' => $lg['category'], 'slug'=> $cat));
  }
}

foreach($lcats as $lc) {
  ?>
  <h2><?php echo $lc['title'];?></h2>
  <?php
  foreach($lgals as $lg) {
    //imgMaker($lg, $lc['slug']);
  }
}

function imgMaker($obj, $cat) {

  $imgCat = lilSlugMaker($obj['category']);
  if($imgCat != $cat) {
    return;
  }
  $bigimg = wp_get_attachment_image_src($obj['image'], 'fake-full');
  $smimg = wp_get_attachment_image_src($obj['image'], 'medium');
  $alt = get_the_title($obj['image']);
  if(!empty($obj['caption'])) {
    $alt = $obj['caption'];
  }
  ?>
  <div class="slide">
    <div class="img-holder">

      <img src="<?php echo $bigimg[0];?>"  alt="<?php echo $alt;?>" srcset="<?php echo $bigimg[0];?> <?php echo $bigimg[1];?>w, <?php echo $smimg[0];?> <?php echo $smimg[1];?>w" sizes="100vw">
    </div>

    <?php
    if(!empty($obj['caption'])) {
      ?>
      <div class="caption">
        <?php echo $obj['caption'];?>
      </div>
      <?php
    }

    ?>

  </div>
  <?php
}
?>
