class catalogo:
    productos = [] #variable de clase


    def agregar_producto (self, codigo, descripcion, cantidad, precio, imagen, proveedor):

        if self.consltar_producto(codigo):
            return False
        
        nuevo_producto = { # Diccionario de datos
            'codigo': codigo,
            'descripcion': descripcion,
            'cantidad': cantidad,
            'precio': precio,
            'imagen': imagen,
            'proveedor': proveedor
        }
        self.productos.append(nuevo_producto)
        return True

    def consltar_producto(self, codigo):
        for producto in self.productos:
            if producto['codigo'] == codigo: #si es igual el producto existe
                return producto
        return False

    def lista_productos(self):
        print()
        print("-"*50)
        for producto in self.productos:
            print(f'Codigo.......: {producto["codigo"]}')
            print(f'Descripción..: {producto["descripcion"]}')
            print(f'Cantidad.....: {producto["cantidad"]}')
            print(f'precio.......: {producto["precio"]}')
            print(f'imagen.......: {producto["imagen"]}')
            print(f'Proveedor....: {producto["proveedor"]}')
            print("-"*50)

    def modifigar_productos(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
        for producto in self.productos:
            if producto['codigo'] == codigo:
                producto['descripcion'] = nueva_descripcion
                producto['cantidad'] = nueva_cantidad
                producto['precio'] = nuevo_precio
                producto['imagen'] = nueva_imagen
                producto['proveedor'] = nuevo_proveedor
                return True
        return False

    def eliminar_producto(self, codigo):
        for producto in self.productos:
            if producto['codigo'] == codigo:
                self.productos.remove(producto)
                return True
        return False



# -------------------------------------------
# Programa principal

catalogo = catalogo()
# Agregamos productos...
catalogo.agregar_producto(1, 'Laptop Dell', 5, 2399.99, 'laptop.jpg', 101)
catalogo.agregar_producto(2, 'Televisor Samsung', 4, 7899.99, 'televisor.jpg', 302)

# Listar los productos
print("******** LISTADO DE PRODUCTOS ********")
catalogo.lista_productos()
#print(productos)

#Modificar un producto
catalogo.modifigar_productos(1, 'Laptop legasi', 10, 30099.99, 'laptop_legasi.jpg', 101)

#Eliminar productos
catalogo.eliminar_producto(2)


print("******** LISTADO DE PRODUCTOS ********")
catalogo.lista_productos()
