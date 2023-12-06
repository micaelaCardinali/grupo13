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
            new Vue({
                el: '#app',
                data: {
                    productos: data,
                    rutaBaseImagen: rutaBaseImagen,
                    carrito: []
                },
                methods: {
                    agregarAlCarrito(codigo) {
                        const productoEnCarrito = this.carrito.find(item => item.codigo === codigo);

                        if (productoEnCarrito) {
                            productoEnCarrito.cantidad++;
                        } else {
                            this.carrito.push({
                                codigo: codigo,
                                cantidad: 1
                            });
                        }
                    },
                    mostrarRutasEnConsola() {
                        for (let producto of this.productos) {
                            const rutaCompleta = this.rutaBaseImagen + producto.imagen_url;
                            console.log('Ruta de la imagen:', rutaCompleta);
                        }
                    },
                    realizarCompra() {
                        // Aquí puedes enviar el carrito al servidor para procesar la compra
                        // Puedes usar fetch() o alguna librería para hacer la petición
                        // Ejemplo: fetch('http://tu-api.com/compra', { method: 'POST', body: JSON.stringify(this.carrito) })
                        console.log('Compra realizada:', this.carrito);
                        this.carrito = []; // Limpiar el carrito después de la compra
                    }
                },
                mounted() {
                    this.mostrarRutasEnConsola();
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
                                <button @click="agregarAlCarrito(producto.codigo)">Agregar al Carrito</button>
                            </div>
                        </div>

                        <div id="carrito-container">
                            <h2>Carrito de Compras</h2>
                            <ul id="carrito-lista">
                                <li v-for="item in carrito" :key="item.codigo">
                                    {{ item.codigo }} x {{ item.cantidad }}
                                </li>
                            </ul>
                            <p id="total">Total: $0.00</p>
                            <button @click="realizarCompra()">Realizar Compra</button>
                        </div>
                    </div>
                `
            });
        })
        .catch(function (error) {
            alert('Error al obtener el Producto');
            console.error('Error:', error);
        });
});
