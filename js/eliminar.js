const URL = "https://g13.pythonanywhere.com/";

new Vue({
    el: '#app',
    data() {
        return {
            productos: [],
            rutaBaseImagen: "https://www.pythonanywhere.com/user/G13/files/home/G13/mysite/static/img/"
        };
    },
    mounted() {
        this.obtenerProductos();
    },
    methods: {
        obtenerProductos() {
            fetch(URL + 'productos')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al obtener productos.');
                    }
                })
                .then(data => {
                    this.productos = data;
                    this.mostrarRutasEnConsola();
                })
                .catch(error => {
                    alert('Error al obtener productos.');
                    console.error('Error:', error);
                });
        },
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
            <div v-for="producto in productos" :key="producto.codigo" class="product-card">
                <img :src="rutaBaseImagen + producto.imagen_url" :alt="producto.descripcion" class="product-img">
                <div class="product-info">
                    <div>
                        <p>\${{ producto.precio }}</p>
                        <p>{{ producto.descripcion }}</p>
                    </div>
                    <figure>
                        <img src="./assets/icons/agregarCarrito.png" alt="">
                    </figure>
                    <button @click="eliminarProducto(producto.codigo)">Eliminar</button>
                </div>
            </div>
        </div>
    `
});
