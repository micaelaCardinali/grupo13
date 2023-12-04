const URL = ""

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();
})

    var formData = new FormData();
    formData.append('codigo', document.getElementById('codigo').value);
    formData.append('descripcion', document.getElementById('descripcion').value);
    formData.append('cantidad', document.getElementById('cantidad').value);
    formData.append('precio', document.getElementById('precio').value);
    formData.append('imagen', document.getElementById('imagen').files[0]);
    formData.append('proveedor', document.getElementById('proveedor').value);


    fetch(URL + 'productos',{
        method: 'POST',
        body: formData
    })