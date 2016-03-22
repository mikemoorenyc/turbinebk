<?php
/**
 * Template Name: Contact Page
 */
?>


<?php include 'header.php'; ?>


  <h1 class="big-heading">Contact Us</h1>

  <?php

  $contacts = get_post_meta( $post->ID, 'contact-list', true );
  if(!empty($contacts)) {
    ?>
    <ul id="contact-list" class="clearfix no-style">
      <?php
      function contactMaker($data, $field, $class) {
        if(empty($data)) {
          return;
        }
        if($class == 'email') {
          if(is_email($data) === false) {
            return;
          }
          ?>
          <div class="<?php echo $class;?>"><?php echo $field;?><a href="mailto:<?php echo $data;?>"><?php echo $data;?></a></div>
          <?php
          return;
        }

        ?>
        <div class="<?php echo $class;?>"><?php echo $field;?><?php echo $data;?></div>
        <?php
      }
      foreach($contacts as $c) {
        ?>
        <li>
          <div class="name"><?php echo $c['name'];?></div>
          <?php contactMaker($c['title'],'','title');?>
          <?php contactMaker($c['telephone'],'T ','telephone');?>
          <?php contactMaker($c['email'],'E ','email');?>
        </li>

        <?php
      }


      ?>


    </ul>


    <?php



  }

  ?>

  <div id="contact-form">
    <form>
      <div class="row">
        <label for="full_name">Full Name</label>
        <input type="text" id="full_name" name="full_name" />
      </div>
      <div class="row">
        <label for="email">Email Address</label>
        <input type="text" id="email" name="email" />
      </div>
      <div class="row">
        <label for="phone">Phone Number</label>
        <input type="text" id="phone" name="phone" />
      </div>
      <div class="row">
        <label for="message">Message</label>
        <textarea id="message" name="message"></textarea>
      </div>
    </form>

  </div>

  <?php
  function downloadMaker($data) {
    ?>
    <h2>Downloads</h2>
    <ul id="download-list" class="clearfix no-style">
      <?php
      foreach($data as $d) {
        ?>
        <li>
          <a href="<?php echo wp_get_attachment_url( $d['file'], 'full' );?>" target="_blank">
            <span class="svg-holder">

            </span>
            <span class="title">
              <?php echo $d['title'];?>
            </span>
          </a>

        </li>
        <?php
      }

      ?>

    </ul>


    <?php
  }
  $downloads = get_post_meta( $post->ID, 'downloads', true );
  if(!empty($downloads)) {
    downloadMaker($downloads);
  }
  ?>



<?php include 'footer.php'; ?>
