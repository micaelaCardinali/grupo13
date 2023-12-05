document.addEventListener('DOMContentLoaded', function () {
    const URL = "https://g13.pythonanywhere.com/";

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
                    productos: data
                },
                template: `
                    <div>
                        <div v-for="producto in productos" :key="producto.codigo" class="product-card">
                            <img :src="constructImageUrl(producto.imagen_url)" :alt="producto.descripcion" class="product-img">
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
                `,
                methods: {
                    constructImageUrl(imagenUrl) {
                        const baseUrl = 'https://www.pythonanywhere.com/user/G13/files/home/G13/mysite/static/img/';
                        const fullUrl = baseUrl + imagenUrl;
                        console.log('Ruta de la imagen:', fullUrl);
                        return fullUrl;
                    }
                }
            });
        })
        .catch(function (error) {
            alert('Error al obtener el Producto');
            console.error('Error:', error);
        });
});
