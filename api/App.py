############# importar librerias o recursos#####
from flask import Flask, request, jsonify, render_template
from flask_mysqldb import MySQL #Conectarse a mysql
from flask_cors import CORS, cross_origin

#import os
app = Flask(__name__) #crear api y servidor 
CORS(app)
from datetime import datetime

app.static_folder = 'css'

# Mysql Connection
app.config['MYSQL_HOST'] = 'containers-us-west-142.railway.app'  #parametros para una base de datos desde la linea 14-19
app.config['MYSQL_USER'] = 'root' #usuario para php
app.config['MYSQL_PASSWORD'] = 'aU2nntEUvNZjIv0yWWMH' #contraseña para entrar a la base de datos
app.config['MYSQL_DB'] = 'railway' #nombre de la base de datos
app.config['MYSQL_PORT'] = 6122 
#cunado el xampp toca cambiar el puerto toca pner EL app.config[port]

mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"


#-------------------login------#
@cross_origin()
@app.route('/compare', methods=['POST'])
def getcompare():
    try:
        v_correo = request.json['correo']
        v_password = request.json['password']
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT correo, password, id FROM usuario where correo =%s AND password =%s',(v_correo,v_password)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0], 'password': result[1],'Modulo':'User', 'id': result[2] } # numero de valoracion
            payload.append(content)
            
            content = {}
        if not payload: 
            cur = mysql.connection.cursor() #conectar con la base de datos ↓
            cur.execute('SELECT correo, password, id FROM entrenador where correo =%s AND password =%s',(v_correo,v_password)) #ejecutar el scrip
            rv = cur.fetchall() #consultar todos los registros
            cur.close() # cierra la conexion que abrimos arriba        ↑
            payload = []    #lista o array, arreglo, como quieran decirle
            content = {}    #estructura de tipo objeto
        
            for result in rv:
                content = {'correo': result[0], 'password': result[1],'Modulo':'Entrenador', 'id': result[2] } # numero de valoracion
                payload.append(content)
                content = {}
        if not payload:
            cur = mysql.connection.cursor() #conectar con la base de datos ↓
            cur.execute('SELECT correo, password FROM administradores where correo =%s AND password =%s ',(v_correo,v_password)) #ejecutar el scrip
            rv = cur.fetchall() #consultar todos los registros
            cur.close() # cierra la conexion que abrimos arriba        ↑
            payload = []    
            content = {}  
            for result in rv:
                content = {'correo': result[0], 'password': result[1],'Modulo':'Admin' } # numero de valoracion
                payload.append(content)
                content = {}  
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})

#-----------Añadir usuario-------------------------------
@cross_origin()
@app.route('/add_usuario', methods=['POST'])
def add_usuario():
    try:
        
        email = request.json['correo']  
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT correo, password, id FROM usuario where correo =%s',(email,)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0], 'password': result[1] } # numero de valoracion
            payload.append(content)
            content = {}
        if not payload: 
            estado="activo"
            name = request.json['name']  ## nombre
            address = request.json['direccion']        ## direccion
            email = request.json['correo']        ## email
            telefono = request.json['telefono']
            password = request.json['password']        ## contraseña
            genero= request.json['genero']
            fecha_registro = datetime.now()
            num_valoracion=request.json.get('num_valoracion',None)
            planes=request.json.get('id_planes', None)
            estado=request.json['estado']
            cur = mysql.connection.cursor()
            print ("h",cur)
            cur.execute("INSERT INTO usuario (name, direccion,correo, password,fecha_registro,num_valoracion,id_planes,estado,telefono, genero) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s, %s)", (name,address,email, password,fecha_registro,num_valoracion,planes,estado, telefono, genero))
            mysql.connection.commit()
            payload = []
            content = {}    
            content={"Informacion":"Registro_exitoso"}
            payload.append(content)
            return jsonify(payload)
            #return render_template('../html/Register.html')
        else:
            payload = []    
            content = {}    
            content={"Informacion":"Ya_existe"}
            payload.append(content)
            return jsonify(payload)
        
    except Exception as e:
        print(e)
        return render_template({"informacion":e})

@cross_origin()#Eliminar por ID
@app.route('/deleteUser', methods = ['POST'])
def deleteUser():
    try:
        vid=request.json['id']
        vestado="No activo"
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE usuario
                        SET estado=%s
                     WHERE id = %s
                    """, (vestado, vid))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})      

@cross_origin()#Eliminar por ID
@app.route('/deleteEntrenador', methods = ['POST'])
def deleteEntrenador():
    try:
        vid=request.json['id']
        vestado="No activo"
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE entrenador
                        SET estado=%s
                     WHERE id = %s
                    """, (vestado, vid))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})      

#---------------Añadir entrenador
@app.route('/add_entrenador', methods=['POST'])
def add_entrenador():
    try:
        email = request.json['correo']  
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT correo, password, id FROM entrenador where correo =%s',(email,)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0], 'password': result[1] } # numero de valoracion
            payload.append(content)
            content = {}
        if not payload: 
            nombre = request.json['name']        
            fecha_de_nacimiento = request.json['Fecha_de_nacimiento']       
            direccion = request.json['direccion'] 
            correo = request.json['correo']       
            telefono=request.json['telefono']
            especial=request.json['especialidad']
            password= request.json ['password']
            genero= request.json['genero']
            estado=request.json['estado']
            valoracion=request.json.get('Valoracion', 0)
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO entrenador (name,fecha_de_nacimiento,direccion,correo,Valoracion, password, telefono, genero, estado) VALUES (%s,%s,%s,%s,%s, %s,%s, %s, %s)", (nombre,fecha_de_nacimiento,direccion,correo,valoracion, password, telefono, genero, estado))
            #entrenador_id = cur.lastrowid------para obtener la id que registras en insert into entrenador
            id=cur.lastrowid
            cur.execute("INSERT INTO especialidad_entrenador (id_entrenador, especialidad) VALUES (%s, %s)", (id, especial))
            mysql.connection.commit()
            payload = []
            content = {}    
            content={"Informacion":"Registro_exitoso"}
            payload.append(content)
            return jsonify(payload)
        else:
            payload = []    
            content = {}    
            content={"Informacion":"Ya_existe"}
            payload.append(content)
            return jsonify(payload)
            
    except Exception as e:
        print(e)
        return render_template({"informacion":e})
#---------------------------------------------------------------------------
#---------------Añadir rutina
@app.route('/add_rutina', methods=['POST'])
def rutina():
    try:

        id_entrenador = request.json['id_entrenador'] 
        tipo_rutina = request.json['tipo_rutina']  
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT tipo_rutina FROM rutina where tipo_rutina =%s AND id_entrenador =%s',(tipo_rutina,id_entrenador)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0]} # numero de valoracion
            payload.append(content)
            content = {}
        if not payload:  
            descripcion = request.json['descripcion']        
            tipo_rutina = request.json['tipo_rutina']       
            id_entrenador = request.json['id_entrenador'] 
            url=request.json['URLVIDEO']   
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO rutina (descripcion,tipo_rutina ,id_entrenador,URLVIDEO) VALUES (%s,%s,%s,%s)", (descripcion,tipo_rutina,id_entrenador,url))
            mysql.connection.commit()
            payload = []
            content = {}    
            content={"Informacion":"Registro_exitoso"}
            payload.append(content)
            return jsonify(payload)
            #return render_template('../html/Register.html')
        else:
            payload = []    
            content = {}    
            content={"Informacion":"Ya_existe"}
            payload.append(content)
            return jsonify(payload)
    except Exception as e:
        print(e)
        return render_template({"informacion":e})   

#---------------Añadir sesion
@cross_origin()
@app.route('/add_sesion', methods=['POST'])
def sesion():
    try:
        if request.method == 'POST':
            vid_usuario = request.json['id_usuario']  ## id usuario    
            vname_entrenador = request.json['name']  ## id entrenador    
            vTipo_de_rutina = request.json['tipo_rutina']    ## tipo de rutina
             
            cur = mysql.connection.cursor()#
            cur.execute('SELECT id FROM entrenador WHERE name=%s', (vname_entrenador,))#
            
            entrenador_id = cur.fetchone() #modificastes algo de abajo? ahora no funciona la linea 1467 XD
            print("---------",entrenador_id)
            cur.execute('SELECT tipo_rutina FROM rutina WHERE tipo_rutina=%s ',(vTipo_de_rutina,))
            rv = cur.fetchall() #consultar todos los registros
            payload = []    #lista o array, arreglo, como quieran decirle
            content = {}    #estructura de tipo objeto
            
            for result in rv:#ya la apague
                content = {'tipo_rutina': result[0]} # numero de valoracion
                payload.append(content)
                content = {}
                print(payload)
            if  payload :#sale linea 279
                cur.execute("INSERT INTO sesion (id_usuario,id_entrenador,Tipo_de_rutina ) VALUES (%s,%s,%s)", (vid_usuario,entrenador_id,vTipo_de_rutina,))
                mysql.connection.commit()
            
            return jsonify(payload)
        
    except Exception as e:
        print(e)
        return render_template({"informacion":e}) 
   
#-------------------------------------------------------------------------------------------------------------------------------
#---------------Consultar los datos de los usuarios
@app.route('/getAll', methods=['GET'])
def getAll():
    try:
        cur = mysql.connection.cursor() #conectar con la base de datos      ↓
        cur.execute('SELECT * FROM usuario') #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            content = {'nombre': result[0], 'id': result[1], 'direccion': result[2], 'correo': result[3]} # numero de valoracion
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})
  #---------------revisar_lista
@app.route('/getlista', methods=['GET'])
def getlista():
    try:
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT * FROM usuario where estado!="No activo" ') #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            content = {'nombre': result[0], 'id': result[1], 'direccion': result[2], 'correo': result[3], 'estado': result[7], 'telefono':result[9]} # numero de valoracion
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})
    
@cross_origin()
@app.route('/datosuser', methods=['POST'])
def datosuser():
    #El que lo lea es tonto xd ok no||Att: Me fui a Jupiter
    try:
        ide=request.json['id']
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT * FROM usuario  WHERE id=%s', (ide,)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            content = {'nombre': result[0], 'id': result[1], 'direccion': result[2], 'correo': result[3], 'estado': result[7], 'telefono':result[9]} # numero de valoracion
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})

@app.route('/datosEntrenador', methods=['POST'])
def datosEntrenador():
     
    try:
        ide=request.json['id']
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT  *  FROM entrenador INNER JOIN especialidad_entrenador ON entrenador.id = especialidad_entrenador.id_entrenador WHERE id=%s'  ,(ide,))
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            content = {'id': result[0], 'nombre':result[1],  'direccion':result[3], 'correo':result[4] , 'Especialidad': result[11], 'estado':result[8] } 
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})  
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@cross_origin()
@app.route('/Buscarusuario', methods=['GET'])
def Buscarusuario():
    try:
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT * FROM usuario WHERE estado ="No activo" ') #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            content = {'nombre': result[0], 'id': result[1], 'direccion': result[2], 'correo': result[3], 'estado': result[7], 'telefono':result[9]} # numero de valoracion
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})

#---------------------------------------BUSCAR ENTRENADOR--------------------------------#
@cross_origin()
@app.route('/Buscarentrenador', methods=['GET'])
def BuscarEntrenador():
    try:
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT  *  FROM entrenador INNER JOIN especialidad_entrenador ON entrenador.id = especialidad_entrenador.id_entrenador AND estado="no activo"') #ejecutar el scrip #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() 
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto  
        for result in rv:
            content = {'id': result[0], 'nombre':result[1],  'direccion':result[3], 'correo':result[4] , 'Especialidad': result[11], 'estado':result[8] }
            #id = result[0]   
            payload.append(content)
            content = {}

        """cur.execute('SELECT telefono FROM telefono_entrenador WHERE id_entrenador = %s', (id,))
        rv = cur.fetchall() #consultar todos los registros
        for result in rv:
            content={'telefono':result[0]} 
            payload.append(content)
            #esto"""
        return jsonify(payload)

    except Exception as e:

        print(e)
        return jsonify({"informacion":e})

@app.route('/getlistaEntrenador', methods=['GET'])#Lista de entrenadores por parte del Administrador
def getlistaEntrenador():
    try:
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT  *  FROM entrenador INNER JOIN especialidad_entrenador ON entrenador.id = especialidad_entrenador.id_entrenador WHERE estado!="no activo" ') #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            id_entrenador = result[0] 
            content = {'id': result[0], 'nombre':result[1],  'direccion':result[3], 'correo':result[4] , 'Especialidad': result[11], 'estado':result[8], 'Valoracion': result[5] } # numero de valoracion
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})

@app.route('/getlistaEntrenadorUser', methods=['GET'])#Lista de entrenadores por parte del usuario
def getlistaEntrenadorUser():
    try:
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT  *  FROM entrenador INNER JOIN especialidad_entrenador ON entrenador.id = especialidad_entrenador.id_entrenador') #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        for result in rv:
            id_entrenador = result[0] 
            content = {'id': result[0], 'nombre':result[1],  'direccion':result[3], 'correo':result[4] , 'Especialidad': result[8], 'estado':result[9]} # numero de valoracion
            payload.append(content)
            content = {}
        print(id)
        print("--------------------------------------",payload)

    
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})

#---------------Consultar por parametro(nombre)
@app.route('/getAllByName/<name>',methods=['GET']) # consultar registr segun el ID 
def getAllByName(name):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuario WHERE name = %s', (name,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[1], 'direccion': result[2], 'correo': result[3], 'estado': result[7]} 
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#Consultar por parametro al entrenador(nombre)
@app.route('/getAllByNameE/<name>',methods=['GET']) # consultar registr segun el ID 
def getAllByNameE(name):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM entrenador WHERE name = %s', (name,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content={ 'id': result[0], 'Fecha': result[2], 'direccion': result[3], 'correo': result[4], 'Valoracion': result[5]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

@app.route('/getAllByNameE/<name>',methods=['GET']) # consultar registr segun el ID 
def login(name):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM entrenador WHERE name = %s', (name,))
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content={ 'id': result[0], 'Fecha': result[2], 'direccion': result[3], 'correo': result[4], 'Valoracion': result[5]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

# ruta para actualizar Datos del usuario#
@cross_origin()
@app.route('/update/<id>', methods=['PUT'])
def update(id):
    try:
       
        id=request.json['id']
        print(id)
        vname = request.json['name']
        vdireccion = request.json['direccion']
        vcorreo = request.json['correo']
        vestado = request.json['estado']
        vtelefono = request.json['telefono']

        cur = mysql.connection.cursor()#
        cur.execute("""
        UPDATE usuario
        SET name = %s,
            direccion = %s,
            estado=%s,
            correo = %s,
            telefono=%s
        WHERE id = %s
        """, (vname, vdireccion, vestado, vcorreo,vtelefono, id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizados"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})


  # ruta para actualizar Datos del entrenador#
@cross_origin()
@app.route('/update/entrenador', methods=['PUT'])
def update_entrenador():
    try:
       
        id=request.json['id']
        print(id)
        vname = request.json['name']
        vdireccion = request.json['direccion']
        vcorreo = request.json['correo']
        vestado = request.json['estado']
        vespecial= request.json['especialidad']
        cur = mysql.connection.cursor()#  especialidad_entrenador
        cur.execute("""
        UPDATE entrenador
        INNER JOIN especialidad_entrenador as especial
        ON especial.id_entrenador=entrenador.id
        SET entrenador.name = %s, 
            entrenador.direccion = %s,
            entrenador.estado=%s,
            entrenador.correo = %s,
            especial.especialidad = %s
        WHERE entrenador.id = %s
        """, (vname, vdireccion, vestado, vcorreo,vespecial, id,)) #Ahora falta en js, ya lo corregi yo ,llega
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizados"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})  
 
@cross_origin()#Eliminar por ID
@app.route('/delete/<id>', methods = ['DELETE'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM usuario WHERE id = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})      

#-----------------------------------ruta para actualizar los precios de los planes -----------------------------#
@cross_origin()
@app.route('/update/planes', methods=['PUT'])
def udapteplanes():
    #Ya funciona con insomia, le quite el id y le puse nombre
    try:
        vnombre=request.json['nombre']
        nameplan=request.json['nameplan']

        vdescripcion=request.json['descripcion']
        vprecio= request.json['precio']
        cur= mysql.connection.cursor()
        cur.execute("""UPDATE planes
                    SET precio=%s,
                    nombre=%s,
                    descripcion=%s
                    WHERE nombre=%s
                    """, (vprecio,vnombre,vdescripcion, nameplan,))
        mysql.connection.commit()
        return jsonify({"informacion":"Planes actualizados"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#------------------------------------------------Mostrar los planes registrados---------------------------------------------------
@app.route('/mostrar_planes', methods=['GET'])
def mostrar_planes():
    try:
        cur= mysql.connection.cursor()
        cur.execute("SELECT * FROM planes")
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#:u 
            content={ 'id': result[0], 'nombre':result[1], 'precio':result[2], 'descripcion': result[3], 'imagen': result[4]}
            payload.append(content)
            content = {}

        return jsonify(payload)
    

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------------Solicitud-------------------------------------------------------
@cross_origin()
@app.route('/solicitud', methods=['POST'])
def solicitud():
    try:
        vusuario= request.json['id_usuario']
         
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute('SELECT entrenador_entrenar FROM usuario WHERE id=%s',(vusuario,)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0] } # numero de valoracion
            payload.append(content)
            content = {}
        if not payload or result[0]==None:
            vusuario= request.json['id_usuario']
            ventrenador= request.json['id_entrenador']
            opcion=request.json['estado']

            cur= mysql.connection.cursor()
            cur.execute("INSERT INTO solicitud (id_usuario, id_entrenador, estado) VALUES (%s, %s, %s)",(vusuario, ventrenador, opcion))    
            cur.close()
            mysql.connection.commit()
            payload = []
            content = {}    
            content={"Informacion":"Registro_exitoso"}
            payload.append(content)
            return jsonify(payload)
        else:
            payload = []    
            content = {}    
            content={"Informacion":"Ya_existe"}
            payload.append(content)
            return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-------------------------------------------------ASISTENCIA-------------------------------------------------------#
@cross_origin()
@app.route('/asistencia', methods=['POST'])
def asistencia():
    try:
#oka, me piro por ahora
        vusuario= request.json['id_usuario']
        fecha_registro = datetime.now()

        cur= mysql.connection.cursor()
        cur.execute("INSERT INTO asistencia (id_usuario, fecha) VALUES (%s, %s)",(vusuario, fecha_registro,))    
        cur.close()
        mysql.connection.commit()


        return jsonify({"informacion":"Solicitud enviada"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#--------------------------------------------------ESTADISTICA1---------------------------------------------------------------------------------------------------------------#    
"""@cross_origin()
@app.route('/estadisticas', methods=['GET'])
def estadisticas():
    try:
     
      #  vusuario= request.json['id_usuario']
        
       # fecha_registro = datetime.now()

        cur= mysql.connection.cursor()
        cur.execute(SELECT us.name AS "nombre", COUNT(asi.id_usuario) AS "numero de asistencias"
FROM usuario AS us, asistencia AS asi
WHERE   us.estado!="no activo"  AND  us.id = asi.id_usuario
GROUP BY us.name ORDER BY COUNT(asi.id_usuario))  #ORDER BY COUNT(asi.id_usuario) LIMIT 5 LE PUSE ESO
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#:u
            content={ 'Nombre': result[0], 'Asistencia':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

SELECT HOUR(fecha) as hora, COUNT(*) as total_asistencia 
                    FROM asistencia 
                    WHERE YEAR(fecha)=2023 AND MONTH(fecha)=8 
                    GROUP BY HOUR(fecha) 
                    ORDER BY hora;
"""
@cross_origin()
@app.route('/estadisticas', methods=['GET'])
def estadisticas():
    try:
        cur= mysql.connection.cursor()
        cur.execute("""
                    SELECT HOUR(fecha) as hora, COUNT(*) as total_asistencia 
                    FROM asistencia 
                    WHERE YEAR(fecha)=2023 AND MONTH(fecha)=8 
                    GROUP BY HOUR(fecha) 
                    ORDER BY hora;
""")
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#:u
            content={ 'Nombre': result[0], 'Asistencia':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------ESTADISTICA 2---------------------------------------------------------#
cross_origin()
@app.route('/estadisticas/genero', methods=['GET'])
def estadisticasgenero():
    try:
        cur=mysql.connection.cursor()
        cur.execute("""  SELECT COUNT(*) as hombres
        FROM (
            SELECT genero FROM usuario WHERE genero = 'masculino'
            UNION ALL
            SELECT genero FROM entrenador WHERE genero = 'masculino'
        ) as hombres
        """)
        mysql.connection.commit()
        rv= cur.fetchall()#
        payload=[]
        content={}
        for result in rv:  
            content={'Hombres':result[0]}#Vamos a la pagina de enviar reporte
            ##me dijistes 9 muejres y sale 20  |entrenador hombre: 8  usuario hombre:10|  |entrenador mujer:11   usuario mujer: 9|  XD
            payload.append(content)
            
        cur=mysql.connection.cursor()
        cur.execute("""  SELECT COUNT(*) as mujeres
        FROM (
            SELECT genero FROM usuario WHERE genero = 'femenino'
            UNION ALL
            SELECT genero FROM entrenador WHERE genero = 'femenino'
        ) as mujeres
        """)
        mysql.connection.commit()
        rv= cur.fetchall()#
        cur.close()
        for result in rv:
            content={'Mujeres':result[0]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------ESTADISTICA 3---------------------------------------------------------#
cross_origin()
@app.route('/estadisticas/genero/usuario', methods=['GET'])
def estadisticasgeneroUsuario():
    try:
        cur=mysql.connection.cursor()
        cur.execute("""  SELECT COUNT(*) as hombres
        FROM (
            SELECT genero FROM usuario WHERE genero = 'masculino'    
        )as hombres
        """)
        mysql.connection.commit()
        rv= cur.fetchall()#
        payload=[]
        content={}
        for result in rv:  
            content={'Hombres':result[0]}#Vamos a la pagina de enviar reporte
            ##me dijistes 9 muejres y sale 20  |entrenador hombre: 8  usuario hombre:10|  |entrenador mujer:11   usuario mujer: 9|  XD
            payload.append(content)
            
        cur=mysql.connection.cursor()
        cur.execute("""  SELECT COUNT(*) as mujeres
        FROM (
            SELECT genero FROM usuario WHERE genero = 'femenino'
        ) as mujeres
        """)
        mysql.connection.commit()
        rv= cur.fetchall()#
        cur.close()
        for result in rv:
            content={'Mujeres':result[0]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#-----------------------------------------------ESTADISTICA 4---------------------------------------------------------#
cross_origin()
@app.route('/estadisticas/genero/entrenador', methods=['GET'])
def estadisticasgeneroEntrenador():
    try:
        cur=mysql.connection.cursor()
        cur.execute("""  SELECT COUNT(*) as hombres
        FROM (
            SELECT genero FROM entrenador WHERE genero = 'masculino'
        ) as hombres
        """)
        mysql.connection.commit()
        rv= cur.fetchall()#
        payload=[]
        content={}
        for result in rv:  
            content={'Hombres':result[0]}#
            
            payload.append(content)
            
        cur=mysql.connection.cursor()
        cur.execute("""  SELECT COUNT(*) as mujeres
        FROM (
            SELECT genero FROM entrenador WHERE genero = 'femenino'
        ) as mujeres
        """)
        mysql.connection.commit()
        rv= cur.fetchall()#
        cur.close()
        for result in rv:
            content={'Mujeres':result[0]}
            payload.append(content)
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------ESTADISTICA 4---------------------------------------------------------#
@cross_origin()
@app.route('/estadisticas_user_asistencia', methods=['POST'])
def estadisticas_user_asistencia():
    try:
        vid=request.json['id']
      #  vusuario= request.json['id_usuario']
        
       # fecha_registro = datetime.now()

        cur= mysql.connection.cursor()
        cur.execute("""SELECT us.name AS "nombre", COUNT(asi.id_usuario) AS "numero de asistencias"
                FROM usuario AS us, asistencia AS asi
                WHERE   us.estado!="no activo"  AND  us.id = asi.id_usuario and us.id=%s
                GROUP BY us.name""", (vid,))  #LE AGREGUE EL ORDER BY COUNT(asi.id_usuario) LIMIT 5
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#:u
            content={ 'Nombre': result[0], 'Asistencia':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
   
#-----------------------------------------------ESTADISTICA 5   DE   ASISTENCIA DE USUARIOS EN UN MES---------------------------------------------------------#
@cross_origin()
@app.route('/estadisticas_por_mes', methods=['GET'])
def estadisticas_por_mes():
    try:

        cur= mysql.connection.cursor()
        cur.execute("SET lc_time_names = 'es_ES'")
        cur.execute("""SELECT DAYNAME(fecha) as dia_semana, COUNT(*) as total_asistencia 
            FROM asistencia
            WHERE YEAR(fecha)=2023 AND MONTH(fecha)=8
            GROUP BY
            DAYNAME(fecha) ORDER BY MIN(fecha)""")  #SET lc_time_names = 'es_ES';
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#
            content={ 'Dia_semana': result[0], 'Asistencia':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------ESTADISTICA   DE  PROGRESO DE LOS USUARIO---------------------------------------------------------#
@cross_origin()
@app.route('/estadisticas_De_Pogreso_peso', methods=['POST'])
def estadisticas_De_Pogreso():
    try:
        vid=request.json['id']
        cur= mysql.connection.cursor()
        cur.execute("""SELECT u.name, v.peso, v.altura, v.imc
                    FROM valoracion as v, usuario as u
                    WHERE u.id=v.id_usuario AND u.id=%s""", (vid,))  #
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#
            content={ 'Nombre': result[0], 'Peso':result[1], 'Altura':result[2], 'IMC':result[3]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------ESTADISTICA   DE  PROGRESO DE LOS USUARIO---------------------------------------------------------#
@cross_origin()
@app.route('/estadisticas_Entrenador_y_sus_Usuarios', methods=['GET'])
def estadisticas_Entrenador_y_sus_Usuarios():
    try:
        
        cur= mysql.connection.cursor()
        cur.execute("""
                SELECT e.name, count(u.entrenador_entrenar) FROM usuario as u, entrenador as e 
                WHERE e.id=u.entrenador_entrenar
                GROUP BY e.name;    
                    """)  #
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#
            content={ 'Nombre': result[0], 'Cantidad':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#-----------------------------------------------ESTADISTICA 4---------------------------------------------------------#
@cross_origin()
@app.route('/user_asistencia_Entrenador', methods=['POST'])
def user_asistencia_Entrenador():
    try:
        vid=request.json['id']
      #  vusuario= request.json['id_usuario']
        
       # fecha_registro = datetime.now()

        cur= mysql.connection.cursor()
        cur.execute("""SELECT us.name AS "nombre", COUNT(asi.id_usuario) AS "numero de asistencias"
                FROM usuario AS us, asistencia AS asi, entrenador as e
                WHERE   us.estado!="no activo"  AND  us.id = asi.id_usuario AND e.id=us.entrenador_entrenar AND e.id=%s
                GROUP BY us.name""", (vid,))  #LE AGREGUE EL ORDER BY COUNT(asi.id_usuario) LIMIT 5
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#:u
            content={ 'Nombre': result[0], 'Asistencia':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------UPDATE   DE  PROGRESO DE LOS USUARIO---------------------------------------------------------#
@cross_origin()
@app.route('/UPDATEPROGRESO ', methods=['PUT'])
def UPDATEPROGRESO():
    try:
        vid=request.json['id']
        cur= mysql.connection.cursor()
        cur.execute("""UPDATE 
                        valoracion
                        SET id_usuario=%s
                        WHERE id=%s
                        """, (vid,))  #
        
        mysql.connection.commit()
        cur.close()

        return jsonify({"informacion":"Registro existoso"})

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-----------------------------------------------ESTADISTICA  SOBRE PLANES---------------------------------------------------------#
@cross_origin()
@app.route('/estadisticas_De_Planes', methods=['GET'])
def estadisticas_De_Planes():
    try:
        
        cur= mysql.connection.cursor()
        cur.execute("""
                    SELECT COUNT(u.id_planes) as "compras", p.nombre as "plan"
                    FROM usuario as u, planes as p
                    WHERE u.id_planes=p.id
                    GROUP BY plan
                    """)  #
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#
            content={ 'Cantidad': result[0], 'Planes':result[1]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#--------------------------------------------------REVISAR SOLICITUDES---------------------------------------------------------------------------------------------------------------#    
@cross_origin()
@app.route('/revisarSolicitudes', methods=['POST'])
def revisarSolicitudes():
    try:
     
        vid_entrenador= request.json['id_entrenador']
       # fecha_registro = datetime.now()

        cur= mysql.connection.cursor()
        cur.execute("SELECT name as 'Nombre', soli.estado, id FROM usuario as us, solicitud as soli WHERE  us.id=soli.id_usuario AND soli.estado='Pendiente' AND  us.estado='activo' AND id_entrenador=%s;",(vid_entrenador,))  
        
        mysql.connection.commit()
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:#:u
            content={ 'nombre': result[0], 'estado':result[1], 'id': result[2]}
            payload.append(content)
            content = {}

        return jsonify(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#--------------------------------------------OPERAR SOLICITUDES----------------------------------------#
@cross_origin()
@app.route('/AceptarSolicitudes', methods=['DELETE', 'POST'])
def AceptarSolicitud():
    try:
        if request.method=='DELETE':
        
            vid_entrenador= request.json['id_entrenador']
            vid_usuario= request.json['id_usuario']
            cur= mysql.connection.cursor()
            cur.execute("DELETE FROM solicitud WHERE  id_usuario=%s AND estado='Pendiente' ",(vid_usuario,))
            cur.close()
            mysql.connection.commit()       
            return jsonify({"Informacion: ": "Eliminado"})
        
        else:
            vid_entrenador= request.json['id_entrenador']
            vid_usuario= request.json['id_usuario']
            cur= mysql.connection.cursor()
        

            cur.execute("UPDATE usuario SET entrenador_entrenar=%s WHERE id=%s",(vid_entrenador,vid_usuario))
            cur.close()
            mysql.connection.commit()       
            return jsonify({"Informacion: ": "Agregado"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})        

#------------------------------------------lista aceptados-------------------------------------------#
@cross_origin()
@app.route('/usuarios_aceptados', methods=['POST']) # 
def usuarios_aceptados():
    try:  
            vid_entrenador= request.json['id_entrenador']
            print("--------------------")
            print(vid_entrenador)#
            cur= mysql.connection.cursor()
            cur.execute(" SELECT u.name as nombre, u.id as id, u.estado as estado, u.correo as correo FROM usuario as u , entrenador as e WHERE u.entrenador_entrenar = e.id  AND e.id=%s",(vid_entrenador,))
            # ya xd, cule error bobo q tenia xd, vaya
            mysql.connection.commit()
            rv = cur.fetchall()    
            payload=[]
            content={}
            for result in rv:
                content={"nombre":result[0], "id": result[1], "estado":result[2] , "correo": result[3]}#ahora en js
                payload.append(content)
                content={}
            print("--------------------")
            print("--------------------")
            print(payload)
            print(result[0])
            return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})        
    
#------------------------------------------lista aceptados-------------------------------------------#
@cross_origin()
@app.route('/entrenadores_QueTe_Aceptaron', methods=['POST'])
def entrenadores_QueTe_Aceptaron():
    try:  
            vid_entrenador= request.json['id_usuario']
            print("--------------------")
            print(vid_entrenador)#
            cur= mysql.connection.cursor()
            cur.execute(" SELECT e.name as nombre, e.id as id, e.estado as estado, e.correo as correo, e.Valoracion FROM usuario as u , entrenador as e WHERE u.entrenador_entrenar = e.id  AND u.id=%s",(vid_entrenador,))
            # ya xd, cule error bobo q tenia xd, vaya
            mysql.connection.commit()
            rv = cur.fetchall()    
            payload=[]
            content={}
            for result in rv:
                content={"nombre":result[0], "id": result[1], "estado":result[2] , "correo": result[3], "Valoracion": result[4]}#ahora en js
                payload.append(content)
                content={}
            return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})        
    
#----------------------------------------BSacar la valaroracion que tiene acumulada-------------------------------------------------
cross_origin()
@app.route('/buscarvaloracion', methods=['PUT', 'POST'])
def buscarvaloracion():
    try:
    
        if request.method=='POST':
            x=2
            print("--------------------4")   
            cur= mysql.connection.cursor()        

            vid_entrenador= request.json['id_entrenador']
            cur.execute("SELECT id_usuario, id_entrenador, COUNT(valoracion),  SUM(valoracion)  FROM calificacion WHERE   id_entrenador=%s  ",( vid_entrenador,))
            mysql.connection.commit()
            rv = cur.fetchall()    
            payload=[]
            content={}
            for result in rv:
                content={"nombre":result[0], "id": result[1], "Valoracion":result[2], "SumaValoracion":result[3]}
                payload.append(content)
                content={}
                print(payload)             
            print(payload)
            return(payload)

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

#---------------------------------------- VALORACION TRAINER--------------------------------------------------
@cross_origin()
@app.route('/valoracionEntrenador', methods=['PUT', 'POST'])
def valoracionEntrenador():
    try:
        x=request.json['x']
        y=request.json['y']
        z=request.json['z']
        print(x)
        print(y)
        print(z)
        if request.method=='POST' and x=="1":
            x=2
            print("--------------------4")   
            cur= mysql.connection.cursor()        
            vid_usuario= request.json['id_usuario']
            vid_entrenador= request.json['id_entrenador']
            cur.execute("SELECT id_usuario, id_entrenador, COUNT(valoracion),  SUM(valoracion)  FROM calificacion WHERE  id_usuario=%s AND id_entrenador=%s AND valoracion!=0 ",(vid_usuario, vid_entrenador,))
            mysql.connection.commit()
            rv = cur.fetchall()    
            payload=[]
            content={}
            for result in rv:
                content={"nombre":result[0], "id": result[1], "Valoracion":result[2], "SumaValoracion":result[3]}
                payload.append(content)
                content={}
                print(payload)
                if not payload or result[2]==0:
                    content={"nombre":result[0], "id": result[1], "Valoracion":result[2]}
                    payload.append(content)
                    content={}
                    print(rv)
                    return (payload)
             
            print("--------------------4")   
            print("--------------------s4")
            print(payload)
            return(payload)
            
        
        if request.method=='PUT' and y=="2":
            print("--------------------2")
            print("--------------------2")
            
            y=3
            vvaloracion= request.json['Valoracion']
            vid= request.json['id']
            cur= mysql.connection.cursor()
            cur.execute("""UPDATE entrenador 
                                    SET Valoracion=%s
                                        WHERE id=%s
                                    """,(vvaloracion, vid,))
            mysql.connection.commit()
            cur.close()
            return jsonify({"Informacion": "Valoracion Realizada"})
        elif request.method=='POST' and z=="3":
            print("--------------------1")
            print("--------------------1")
            vvaloracion= request.json['valoracion']
            vid_usuario= request.json['id_usuario']
            vid_entrenador= request.json['id_entrenador']
            cur= mysql.connection.cursor()
            cur.execute('INSERT INTO calificacion (id_usuario, id_entrenador, valoracion) VALUES (%s, %s, %s)', (vid_usuario, vid_entrenador, vvaloracion))
            mysql.connection.commit()
            cur.close()
            return jsonify({"Informacion": "Valoracion Realizada"})

    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

#---------------------------------------- VALORACION USUARIO--------------------------------------------------
@cross_origin()
@app.route('/valoracion_user', methods=['POST','PUT'])#lee whasa
def valoracion_user():
    global num_valoracion
    try:
        if request.method=='POST':#
            vpeso=request.json['peso']
            valtura=request.json['altura']
            v_imcv=request.json['imc']
           
            Fecha_valoracion = datetime.now()
            cur= mysql.connection.cursor()#
            cur.execute('Insert Into valoracion(peso,altura,imc,Fecha_de_valoracion) VALUES(%s,%s,%s,%s)', (vpeso, valtura, v_imcv, Fecha_valoracion,))
            mysql.connection.commit()
            cur.close()
            num_valoracion=cur.lastrowid
            payload=[]
            content={}
            content={"Informacion":num_valoracion}
            payload.append(content)
            return jsonify(payload)
        elif request.method=='PUT':
            print("jojoas")
            print(num_valoracion)
            id_usuario=request.json['id']
            cur= mysql.connection.cursor()#
            #num_valoracion=request.json['num_valoracion']
            #id_usuario=request.json['id']#cur.execute("UPDATE usuario SET entrenador_entrenar=%s WHERE id=%s",(vid_entrenador,vid_usuario))
            cur.execute('''UPDATE usuario 
            SET num_valoracion=%s 
            WHERE id=%s''',(num_valoracion, id_usuario,))
            mysql.connection.commit()
        return jsonify({"Informacion": "Valoracion Realizada"})
    
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})
    
#---------------------------------------- VALORACION USUARIO--------------------------------------------------
@cross_origin()
@app.route('/valoracion_user2', methods=['POST','PUT'])#lee whasa
def valoracion_user2():
    global num_valoracion
    try:
        if request.method=='PUT':
            cur= mysql.connection.cursor()
            id_usuario=request.json['id']
            num_valoracion=request.json['num_valoracion']
            #id_usuario=request.json['id']#cur.execute("UPDATE usuario SET entrenador_entrenar=%s WHERE id=%s",(vid_entrenador,vid_usuario))
            cur.execute('''UPDATE valoracion 
            SET id_usuario=%s 
            WHERE numero_valor=%s''',(id_usuario,num_valoracion,))
            mysql.connection.commit()
        return jsonify({"Informacion": "Valoracion Realizada"})
    
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

#-------------------------------------------flecha-----------------------------------------#
@cross_origin()
@app.route('/usuariomove', methods=['POST'])
def usuariomove():
    try:
        id= request.json['id']
        cur=mysql.connection.cursor()
        cur.execute("""SELECT v.imc, v.numero_valor, v.peso, v.altura
        FROM valoracion as v, usuario as u
        WHERE v.numero_valor=u.num_valoracion AND u.id=%s
        """, (id,))#
        mysql.connection.commit()
        rv= cur.fetchall()
        payload=[]
        content={}
        for result in rv:  
            content={"imc":result[0],"numero_valor":result[1],"peso":result[2],"altura":result[3]}
            payload.append(content)
        return jsonify(payload)
    
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})
  
#----------------------------------------Mostrar Nombre del entrenador para registrarlo en la sesion--------------------------------------------------
@cross_origin
@app.route('/MostrarNombreEntrenadorParaSesion', methods=['POST'])
def MostrarNombreEntrenadorParaRutina():
    try:
        vid=request.json['id_usuario']
        cur=mysql.connection.cursor()
        cur.execute('SELECT DISTINCT e.name FROM rutina as r, entrenador as e, usuario as u WHERE r.id_entrenador=e.id AND  e.id=u.entrenador_entrenar AND u.id=%s ', (vid,))
        mysql.connection.commit()
        rv=cur.fetchall()
        payload=[]
        content={}
        cur.close()
        for result in rv:
            content={'NombreEntrenador': result[0]}
            payload.append(content)
            content={}
        return (payload)
    except Exception as e:
        return jsonify ({"informacion":e})

#----------------------------------------Mostrar rutina creada por entrenador--------------------------------------------------        
@cross_origin 
@app.route('/MostrarRutinaCreadaPorEntrenador', methods=['POST'])
def MostrarRutinaCreadaPorEntrenador():
    try:
        vid=request.json['id_usuario']
        cur=mysql.connection.cursor()
        cur.execute('SELECT DISTINCT r.tipo_rutina FROM rutina as r, entrenador as e, usuario as u WHERE r.id_entrenador=e.id AND  e.id=u.entrenador_entrenar AND u.id=%s ', (vid,))
        mysql.connection.commit()
        rv=cur.fetchall()
        payload=[]
        content={}
        cur.close()
        for result in rv:
            content={'tipoDeRutina': result[0]}
            payload.append(content)
            content={}
        return (payload)
    except Exception as e:
        return jsonify ({"informacion":e})

#----------------------------------------Mostrar descripcion creada por entrenador--------------------------------------------------        
@cross_origin #otra ruta? si| ok
@app.route('/MostrarDescripcionCreadaPorEntrenador', methods=['POST'])
def MostrarDescripcionCreadaPorEntrenador():
    try:
        vid=request.json['id_usuario']
        vtipo=request.json['tipo']
        vname=request.json['name']
        cur=mysql.connection.cursor()
        cur.execute('SELECT r.descripcion FROM rutina as r, entrenador as e, usuario as u WHERE r.id_entrenador=e.id AND  e.id=u.entrenador_entrenar AND u.id=%s AND r.tipo_rutina=%s AND e.name=%s', (vid,vtipo,vname))
        mysql.connection.commit()
        rv=cur.fetchall()
        payload=[]
        content={}
        cur.close()
        for result in rv:
            content={'Descripcion': result[0]}#
            payload.append(content)
            content={}
        return (payload)
    except Exception as e:
        return jsonify ({"informacion":e})

#----------------------------------------Mostrar sesion creada por usuario--------------------------------------------------
@cross_origin
@app.route('/MostrarSesionCreadaPorUsuario', methods=['POST'])
def MostrarSesionCreadaPorUsuario():
    try:
        vid=request.json['id_usuario']
       # 
        cur=mysql.connection.cursor()
        cur.execute('SELECT e.name , s.tipo_de_rutina  FROM sesion as s, rutina as r, entrenador as e, usuario as u WHERE s.id_entrenador=r.id_entrenador  AND  e.id=u.entrenador_entrenar  AND s.id_entrenador=e.id AND u.id=s.id_usuario AND  S.Tipo_de_rutina=r.tipo_rutina AND u.id=%s', (vid,))
        mysql.connection.commit()
        rv=cur.fetchall()
        payload=[]
        content={}
        cur.close()
        for result in rv:
            content={'NombreDeEntrenador': result[0], 'tipoRutina':result[1]}
            payload.append(content)
            content={}
        return (payload)
    except Exception as e:
        return jsonify ({"informacion":e})
#---------------------------------------------------URL :3-------------------------------------------------

@cross_origin()
@app.route('/url_video', methods=['POST'])
def REPRODUCIRVIDEO():
    try:
        vtipo=request.json['tipo']
        vid=request.json['id_usuario']
        print(vtipo)
        print(vid)

        cur=mysql.connection.cursor()
        cur.execute('SELECT r.URLVIDEO FROM rutina as r, entrenador as e, usuario as u WHERE r.id_entrenador=e.id AND e.id=u.entrenador_entrenar AND u.id=%s AND r.tipo_rutina=%s', (vid,vtipo,))
        print("dd:")
        
        #mysql.connection.commit()
        rv= cur.fetchall()
        print("dd:",rv)
        payload=[]#
        content={}
        #cur.close()
        print("sasdds")
        print("dd:",rv)
        for result in rv:
            content={'url': result[0]}#
            payload.append(content)#lo voy a probar en insomia
            content={}
            print("sasdds")
            print("s",payload)
        return (payload)    
    except Exception as e:
        return jsonify ({"informacion":e})

# starting the app
if __name__ == "__main__":
    app.run(port=3000, debug=True)  