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

function addNewBrand($brandName, $brandDescription)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($brandDescription == "") {
        $sql = "INSERT INTO `brand`(`brandName`) VALUES ('$brandName')";
    } else {
        $sql = "INSERT INTO `brand`(`brandName`, `Description`) VALUES ('$brandName', '$brandDescription')";
    }
    $conn->query($sql);
    $conn->close();
}

function addNewCategory($categoryName)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO `category`(`categoryName`) VALUES ('$categoryName')";

    $conn->query($sql);
    $conn->close();
}
function addNewProduct($catID, $brandID, $name, $description, $imageUrl, $price, $quantity)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartphonestoredb";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO `product`(`catID`, `brandID`, `Name`, `Description`, `ImageUrl`, `Price`, `quantity`) VALUES ('$catID', '$brandID', '$name', '$description', '$imageUrl', '$price', '$quantity')";

    $conn->query($sql);
    $conn->close();
}

if ($_POST['functionname'] == 'getData') {
    getData($_POST['query']);
} else if ($_POST['functionname'] == "addData") {
    addData($_POST['query']);
}