<?php

include "conexion.php";

$id = $_POST['id'];

$sql = "DELETE FROM productos WHERE id = $id";

if ($conexion->query($sql)) {
    echo "OK";
} else {
    echo "ERROR";
}

?>