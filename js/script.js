const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (nombre === "" || correo === "") {
        mensaje.textContent = "Por favor completa todos los campos";
        mensaje.style.color = "red";
        return;
    }

    if (!correo.includes("@")) {
        mensaje.textContent = "Correo no válido";
        mensaje.style.color = "red";
        return;
    }

    mensaje.textContent = "Formulario enviado correctamente";
    mensaje.style.color = "green";
    formulario.reset();
});

const contenedorProductos = document.querySelector(".productos");
const tablaProductos = document.getElementById("tablaProductos");

const formProducto = document.getElementById("formProducto");
const productoId = document.getElementById("productoId");
const productoNombre = document.getElementById("productoNombre");
const productoCategoria = document.getElementById("productoCategoria");
const productoPrecio = document.getElementById("productoPrecio");
const productoCantidad = document.getElementById("productoCantidad");
const productoImagen = document.getElementById("productoImagen");

const mensajeProducto = document.getElementById("mensajeProducto");
const btnGuardarProducto = document.getElementById("btnGuardarProducto");

function limpiarTexto(texto) {
    return String(texto).replaceAll("'", "\\'");
}

function cargarProductos() {
    fetch("php/listar.php")
        .then(respuesta => respuesta.json())
        .then(productos => {
            contenedorProductos.innerHTML = "";
            tablaProductos.innerHTML = "";

            productos.forEach(producto => {
                contenedorProductos.innerHTML += `
                    <div class="card">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <p><strong>${producto.nombre}</strong></p>
                        <p>${producto.categoria}</p>
                        <p>$${producto.precio}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                    </div>
                `;

                tablaProductos.innerHTML += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.categoria}</td>
                        <td>$${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>
                            <button class="btn-editar" onclick="editarProducto(
                                ${producto.id},
                                '${limpiarTexto(producto.nombre)}',
                                '${limpiarTexto(producto.categoria)}',
                                ${producto.precio},
                                ${producto.cantidad}
                            )">Editar</button>

                            <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

formProducto.addEventListener("submit", function(e) {
    e.preventDefault();

    $("#btnGuardarProducto").fadeOut(100).fadeIn(300); /*JQUERY DONDE EL BOTÓN TIENE EFECTO DE PARPADEO AL DARLE CLICK*/

    const nombre = productoNombre.value.trim();
    const categoria = productoCategoria.value.trim();
    const precio = productoPrecio.value;
    const cantidad = productoCantidad.value;

    if (nombre === "" || categoria === "" || precio === "" || cantidad === "") {
        mensajeProducto.textContent = "Completa todos los campos obligatorios";
        mensajeProducto.style.color = "red";
        return;
    }

    const datos = new FormData();

    datos.append("id", productoId.value);
    datos.append("nombre", nombre);
    datos.append("categoria", categoria);
    datos.append("precio", precio);
    datos.append("cantidad", cantidad);

    if (productoImagen.files.length > 0) {
        datos.append("imagen", productoImagen.files[0]);
    }

    const archivoPHP = productoId.value === "" ? "php/crear.php" : "php/actualizar.php";

    fetch(archivoPHP, {
        method: "POST",
        body: datos
    })
    .then(respuesta => respuesta.text())
    .then(resultado => {
        console.log(resultado);

        if (resultado.trim() === "OK") {
            mensajeProducto.textContent = productoId.value === ""
                ? "Producto agregado correctamente"
                : "Producto actualizado correctamente";

            mensajeProducto.style.color = "green";
            $("#mensajeProducto").hide().fadeIn(500); // JQUERY DONDE EL MENSAJE TIENE EFECTO DE TRANSICIÓN SUAVE

            formProducto.reset();
            productoId.value = "";
            btnGuardarProducto.textContent = "Guardar producto";

            cargarProductos();
        } else {
            mensajeProducto.textContent = "Error al guardar el producto";
            mensajeProducto.style.color = "red";
        }
    });
});

function editarProducto(id, nombre, categoria, precio, cantidad) {
    productoId.value = id;
    productoNombre.value = nombre;
    productoCategoria.value = categoria;
    productoPrecio.value = precio;
    productoCantidad.value = cantidad;

    btnGuardarProducto.textContent = "Actualizar producto";

    mensajeProducto.textContent = "Editando producto: " + nombre;
    mensajeProducto.style.color = "#2c3e50";

    //JQUERY QUE RESALTA LA FILA AL CLICK EN "EDITAR" PRODUCTO
    $("tr").css("background", "white");
    $(`tr:has(td:contains(${id}))`).css("background", "#d1f0ff");
}

function eliminarProducto(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este producto?");

    if (!confirmar) {
        return;
    }

    const datos = new FormData();
    datos.append("id", id);

    fetch("php/eliminar.php", {
        method: "POST",
        body: datos
    })
    .then(respuesta => respuesta.text())
    .then(resultado => {
        if (resultado.trim() === "OK") {
            mensajeProducto.textContent = "Producto eliminado correctamente";
            mensajeProducto.style.color = "green";

            $("#tablaProductos").fadeOut(200).fadeIn(400); //JQUERY QUE TIENE EFECTO DE PARPADEO AL ELIMINAR

            cargarProductos();
        } else {
            mensajeProducto.textContent = "Error al eliminar el producto";
            mensajeProducto.style.color = "red";
        }
    });
}

cargarProductos();

//JQUERY INTERACTIVO CON TODOS LOS BOTONES QUE REACCIONEN AL MOUSE.

$(document).on("mouseenter", "button", function() {
    $(this).css("opacity", "0.7");
}).on("mouseleave", "button", function() {
    $(this).css("opacity", "1");
});