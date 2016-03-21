<?php

//ADD FOOTER COPY SETTING
add_filter('admin_init', 'social_media_links');
function social_media_links() {
  linked_in_url();
  facebook_url();
  twitter_url();
}
function linked_in_url()
{
    register_setting('general', 'linked_in_url', 'esc_attr');
    add_settings_field('linked_in_url', '<label for="linked_in_url">'.__('Linkedin URL' , 'linked_in_url' ).'</label>' , 'linked_in_editor', 'general');
}
function linked_in_editor()
{
    $value = get_option( 'linked_in_url', '' );
    echo '<input type="text" id="linked_in_url" name="linked_in_url" value="' . $value . '" class="regular-text"/ >';
}

function facebook_url()
{
    register_setting('general', 'facebook_url', 'esc_attr');
    add_settings_field('facebook_url', '<label for="facebook_url">'.__('Facebook URL' , 'facebook_url' ).'</label>' , 'facebook_editor', 'general');
}
function facebook_editor()
{
    $value = get_option( 'facebook_url', '' );
    echo '<input type="text" id="facebook_url" name="facebook_url" value="' . $value . '" class="regular-text"/ >';
}
function twitter_url()
{
    register_setting('general', 'twitter_url', 'esc_attr');
    add_settings_field('twitter_url', '<label for="twitter_url">'.__('Twitter URL' , 'twitter_url' ).'</label>' , 'twitter_editor', 'general');
}
function twitter_editor()
{
    $value = get_option( 'twitter_url', '' );
    echo '<input type="text" id="twitter_url" name="twitter_url" value="' . $value . '" class="regular-text"/ >';
}
?>
