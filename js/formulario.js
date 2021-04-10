const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //letras,  numeros y guiones bajos
    nombre:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Letras y espacios, pueden llevar acentos
    password: /^.{4,12}$/, //4 a 12 digitos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, 
    numero: /^\d{7,14}$/ //7 a 14 digitos
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    numero: false
}

const validarFormulario = (e) =>{
    switch(e.target.name){
        case 'usuario': 
            validarCampos(expresiones.usuario, e.target, 'usuario');
            break;
        case 'nombre':
            validarCampos(expresiones.nombre, e.target, 'nombre');
            break;
        case 'password':
            validarCampos(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case 'password2':
            validarPassword2();
            break;
        case 'correo':
            validarCampos(expresiones.correo, e.target, 'correo');
            break;
        case 'numero':
            validarCampos(expresiones.numero, e.target, 'numero');
            break
    };
};

const validarCampos = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`formulario__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`formulario__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#formulario__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#formulario__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#formulario__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
     } else {
         document.getElementById(`formulario__${campo}`).classList.add('formulario__grupo-incorrecto');
         document.getElementById(`formulario__${campo}`).classList.remove('formulario__grupo-correcto');
         document.querySelector(`#formulario__${campo} i`).classList.add('fa-times-circle');
         document.querySelector(`#formulario__${campo} i`).classList.remove('fa-check-circle');
         document.querySelector(`#formulario__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
         campos[campo] = false;
     } 
}


const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`formulario__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`formulario__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#formulario__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#formulario__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#formulario__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false //accedo a objeto y lo mantengo en falso
	} else {
		document.getElementById(`formulario__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`formulario__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#formulario__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#formulario__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#formulario__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true //accedo a mi objeto y cambio ese valor de falso a verdadero
	}
}




inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario); //cuenta cada tecla levantada
    input.addEventListener('blur', validarFormulario); //ejecuta cuando cambia de label
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    const terminos = document.getElementById('terminos')

    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.numero && terminos.checked){
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() =>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 2000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() =>{
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 2000)
    }
})