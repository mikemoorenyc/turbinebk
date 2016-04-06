<?php
//GET POST SLUG
global $post;
$slug = $post->post_name;
//GET POST PARENT
//$parentID = $post->post_parent;
//$parentslug = get_post($parentID)->post_name;
//GET THEME DIRECTORY
global $siteDir;
$siteDir = get_bloginfo('template_url');
//GET HOME URL
global $homeURL;
$homeURL = esc_url( home_url( ) );
//DECLARE THE SITE TITLE, SAVE A DB QUERY
global $siteTitle;
$siteTitle = get_bloginfo('name');
//DECLARE THE PAGE EXCERPT
global $siteDesc;
$siteDesc = get_bloginfo('description');
?>
<!DOCTYPE html>
<html lang="en" data-current="<?php echo $slug;?>" class="slug-<?php echo $slug;?>">
<head>

<!-- ABOVE THE FOLD CSS -->
<style><?php $inlinecss = file_get_contents($siteDir.'/css/main.css'); dirReplacer($inlinecss);?></style>


<?php
if ( is_front_page() ) {
  $pageTitle = $siteTitle;
  ?>
  <title><?php echo $siteTitle;?></title>
  <?php
} else {
  $pageTitle = get_the_title();
  ?>

  <title><?php echo $pageTitle;?> | <?php echo $siteTitle;?></title>
  <?php
}
?>

<!-- HERE'S WHERE WE GET THE SITE DESCRIPTION -->
<?php
if ( have_posts() && is_single() OR is_page()):while(have_posts()):the_post();
  if (get_the_excerpt()) {
    $out_excerpt = str_replace(array("\r\n", "\r", "\n", "[&hellip;]"), "", get_the_excerpt());
    //echo apply_filters('the_excerpt_rss', $out_excerpt);
    $siteDesc = $out_excerpt;
  } else {
  //  $siteDesc =  get_bloginfo('description');
  }
  if($siteDesc == '') {
    $siteDesc =  get_bloginfo('description');
  }
endwhile;
else: ?>

<?php endif; ?>
<meta name="description" content="<?php echo $siteDesc;?>" />

<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">


<?php wp_site_icon();?>

<?php
//GET THE SOCIAL IMG
$socialImg = '';
$headerGal = get_post_meta( $post->ID, 'header-gallery', true );
if(!empty($headerGal)) {
  $theImg = $headerGal[0];
  $socialImg = wp_get_attachment_image_src($theImg['image'], 'fake-full');
  $socialImg = $socialImg[0];

} else {
  //GET THE DEFAULT SOCIAL IMG
  $socialImg = $siteDir."/assets/imgs/social-fallback.jpg";
}

 ?>

<?php
// DECLARE THE NAV ITEMS
$navItems = array();
$pages = get_pages(array(
  'sort_column' => 'menu_order'
));

foreach($pages as $p) {
  array_push($navItems,array(
    'title' => $p->post_title,
    'url' => get_permalink($p),
    'class' => $p->post_name
  ));
}

?>




<meta property="og:site_name" content="<?php echo $siteTitle;?>" />
<meta property="og:title" content="<?php echo $pageTitle;?> | <?php echo $siteTitle;?>" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo $homeURL;?>" />
<meta property="og:image" content="<?php echo $socialImg;?>" />
<meta property="og:description" content="<?php echo $siteDesc;?>" />

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo $pageTitle;?>">
<meta name="twitter:description" content="<?php echo $siteDesc;?>">
<meta name="twitter:image" content="<?php echo $socialImg;?>">


</head>

<body id="top">
<div id="css-checker"></div>
<div id="app-wrap">
<div id="header">
  <h1 class="logo">
    <span class="hide">Turbine</span>
  </h1>

  <nav id="top-menu">

    <ul class="no-style">
      <?php
      foreach($navItems as $ni) {
        ?>
          <li class="header-nav-item <?php echo $ni['class']?>">
            <a href="<?php echo $ni['url'];?>">
              <?php echo $ni['title'];?>
            </a>
          </li>

        <?php
      }
      ?>


    </ul>
  </nav>

</div>
<div id="ajax-catcher">
  <div id="main-content-container" data-slug="<?php echo $slug;?>">

    <?php
    //HeaderGal
    $headerGal = get_post_meta( $post->ID, 'header-gallery', true );
    if(!empty($headerGal)) {
      ?>
      <div id="header-gallery" data-section='<?php echo $slug;?>'>
      <div class="container">
        <?php
        foreach($headerGal as $hg) {
          $bigimg = wp_get_attachment_image_src($hg['image'], 'fake-full');
          $smimg = wp_get_attachment_image_src($hg['image'], 'medium');
          $alt = get_the_title($hg['image']);
          if(!empty($hg['caption'])) {
            $alt = $hg['caption'];
          }
          ?>
          <div class="slide">
            <div class="img-holder">

              <img src="<?php echo $bigimg[0];?>"  alt="<?php echo $alt;?>" srcset="<?php echo $bigimg[0];?> <?php echo $bigimg[1];?>w, <?php echo $smimg[0];?> <?php echo $smimg[1];?>w" sizes="100vw">
            <!--  <picture>
                  <source srcset="<?php echo $smimg[0];?>" media="(max-width: 800px)">
                  <source srcset="<?php echo $bigimg[0];?>">
                  <img src="<?php echo $bigimg[0];?>" srcset="<?php echo $bigimg[0];?>" alt="My default image">
              </picture>-->
            </div>

            <?php
            if(!empty($hg['caption'])) {
              ?>
              <div class="caption">
                <?php echo $hg['caption'];?>
              </div>
              <?php
            }

            ?>

          </div>
          <?php
        }


        ?>

      </div>
      </div>


      <?php
    }



    ?>
