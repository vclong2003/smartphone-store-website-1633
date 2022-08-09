<?php
header('Content-Type: application/json');

function queryMySql($tableName)
{
    $arr = array();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT * FROM $tableName";
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


if ($_POST['functionname'] == "queryMySql") {
    queryMySql($_POST['tableName']);
} else if ($_POST['functionname'] == "queryCategory") {
    queryMySql('category');
}