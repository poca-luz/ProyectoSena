function mostrarFormulario() {
  const formulario = document.getElementById("formulario");
  formulario.classList.toggle("oculto");
}
function buscar() {
  const valor = document.getElementById("busqueda-input").value.toLowerCase();

  if (valor.includes("entrenamiento") || valor.includes("pesas") || valor.includes("rutina")) {
    window.location.href = "entrenamiento.html";
  } else if (valor.includes("dieta") || valor.includes("comida") || valor.includes("alimentación")) {
    window.location.href = "alimentacion.html";
  } else if (valor.includes("contacto") || valor.includes("ayuda")) {
    window.location.href = "contacto.html";
  } else {
    alert("No se encontró ningún resultado relacionado.");
  }
}
function mostrarRegistro() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.remove("oculto");
}

function mostrarLogin() {
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}

function registrarse() {
  const user = document.getElementById("registro-usuario").value;
  const pass = document.getElementById("registro-clave").value;

  if (user && pass) {
    localStorage.setItem("usuario", user);
    localStorage.setItem("clave", pass);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    mostrarLogin();
  } else {
    alert("Por favor llena todos los campos.");
  }
}

function iniciarSesion() {
  const user = document.getElementById("login-usuario").value;
  const pass = document.getElementById("login-clave").value;

  const userGuardado = localStorage.getItem("usuario");
  const passGuardado = localStorage.getItem("clave");

  if (user === userGuardado && pass === passGuardado) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("registro-container").style.display = "none";
    document.getElementById("contenido").style.display = "block";
  } else {
    alert("Datos incorrectos");
  }
}
function mostrarEntrenamiento() {
  const nombre = document.getElementById("nombre").value;
  const edad = document.getElementById("edad").value;
  const sexo = document.getElementById("sexo").value;
  const objetivo = document.getElementById("objetivo").value;

  if (nombre && edad && sexo && objetivo) {
    document.getElementById("form-datos").style.display = "none";
    document.getElementById("contenido-entrenamiento").style.display = "block";
    return false; 
  } else {
    alert("Por favor llena todos los campos.");
    return false;
  }
}


window.onload = function() {
  const userGuardado = localStorage.getItem("usuario");
  const passGuardado = localStorage.getItem("clave");
  const sesionIniciada = localStorage.getItem("sesionIniciada");

  if (user === userGuardado && pass === passGuardado) {
  localStorage.setItem("sesionIniciada", "true");
  document.getElementById("login-container").style.display = "none";
  document.getElementById("registro-container").style.display = "none";
  document.getElementById("contenido").style.display = "block";
}

};

function mostrarRegistro() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.remove("oculto");
}


function mostrarLogin() {
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("login-container").classList.remove("oculto");
}


function registrarse() {
  const usuario = document.getElementById("registro-usuario").value;
  const clave = document.getElementById("registro-clave").value;

  if (usuario && clave) {
    localStorage.setItem("usuarioRegistrado", usuario);
    localStorage.setItem("claveRegistrada", clave);
    localStorage.setItem("sesionActiva", "true");
    mostrarContenido();
  } else {
    alert("Por favor completa todos los campos");
  }
}
function iniciarSesion() {
  const usuario = document.getElementById("login-usuario").value;
  const clave = document.getElementById("login-clave").value;

  const usuarioRegistrado = localStorage.getItem("usuarioRegistrado");
  const claveRegistrada = localStorage.getItem("claveRegistrada");

  if (usuario === usuarioRegistrado && clave === claveRegistrada) {
    localStorage.setItem("sesionActiva", "true");
    mostrarContenido();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}
function mostrarContenido() {
  document.getElementById("login-container").classList.add("oculto");
  document.getElementById("registro-container").classList.add("oculto");
  document.getElementById("contenido").classList.remove("oculto");
}
window.onload = function () {
  if (localStorage.getItem("sesionActiva") === "true") {
    mostrarContenido();
  }
};
function cerrarSesion() {
      localStorage.removeItem('usuario');
      localStorage.removeItem('logueado');
      window.location.href = "principal.html";
    }
  function mostrarEntrenamiento() {
    const sexo = document.getElementById('sexo').value;
    const objetivo = document.getElementById('objetivo').value;

    // Ocultar formulario
    document.getElementById('form-datos').style.display = 'none';

    // Mostrar el contenedor de entrenamiento
    document.getElementById('contenido-entrenamiento').style.display = 'block';

    // Ocultar todos los bloques
    const bloques = document.querySelectorAll('.bloque-entrenamiento');
    bloques.forEach(b => b.style.display = 'none');

    // Mostrar el bloque correcto
    const idBloque = `${sexo}-${objetivo}`;
    const bloqueMostrar = document.getElementById(idBloque);
    if (bloqueMostrar) {
      bloqueMostrar.style.display = 'block';
    }

    return false; // Para que no se recargue la página
  }

