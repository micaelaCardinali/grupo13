// Importa la versión de producción de Vue.js
import { createApp } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.prod.js';

const URL = "https://g13.pythonanywhere.com/";

const app = createApp({
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
                    return response.json();  // Devuelve la promesa de JSON
                } else {
                    throw new Error('Error al obtener datos del Producto');
                }
            })
            .then(data => {
                return data;
            })
                .then(data => {
                    this.descripcion = data.descripcion;
                    this.cantidad = data.cantidad;
                    this.precio = data.precio;
                    this.proveedor = data.proveedor;
                    this.imagen_url = data.imagen_url;
                    this.mostrarDatosProducto = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Hubo un error al obtener los datos del producto. Por favor, inténtelo de nuevo.');
                });
        },        
        descargarImagen(url) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                this.imagen_url = url;
            };
            img.src = url;
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file);
        },        
        guardarCambios() {
            console.log('Guardando cambios...');
            if (this.imagenSeleccionada && this.imagenSeleccionada.size > MAX_FILE_SIZE) {
                alert('El tamaño del archivo de imagen es demasiado grande. Por favor, seleccione un archivo más pequeño.');
                return;
            }
        
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
                    alert('Producto actualizado correctamente.');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error', error);
                    alert('Hubo un error al actualizar el producto. Por favor, inténtelo de nuevo.');
                });
        },
        computed: {
            imagenCompleta() {
                return URL + 'static/img/' + this.imagen_url;
            },
            // ... otras propiedades computadas
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

// Monta la aplicación en el elemento con el ID 'app'
app.mount('#app');
