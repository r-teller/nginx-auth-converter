<?php
    session_start();
    if ($_SESSION['valid'] == true) {
        unset($_SESSION["username"]);
        unset($_SESSION["valid"]);
        header('Refresh: 2; URL = login.php');
        echo 'Your session has been cleaned';
    } else {
        header('Refresh: 2; URL = login.php');
        echo 'You do not have a session to clean';
    }
?>
