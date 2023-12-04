const URL = "https://g13.pythonanywhere.com/productos"
const app = Vue.createApp({
    data() {
        return{
            productos: []
        }
    },
    methods: {
        obtenerProductos() {
            fetch(URL + 'productos')
                .then(response => {
                    if (response.ok) {return response.json(); }
                })
                .then(data=> {
                    this.productos = data;
                })
                .catch (error => {
                    console.log('Error',error);
                    alert('Error al obtener productos.');
                });
        },
        eliminarProducto(codigo){
            if (confirm('¿Estas Seguro?')) {
                fetch(URL +`productos/${codigo}`, {method: 'DELETE'})
                .then(response =>{
                    if(response.ok){
                        this.productos = this.productos.filter(producto => producto.codigo !== codigo);
                        alert('Producto Eliminado')
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
            }
        }
    },
    mounted(){
        this.obtenerProductos();
    }
});
app.mount('body')