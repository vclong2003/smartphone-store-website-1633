<?php
header('Content-Type: application/json');

function getData($query)
{
    $arr = array();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $result = $conn->query("$query");

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
    }
    $conn->close();
    echo json_encode($arr);
}

function addData($query)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("$query");

    $conn->close();
}

if ($_POST['functionname'] == 'getData') {
    getData($_POST['query']);
} else if ($_POST['functionname'] == "addData") {
    addData($_POST['query']);
}