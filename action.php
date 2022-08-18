<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "smartphonestoredb";

function getData($query)
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);

    $result = $conn->query("$query");

    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    $conn->close();
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
    echo json_encode("done");
}

function fetchAllProducts()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);
    $result = $conn->query("SELECT `product`.*, `brand`.`brandName` FROM `product` INNER JOIN `brand` ON `product`.`brandID` = `brand`.`brandID` ORDER BY `product`.`Price` DESC;");
    if ($result->num_rows > 0) {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
    $conn->close();
}

if ($_POST['functionname'] == 'getData') {
    getData($_POST['query']);
} else if ($_POST['functionname'] == "addData") {
    addData($_POST['query']);
} else if ($_POST['functionname'] == 'fetchAllProducts') {
    fetchAllProducts();
}