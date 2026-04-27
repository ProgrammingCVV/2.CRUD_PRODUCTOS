<?php

$host = "localhost";
$user = "root";
$password = "===============";
$database = "supermercado_db";
$port = "3308";

$conexion = new mysqli($host, $user, $password, $database, $port);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");

?>
