document.addEventListener('DOMContentLoaded', function () {
    const URL = "https://g13.pythonanywhere.com/";

    fetch(URL + 'productos')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener productos.');
            }
        })
        .then(function (data) {
            let tablaProductos = document.getElementById('tablaProductos');
            let tbody = tablaProductos.querySelector('tbody');

            // Limpiar el contenido actual de la tabla
            tbody.innerHTML = '';

            for (let producto of data) {
                // Crear una fila de la tabla con la información del producto
                let fila = document.createElement('tr');
                fila.innerHTML = '<td>' + producto.codigo + '</td>' +
                    '<td>' + producto.descripcion + '</td>' +
                    '<td align="right">' + producto.cantidad + '</td>' +
                    '<td align="right">' + producto.precio + '</td>' +
                    '<td><img src=static/img/' + producto.imagen_url + '</td>' +
                    '<td align="right">' + producto.proveedor + '</td>';
                
                // Agregar la fila a la tabla
                tbody.appendChild(fila);
            }
        })
        .catch(function (error) {
            alert('Error al obtener el Producto');
            console.error('Error:', error);
        });
});
