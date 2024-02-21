<?php
require_once 'vendor/autoload.php'; // Include the Facebook PHP SDK

$fb = new Facebook\Facebook([
    'app_id' => '{your-app-id}',
    'app_secret' => '{your-app-secret}',
    'default_graph_version' => 'v10.0',
]);

$helper = $fb->getRedirectLoginHelper();

$permissions = ['email']; // Optional permissions
$loginUrl = $helper->getLoginUrl('https://your-callback-url.com/callback.php', $permissions);

// Redirect the user to the Facebook login URL
header('Location: ' . $loginUrl);
exit();
?>