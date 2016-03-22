<?php
/**
 * Template Name: Availabilities Page
 */
?>


<?php include 'header.php'; ?>

<ul id="avail-list" class="no-style clearfix">
<?php
$avail = get_post_meta( $post->ID, 'avail-list', true );
function sortByOrder($a, $b) {
  $acleaned = preg_replace("/[^0-9,.]/", "", $a['floor']);
  $acleaned = intval($acleaned);
  $bcleaned = preg_replace("/[^0-9,.]/", "", $b['floor']);
  $bcleaned = intval($bcleaned);
  return $acleaned - $bcleaned;
}
if(!empty($avail)) {
  usort($avail, 'sortByOrder');
  $avail = array_reverse($avail);
  foreach($avail as $a) {
    makeList($a);
  }
}


function makeList($fl) {
  if($fl['hidden'] == 'hidden') {
    return;
  }

  ?>
  <li class="fl-<?php echo intval(preg_replace("/[^0-9]/","",$fl['floor']));?> clearfix">
    <span class="floor"><?php echo $fl['floor'];?></span>
    <span class="area"><?php echo number_format(intval(preg_replace("/[^0-9]/","",$fl['area'])));?></span>
    <span class="availability"><?php echo $fl['availability'];?></span>
  </li>

  <?php
}

?>


</ul>

<?php include 'footer.php'; ?>
