<?php
require_once('../../../../wp-blog-header.php');

$pageid = $_GET['location_id'];

$cats = json_decode(get_post_meta( $pageid, 'map_categories', true ));
$points = json_decode(get_post_meta( $pageid, 'map_points', true ));

if(empty($cats) || empty($points)) {
  echo '[]';
  exit();
}
$catWPoints = array();
foreach($cats as $c) {
  $id = $c->id;
  $catSchema = array(
    'id' => $c->id,
    'color' => $c->color
  );
  $pointsArray = array();
  foreach($points as $p) {
    if (intval($p->cat) == intval($id)) {
      array_push($pointsArray, $p);
    }
  }
  $catSchema['points'] = $pointsArray;
  array_push($catWPoints, $catSchema);
}
echo json_encode($catWPoints);



?>
