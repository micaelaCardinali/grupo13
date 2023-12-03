#-----------------------------------------------------------
from flask import Flask, request, jsonify
from flask import request
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time
#-----------------------------------------------------------
app = Flask(__name__)
CORS(app)

class Catalogo:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
        
        try:
            self.cursor.execute(F"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
                
        self.cursor.execute(''' CREATE TABLE IF NOT EXISTS productos (
            codigo INT,
            descripcion VARCHAR(255) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            imagen_url VARCHAR(255),
            proveedor INT(2),
            cantidad INT)''')
        self.conn.commit()
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

#-----------------------------------------------------------
    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos
#-----------------------------------------------------------
    def consultar_productos(self, codigo):
        self.cursor.execute(f'SELECT * FROM productos WHERE codigo={codigo}')
        return self.cursor.fetchone()
#-----------------------------------------------------------
    
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
#-----------------------------------------------------------
    def agregar_producto (self, codigo, descripcion, cantidad, precio, imagen, proveedor):
        
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False
        
        sql = f"INSERT INTO productos(codigo, descripcion, cantidad, precio, imagen_url, proveedor) VALUES ({codigo},'{descripcion}', {cantidad}, {precio}, '{imagen}', {proveedor})"
        self.cursor.execute(sql)
        self.conn.commit()
        return True
#-----------------------------------------------------------
    def modificar_producto(self, codigo, nueva_descripcion,nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
        
        sql = f"UPDATE productos SET descripcion = '{nueva_descripcion}', cantidad = {nueva_cantidad}, precio = {nuevo_precio}, imagen_url = '{nueva_imagen}', proveedor = {nuevo_proveedor} WHERE codigo = {codigo}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0
#-----------------------------------------------------------
    def eliminar_producto(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0
#-----------------------------------------------------------
Catalogo = Catalogo(host='localhost', user='root', password='', database='miapp')
ruta_destino = './static/imagenes/'
#-----------------------------------------------------------
@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = Catalogo.listar_productos()
    return jsonify(productos)
#-----------------------------------------------------------
@app.route("/productos/<int:codigo>", methods=["GET"])
def mostrar_producto(codigo):
    producto = Catalogo.consultar_productos(codigo)
    if producto:
        return jsonify(producto)
    else:
        return "Producto no encontrado", 404
if __name__ == "__main__":
    app.run(debug=True)
