const URL = "https://g13.pythonanywhere.com/"

fetch(URL + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener productos.')
        }
    })
    .then(function (data) {
        let tablaProductos = document.getElementById('tablaProductos');
        for (let producto of data) {
            let fila = document.createElement('tr');
            fila.innerHTML = '<td>' + producto.codigo + '</td>' + '<td>' + producto.descripcion + '</td>' + '<td align="right">' + producto.cantidad + '</td>' + '<td align="right">' + producto.precio + '</td>' + '<td><img src=static/img/' + producto.imagen_url +'</td>' + '<td align="right">' + producto.proveedor + '</td>';

            tablaProductos.appendChild(fila);
        }
})
    .catch(function (error) {
        alert('Error al agregar el Producto');
        console.error('Error:', error);
    })
