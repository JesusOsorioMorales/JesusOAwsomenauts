<?php
require_once(__DIR__ . "/../model/config.php");

$exp = filter_input(INPUT__POST, "exp", FILTER_SANTIZE_STRING);
$exp1 = filter_input(INPUT__POST, "exp1", FILTER_SANTIZE_STRING);
$exp2 = filter_input(INPUT__POST, "exp2", FILTER_SANTIZE_STRING);
$exp3 = filter_input(INPUT__POST, "exp3", FILTER_SANTIZE_STRING);
$exp4 = filter_input(INPUT__POST, "exp4", FILTER_SANTIZE_STRING);



$query = $_SESSION["connection"]->query("UPDATE user SET"
        . "exp = $exp, "
        . " exp1 = $exp1, "
        . " exp2 = $exp2, "
        . " exp3 = $exp3, "
        . " exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");

if($query){
    echo "true";
}else{
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}