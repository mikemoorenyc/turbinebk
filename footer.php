</div><!-- #ajax-catcher -->
<footer>


</footer>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script id="inline-scripts"><?php $inlinejs = file_get_contents($siteDir.'/js/inline-load.js'); dirReplacer($inlinejs);?></script>
  <script src="<?php echo $siteDir;?>/js/main.js?v=<?php echo time();?>"></script>

  </body>
</html>
