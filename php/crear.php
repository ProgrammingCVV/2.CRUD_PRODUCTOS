<?php

include "conexion.php";

$nombre = $_POST['nombre'];
$categoria = $_POST['categoria'];
$precio = $_POST['precio'];
$cantidad = $_POST['cantidad'];

$imagenRuta = "";

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
    $nombreImagen = basename($_FILES['imagen']['name']);
    $rutaDestino = "../img/" . $nombreImagen;

    move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaDestino);

    $imagenRuta = "img/" . $nombreImagen;
}

$sql = "INSERT INTO productos (nombre, categoria, precio, cantidad, imagen)
VALUES ('$nombre', '$categoria', '$precio', '$cantidad', '$imagenRuta')";

if ($conexion->query($sql)) {
    echo "OK";
} else {
    echo "ERROR";
}

?>