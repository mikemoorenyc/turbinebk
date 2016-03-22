<?php
/**
 * Template Name: Team Page
 */
?>


<?php include 'header.php'; ?>

<?php
$team = get_post_meta( $post->ID, 'team-list', true );

if(!empty($team)) {
  ?>
  <ul id="team-list" class="no-style clearfix">
  <?php
  foreach($team as $t) {
    teamGuy($t);
  }
  ?>
  </ul>
  <?php
}

function teamGuy($t) {

  ?>
  <li class="team-member clearfix">
    <?php
    if(empty($t['logo'])) {
      $class = 'no-img';
    } else {
      $class= "";
    }

    ?>
    <div class="logo <?php echo $class;?>">
      <?php
      if(!empty($t['url'])) {
        ?>
        <a href="<?php echo $t['url'];?>" target="_blank">
        <?php
      }
      ?>
      <h2>
        <?php
        if(!empty($t['logo'])) {
          ?>
          <img src="<?php echo wp_get_attachment_image_src($t['logo'], 'medium')[0];?>" alt="<?php echo $t['company-name'];?>" />
          <?php
        }

        ?>
        <span class="name"><?php echo $t['company-name'];?></span>
      </h2>

      <?php
      if(!empty($t['url'])) {
        ?>
        <span class="url">
          <?php echo str_replace("http://","",$t['url']); ?>

        </span>

        <?php
        echo '</a>';
      }
      ?>

    </div>

    <div class="copy-block">
      <?php echo $t['copy'];?>
    </div>


  </li>

  <?php
}


?>


<?php include 'footer.php'; ?>
