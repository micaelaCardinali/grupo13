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
                el: '#app', // El ID del contenedor en el HTML
                data: {
                    productos: data
                },
                template: `
                    <div>
                        <div v-for="producto in productos" :key="producto.codigo" class="product-card">
                            <img :src="producto.imagen" :alt="producto.nombre" class="product-img">
                            <div class="product-info">
                                <div>
                                    <p><del>\${{ producto.precio_anterior }}</del></p>
                                    <p>\${{ producto.precio_actual }}</p>
                                    <p>{{ producto.nombre }}</p>
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
