<?php


add_action( 'show_user_profile', 'admin_check_off' );
add_action( 'edit_user_profile', 'admin_check_off' );
function admin_check_off( $user ) { ?>



  <?php
  $su = get_the_author_meta( '_super_user', $user->ID );
  if ($su == 'yes') {
    $checked = 'checked';
  }  else {
    $checked = '';
  }
  ?>



  <table class="form-table">
<tbody><tr >
	<th><label for="_super_user">Super User?</label></th>
	<td><input type="checkbox" name="_super_user" value="yes" <?php echo $checked;?>>
		</td>
</tr>


</tbody></table>

<?php }



add_action( 'personal_options_update', 'save_admin_check_off' );
add_action( 'edit_user_profile_update', 'save_admin_check_off' );

function save_admin_check_off( $user_id ) {

	if ( !current_user_can( 'edit_user', $user_id ) )
		return false;

	/* Copy and paste this line for additional fields. Make sure to change 'twitter' to the field ID. */
	update_usermeta( $user_id, '_super_user', $_POST['_super_user'] );
}

?>

<?php
add_action('admin_head', 'userhide');
function userhide() {
  ?>
<style>
#wpfooter, #ninja_forms_selector {
  display: none !important;

}
</style>
  <?php
  global $current_user;

      $super_user_status = get_the_author_meta( '_super_user', $current_user->ID );
      if($super_user_status!== 'yes') {
        ?>
        <!-- HIDE EVERYTHING -->
        <style>
        #wp-admin-bar-top-secondary, #wp-admin-bar-wp-logo, #wp-admin-bar-comments, #wp-admin-bar-new-content, #adminmenu > li, #welcome-panel, #dashboard-widgets-wrap {
          display: none !important;
        }

        #adminmenu > li#toplevel_page_ninja-forms, #adminmenu > li#menu-posts-press {
          display:block !important;
        }

        </style>

        <?php
      }
}
?>
