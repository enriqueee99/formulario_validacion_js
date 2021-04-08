const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //letras,  numeros y guiones bajos
    nombre:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Letras y espacios, pueden llevar acentos
    password: /^.{4,12}$/, //4 a 12 digitos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]$/, 
    telefono: /^\d{7,14}$/ //7 a 14 digitos
}

const validarFormulario = (e) =>{
    switch(e.target.name){
        case 'usuario': 
            validarCampos(expresiones.usuario, e.target, 'usuario');
        break;
        case 'nombre':
            validarCampos(expresiones.nombre, e.target, 'nombre');
    };
};

const validarCampos = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`formulario__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`formulario__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#formulario__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#formulario__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#formulario__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
     } else {
         document.getElementById(`formulario__${campo}`).classList.add('formulario__grupo-incorrecto');
         document.getElementById(`formulario__${campo}`).classList.remove('formulario__grupo-correcto');
         document.querySelector(`#formulario__${campo} i`).classList.add('fa-times-circle');
         document.querySelector(`#formulario__${campo} i`).classList.remove('fa-check-circle');
         document.querySelector(`#formulario__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
     } 
}


/* expresion = expresiones.usuario
input = e.target.value
campo = usuario */

/* const validarCampos = () =>{
    if(expresiones.usuario.test(e.target.value)){
        document.getElementById('formulario__usuario').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('formulario__usuario').classList.add('formulario__grupo-correcto');
     } else {
         document.getElementById('formulario__usuario').classList.add('formulario__grupo-incorrecto');
         document.getElementById('formulario__usuario').classList.remove('formulario__grupo-correcto');
     } 
} */


inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario); //cuenta cada tecla levantada
    input.addEventListener('blur', validarFormulario); //ejecuta cuando cambia de label
})

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
})