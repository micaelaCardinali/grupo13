const URL = "https://g13.pythonanywhere.com/";

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            descripcion: '',
            cantidad: '',
            precio: '',
            proveedor: '',
            imagen_url: '',
            imagenSeleccionada: null,
            imagenUrlTemp: null,
            mostrarDatosProducto: false,
        };
    },
    methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al obtener datos del Producto');
                    }
                })
                .then(data => {
                    this.descripcion = data.descripcion;
                    this.cantidad = data.cantidad;
                    this.precio = data.precio;
                    this.proveedor = data.proveedor;
                    this.imagen_url = 'https://www.pythonanywhere.com/user/G13/files/home/G13/mysite/static/img/' + data.imagen_url;
                    this.mostrarDatosProducto = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado!');
                });
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file);
        },
        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('descripcion', this.descripcion);
            formData.append('cantidad', this.cantidad);
            formData.append('proveedor', this.proveedor);
            formData.append('precio', this.precio);
            if (this.imagenSeleccionada) {
                formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }
            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al guardar los cambios');
                    }
                })
                .then(data => {
                    alert('Producto Actualizado');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error', error);
                    alert('Error al Actualizar el Producto');
                });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.descripcion = '';
            this.cantidad = '';
            this.proveedor = '';
            this.precio = '';
            this.imagen_url = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
            this.mostrarDatosProducto = false;
        }
    }
});

app.mount('#app');
