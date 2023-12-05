document.addEventListener('DOMContentLoaded', function () {
    const URL = "https://g13.pythonanywhere.com/";
    const rutaBaseImagen = "https://www.pythonanywhere.com/user/G13/files/home/G13/mysite/static/img/";

    fetch(URL + 'productos')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener productos.');
            }
        })
        .then(function (data) {
            const app = Vue.createApp({
                data() {
                    return {
                        productos: data,
                        rutaBaseImagen: rutaBaseImagen
                    };
                },
                mounted() {
                    this.mostrarRutasEnConsola();
                },
                methods: {
                    mostrarRutasEnConsola() {
                        for (let producto of this.productos) {
                            const rutaCompleta = this.rutaBaseImagen + producto.imagen_url;
                            console.log('Ruta de la imagen:', rutaCompleta);
                        }
                    },
                    eliminarProducto(codigo) {
                        if (confirm('¿Estás seguro?')) {
                            fetch(URL + `productos/${codigo}`, { method: 'DELETE' })
                                .then(response => {
                                    if (response.ok) {
                                        this.productos = this.productos.filter(producto => producto.codigo !== codigo);
                                        alert('Producto eliminado');
                                    } else {
                                        throw new Error('Error al eliminar el producto.');
                                    }
                                })
                                .catch(error => {
                                    alert(error.message);
                                });
                        }
                    }
                },
                template: `
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th align="right">Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="producto in productos" :key="producto.codigo">
                                    <td>{{ producto.codigo }}</td>
                                    <td>{{ producto.descripcion }}</td>
                                    <td>{{ producto.cantidad }}</td>
                                    <td style="text-align: right;">{{ parseFloat(producto.precio).toFixed(2) }}</td>
                                    <td><button @click="eliminarProducto(producto.codigo)">Eliminar</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="contedor-centrado">
                            <a href="api.html">Menu Principal</a>
                        </div>
                    </div>
                `
            });

            app.mount('#app');
        })
        .catch(function (error) {
            alert('Error al obtener el Producto');
            console.error('Error:', error);
        });
});
