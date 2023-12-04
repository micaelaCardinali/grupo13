const URL = "https://g13.pythonanywhere.com/";

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('codigo', document.getElementById('codigo').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('cantidad', document.getElementById('cantidad').value);
    formData.append('precio', document.getElementById('precio').value);
    formData.append('imagen', document.getElementById('imagen').files[0]);
    formData.append('proveedor', document.getElementById('proveedor').value);

    fetch(URL + 'productos', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al agregar producto.');
        }
    })
    .then(function () {
        alert('Producto agregado Correctamente!');
        // Limpiar los campos después de un envío exitoso
        document.getElementById('codigo').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('cantidad').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('imagen').value = ""; // El input de tipo archivo no se puede limpiar completamente por razones de seguridad.
        document.getElementById('proveedor').value = "";
    })
    .catch(function (error) {
        alert('Error al agregar producto.');
        console.error('Error', error);
    });
});
