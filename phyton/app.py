import mysql.connector

class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        
        self.cursor = self.conn.cursor(dictionary=True)
        self.cursor.execute(''' CREATE TABLE IF NOT EXISTS productos (
            codigo INT,
            descripcion VARCHAR(255) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            proveedor INT(2),
            cantidad INT)''')
        self.conn.commit()

    def agregar_producto (self, codigo, descripcion, cantidad, precio, imagen, proveedor):
        
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False
        
        sql = f"INSERT INTO productos(codigo, descripcion, cantidad, precio, imagen_url, proveedor) VALUES ({codigo},'{descripcion}', {cantidad}, {precio}, '{imagen}', {proveedor})"
        self.cursor.execute(sql)
        self.conn.commit()
        return True
      
    def consultar_producto(self, codigo):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()
    
    def modificar_producto(self, codigo, nueva_descripcion,nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
        
        sql = f"UPDATE productos SET descripcion = '{nueva_descripcion}', cantidad = {nueva_cantidad}, precio = {nuevo_precio}, imagen_url = '{nueva_imagen}', proveedor = {nuevo_proveedor} WHERE codigo = {codigo}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0

    
    def mostrar_producto(self, codigo):
        producto = self.consultar_producto(codigo)
        if producto:
            print("-" * 40)
            print(f"Código.....: {producto['codigo']}")
            print(f"Descripción: {producto['descripcion']}")
            print(f"Cantidad...: {producto['cantidad']}")
            print(f"Precio.....: {producto['precio']}")
            print(f"Imagen.....: {producto['imagen_url']}")
            print(f"Proveedor..: {producto['proveedor']}")
            print("-" * 40)
        else:
            print("Producto no encontrado.")

    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        print("-" * 40)
        for producto in productos:
            print(f"Código.....: {producto['codigo']}")
            print(f"Descripción: {producto['descripcion']}")
            print(f"Cantidad...: {producto['cantidad']}")
            print(f"Precio.....: {producto['precio']}")
            print(f"Imagen.....: {producto['imagen_url']}")
            print(f"Proveedor..: {producto['proveedor']}")
            print("-" * 40)
            
    def eliminar_producto(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0
            
