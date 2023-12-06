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
                    rutaBaseImagen: rutaBaseImagen
                },
                methods: {
                    mostrarRutasEnConsola() {
                        for (let producto of this.productos) {
                            const rutaCompleta = this.rutaBaseImagen + producto.imagen_url;
                            console.log('Ruta de la imagen:', rutaCompleta);
                        }
                    }
                },
                template: `
                    <div class="cards-container">
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
                            </div>
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
