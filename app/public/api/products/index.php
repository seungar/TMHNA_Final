<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT id, brand_name, prod_name, price, prod_type from brands left outer join products on brands.brand_name = products.brand';
$vars = [];

if (isset($_GET['brand'])) {
    // This is an example of a parameterized query
      $sql = 'SELECT id, brand_name, prod_name, price, prod_type 
      FROM brands left outer join products on brands.brand_name = products.brand WHERE id = ?';
      $vars = [ $_GET['brand']];
  }

// if (isset($_GET['brand'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM products WHERE brand = ?';
//   $vars = [ $_GET['brand'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;