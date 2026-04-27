<?php

include "conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$categoria = $_POST['categoria'];
$precio = $_POST['precio'];
$cantidad = $_POST['cantidad'];

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
    $nombreImagen = basename($_FILES['imagen']['name']);
    $rutaDestino = "../img/" . $nombreImagen;

    move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaDestino);

    $imagenRuta = "img/" . $nombreImagen;

    $sql = "UPDATE productos 
            SET nombre = '$nombre',
                categoria = '$categoria',
                precio = '$precio',
                cantidad = '$cantidad',
                imagen = '$imagenRuta'
            WHERE id = $id";
} else {
    $sql = "UPDATE productos 
            SET nombre = '$nombre',
                categoria = '$categoria',
                precio = '$precio',
                cantidad = '$cantidad'
            WHERE id = $id";
}

if ($conexion->query($sql)) {
    echo "OK";
} else {
    echo "ERROR";
}

?>