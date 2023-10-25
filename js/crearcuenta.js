function validarEnviar() {
   
    if (document.form.name.value.length == 0){
        alert("Tiene que escribir su nombre")
        document.form.name.focus()
        return 0
    }
    if (document.form.lastname.value.length == 0){
        alert("Tiene que escribir su apellido")
        document.form.lastname.focus()
        return 0
    }
    if (document.form.email.value.length == 0){
        alert("Tiene que escribir su email")
        document.form.email.focus()
        return 0
    }
    if (document.form.password.value.length == 0){
        alert("Tiene que crear una contraseña")
        document.form.password.focus()
        return 0
    }
        alert("cuenta creada correctamente")
        document.formulario.submit()
    }