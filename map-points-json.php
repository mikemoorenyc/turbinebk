<?php
require_once("../../../wp-load.php");

$location = get_page_by_title('Location');

$mpoints= get_post_meta( $location->ID, 'map-points', true );
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

$mJson = array();
foreach($mcats as $mc) {
  $points = array();
    $number = 1;
    foreach($mpoints as $mp) {
      $cat = lilSlugMaker($mp['category']);
      $pointArray = array();
      $coor = explode(",", $mp['coordinates']);
      if($cat == $mc['slug']) {
        $pointArray = array(
          'slug' => $cat,
          'name' => $mp['name'],
          'datapoint' => $cat.'-'.$number,
          'lat'=> $coor[0],
          'lng'=> $coor[1]
        );
        array_push($points, $pointArray);
        $number++;
      }
    }
  $catArray = array(
    'slug' => $mc['slug'],
    'points' => $points
  );
  array_push($mJson, $catArray);
}
header('Content-Type: application/json');
echo json_encode($mJson);
?>
