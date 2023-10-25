function validarEnviar() {
    if (document.formulario.opciones.value.length == 0){
            alert("Debe especificar el motivo de su consulta")
            document.formulario.opciones.focus()
            return 0
    }
    if (document.formulario.nombre.value.length == 0){
        alert("Tiene que escribir su nombre")
        document.formulario.nombre.focus()
        return 0
    }
    
    if (document.formulario.apellido.value.length == 0){
        alert("Tiene que escribir su apellido")
        document.formulario.apellido.focus()
        return 0
    }
    if (document.formulario.email.value.length == 0){
        alert("Tiene que escribir su e-mail")
        document.formulario.email.focus()
        return 0
    }
    if (document.formulario.telefono.value.length== 0) {
        alert("Tiene que introducir su numero de telono.")
        document.formulario.telefono.focus()
        return 0} 
    
    
    if (document.formulario.consulta.value.length== 0) {
        alert("Tiene que introducir su consulta")
        document.consulta.telefono.focus()
        return 0}
    
        alert("Muchas gracias por enviar el formulario")
        document.formulario.submit()
    }
    