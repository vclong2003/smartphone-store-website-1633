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
} else if ($_POST['functionname'] == "addNewBrand") {
    addNewBrand($_POST['brandName'], $_POST['brandDescription']);
} else if ($_POST['functionname'] == "addNewCategory") {
    addNewCategory($_POST['categoryName']);
} else if ($_POST['functionname'] == "addNewProduct") {
    addNewProduct($_POST['catID'], $_POST['brandID'], $_POST['name'], $_POST['description'], $_POST['imageUrl'], $_POST['price'], $_POST['quantity']);
}