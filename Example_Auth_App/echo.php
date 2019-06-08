<?php
    echo "\nREQUEST HEADERS\n";
    foreach (getallheaders() as $name => $value) {
        echo "$name: $value\n";
    }

    echo "\nMethod: " . $_SERVER['REQUEST_METHOD'] . "\n";

    echo "URL: ". $_SERVER['REQUEST_URI'] . "\n";

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        echo "\nPOST PAYLOAD\n";

        foreach ($_POST as $key => $value) {
            echo "$key: $value\n";
        }

        echo "\nEntire BODY\n" . file_get_contents('php://input') . "\n";
    }
?>
