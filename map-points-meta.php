<?php
function map_points_box() {
  if(basename(get_page_template()) != 'template-location.php') {
    return;
  }
	$screens = array( 'page' );
	foreach ( $screens as $screen ) {
		add_meta_box(
			'map_points_box',
			"Map Points",
			'map_points_callback',
			$screen,
      'normal'
		);
	}
}
add_action( 'add_meta_boxes', 'map_points_box' );

//ADD IN REACT DOM
//ADD SCRIPT
function add_react_script($hook) {
  global $post;
  if(basename(get_page_template()) != 'template-location.php') {
    return;
  }
  if ( !('post.php' == $hook || 'post-new.php' == $hook) ) {
      return;
  }

  wp_enqueue_script( 'react_main', 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.js' );
  wp_enqueue_script( 'react_dom', 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.js' );
}
add_action( 'admin_enqueue_scripts', 'add_react_script' );

function map_points_callback( $post ) {
	// Add a nonce field so we can check for it later.
	wp_nonce_field( 'map_points_data', 'map_points_nonce' );
  echo 'asffas';

}

?>
