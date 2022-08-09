<?php
header('Content-Type: application/json');

function getBrandName()
{
    $arr = array();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM brand";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
    } else {
        echo "0 results";
    }
    $conn->close();
    echo json_encode($arr);
}

if ($_POST['functionname'] == "queryBrand") {
    getBrandName();
} else if ($_POST['functionname'] == "test") {
    echo json_encode($_POST['param']);
}