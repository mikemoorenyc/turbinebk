<?php

add_filter('admin_init', 'map_image_setting');

function map_image_setting() {
  wp_enqueue_media();
  register_setting('general', 'main_map_image', 'esc_attr');
  add_settings_field('main_map_image', '<label for="main_map_image">'.__('Map Image' , 'main_map_image' ).'</label>' , 'map_image_selector', 'general');
}

function map_image_selector() {
  $value = get_option( 'main_map_image', '' );
  if(empty($value)) {
    $verb = 'Upload';
    $smimg = '';
    $jv = '';
  } else {
    $verb = 'Change';
    $smimg = wp_get_attachment_image_src($value, 'medium');
    $smimg = $smimg[0];
    $jv = $value;
  }
    ?>
    <div id="map-thumb">

    </div>
    <input type="hidden" id="main_map_image" name="main_map_image" value="<?php echo $value;?>" class="regular-text"/ >
    <button id="map-image-opener" class="button"><?php echo $verb;?> Map Image</button>

    <script>
    jQuery(document).ready(function($){

      function stateUpdater(id,url) {
        if(id) {
          $('#map-image-opener').text('Change Map Image');
        } else {
          $('#map-image-opener').text('Upload Map Image');
        }
        $('input#main_map_image').val(id);
        if(url) {
          $('#map-thumb').html('<img src="'+url+'" style="max-width:100%;"/>').show();
        } else {
          $('#map-thumb').hide();
        }
      }
      stateUpdater('<?php echo $jv;?>', '<?php echo $smimg;?>');
      $('#map-image-opener').click(function(e) {
        e.preventDefault();
        var image = wp.media({
            title: 'Select or Upload a Map Image',
            // mutiple: true if you want to upload multiple files at once
            multiple: false
        }).open()
        .on('select', function(e){
            // This will return the selected image from the Media Uploader, the result is an object
            var uploaded_image = image.state().get('selection').first();
            // We convert uploaded_image to a JSON object to make accessing it easier
            // Output to the console uploaded_image

            var theurl;
            if(typeof(uploaded_image.attributes.sizes.medium) != 'undefined') {
              theurl = uploaded_image.attributes.sizes.medium.url;
            } else {
              theurl = uploaded_image.attributes.sizes.thumbnail.url;
            }
            var image_url = uploaded_image.toJSON().url;
            stateUpdater(uploaded_image.id, theurl);
            // Let's assign the url value to the input field
            //$('#image_url').val(image_url);
        });
      });
    });

    </script>
    <?php

}

?>
