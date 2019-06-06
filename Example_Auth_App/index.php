<?php
    session_start();
    if ($_SESSION['valid'] == true) {
        echo phpinfo();
    } else {
        header('Refresh: 5; URL = login.php');
        echo 'You are not authorized to view this page';
    }
?>
