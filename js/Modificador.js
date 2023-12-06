console.log('Script de Vue ejecutándose...');
import { createApp } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.js';

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
        async obtenerProducto() {
            try {
                console.log('Obteniendo producto...');
                const response = await fetch(URL + 'productos/' + this.codigo);

                if (!response.ok) {
                    console.error('Error en la respuesta del servidor:', response.status, response.statusText);
                    throw new Error('Error al obtener datos del Producto');
                }

                const data = await response.json();
                this.descripcion = data.descripcion;
                this.cantidad = data.cantidad;
                this.precio = data.precio;
                this.proveedor = data.proveedor;
                this.imagen_url = data.imagen_url;
                console.log('URL de la imagen:', 'https://www.pythonanywhere.com/user/G13/files/home/G13/mysite/static/img/' + this.imagen_url);
                this.mostrarDatosProducto = true;
            } catch (error) {
                console.log(error);
                alert('Hubo un error al obtener los datos del producto. Por favor, inténtelo de nuevo.');
            }
        },

        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file);
        },

        async guardarCambios() {
            try {
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

                const response = await fetch(URL + 'productos/' + this.codigo, {
                    method: 'PUT',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Error al guardar los cambios');
                }

                const data = await response.json();
                alert('Producto actualizado correctamente.');
                this.limpiarFormulario();
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                alert('Hubo un error al actualizar el producto. Por favor, inténtelo de nuevo.');
            }
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
