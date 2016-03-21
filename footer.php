
</div><!-- #main-content-container-->
</div><!-- #ajax-catcher -->
<footer>
  <div class="footer-logo">

  </div>

  <ul id="footer-nav" class="no-style clearfix">
    <?php
    foreach($navItems as $ni) {
      ?>
        <li class="footer-nav-item <?php echo $ni['class']?>">
          <a href="<?php echo $ni['url'];?>">
            <?php echo $ni['title'];?>
          </a>
        </li>

      <?php
    }
    ?>

  </ul>

  <?php
  $socialArray = array();
  $socialOptions = array(
    array(
      'class' => 'linkedin',
      'value' => get_option( 'linked_in_url', '' )
    ),
    array(
      'class' => 'facebook',
      'value' => get_option( 'facebook_url', '' )
    ),
    array(
      'class' => 'twitter',
      'value' => get_option( 'twitter_url', '' )
    ),
  );
  foreach($socialOptions as $so) {
    if(!empty($so['value'])) {
      array_push($socialArray, array(
        'class' => $so['class'],
        'value' => $so['value']
      ));
    }
  }
  if(!empty($socialArray)) {
    ?>
    <ul id="footer-social" class="no-style clearfix">
      <?php
      foreach($socialArray as $sa) {
        ?>
        <li class="<?php echo $sa['class'];?>">
          <a href="<?php echo $sa['value'];?>" target="_blank">

            <?php echo $sa['class'];?>
          </a>

        </li>

        <?php
      }


      ?>

    </ul>

    <?php
  }


  ?>

  <div id="footer-credentials">
    <a href="http://realestatearts.com" target="_blank">Designed &amp; Developed by REA</a>
  </div>

</footer>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script id="inline-scripts"><?php $inlinejs = file_get_contents($siteDir.'/js/inline-load.js'); dirReplacer($inlinejs);?></script>
  <script src="<?php echo $siteDir;?>/js/main.js?v=<?php echo time();?>"></script>

  </body>
</html>
