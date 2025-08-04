/**
 * NO LIMITS - Aplicación de Fitness
 * Script principal organizado y optimizado
 */

// ========================================
// 1. VARIABLES GLOBALES
// ========================================
let usuarioActual = null;
let perfilUsuario = {};

// Configuración de animaciones
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Konami code para easter egg
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let userInput = [];

// ========================================
// 2. MÓDULO DE AUTENTICACIÓN
// ========================================
const Auth = {
  // Función de registro
  registrarse() {
    const usuario = document.getElementById('registerUsuario').value;
    const email = document.getElementById('registerEmail').value;
    const clave = document.getElementById('registerClave').value;

    if (!usuario || !email || !clave) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Crear perfil inicial
    const perfilInicial = {
      usuario: usuario,
      email: email,
      clave: clave,
      fullName: '',
      age: '',
      weight: '',
      height: '',
      goal: '',
      workoutCount: 0,
      daysStreak: 0,
      totalTime: 0,
      fechaRegistro: new Date().toISOString()
    };

    // Simular guardado
    usuarioActual = usuario;
    perfilUsuario = perfilInicial;

    UI.cerrarModal('registerModal');
    UI.mostrarContenido();
    alert('¡Registro exitoso! Bienvenido a NO LIMITS');
  },

  // Función de inicio de sesión
  iniciarSesion() {
    const usuario = document.getElementById('loginUsuario').value;
    const clave = document.getElementById('loginClave').value;

    if (!usuario || !clave) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    // Simular verificación de credenciales
    if (perfilUsuario.usuario === usuario && perfilUsuario.clave === clave) {
      usuarioActual = usuario;
      UI.cerrarModal('loginModal');
      UI.mostrarContenido();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  },

  // Función para cerrar sesión
  cerrarSesion() {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
      usuarioActual = null;
      document.getElementById('contenido').classList.add('oculto');
      UI.cerrarModal('profileModal');
      UI.mostrarModal('loginModal');
    }
  }
};

// ========================================
// 3. MÓDULO DE INTERFAZ DE USUARIO
// ========================================
const UI = {
  // Función para mostrar modales
  mostrarModal(modalId) {
    // Cerrar otros modales primero
    const modales = document.querySelectorAll('.modal');
    modales.forEach(modal => modal.style.display = 'none');
    
    // Mostrar el modal solicitado
    document.getElementById(modalId).style.display = 'flex';
  },

  // Función para cerrar modales
  cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  },

  // Función para mostrar el contenido principal
  mostrarContenido() {
    document.getElementById('contenido').classList.remove('oculto');
    document.getElementById('userNameNav').textContent = usuarioActual || 'Mi Perfil';
    Profile.cargarDatos();
  },

  // Función para alternar menú móvil
  toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  },

  // Función para cambiar tema (día/noche)
  toggleTheme() {
    document.body.classList.toggle('night-mode');
  }
};

// ========================================
// 4. MÓDULO DE PERFIL DE USUARIO
// ========================================
const Profile = {
  // Función para cargar datos en el perfil
  cargarDatos() {
    if (perfilUsuario.fullName) {
      document.getElementById('profileName').textContent = perfilUsuario.fullName;
      document.getElementById('fullName').value = perfilUsuario.fullName;
    } else {
      document.getElementById('profileName').textContent = usuarioActual;
    }

    document.getElementById('age').value = perfilUsuario.age || '';
    document.getElementById('weight').value = perfilUsuario.weight || '';
    document.getElementById('height').value = perfilUsuario.height || '';
    document.getElementById('goal').value = perfilUsuario.goal || '';
    
    // Actualizar estadísticas
    document.getElementById('workoutCount').textContent = perfilUsuario.workoutCount || 0;
    document.getElementById('daysStreak').textContent = perfilUsuario.daysStreak || 0;
    document.getElementById('totalTime').textContent = perfilUsuario.totalTime || 0;

    // Actualizar avatar basado en el nombre
    const avatar = document.getElementById('profileAvatar');
    if (perfilUsuario.fullName) {
      avatar.textContent = perfilUsuario.fullName.charAt(0).toUpperCase();
    } else if (usuarioActual) {
      avatar.textContent = usuarioActual.charAt(0).toUpperCase();
    }
  },

  // Función para guardar perfil
  guardar() {
    perfilUsuario.fullName = document.getElementById('fullName').value;
    perfilUsuario.age = document.getElementById('age').value;
    perfilUsuario.weight = document.getElementById('weight').value;
    perfilUsuario.height = document.getElementById('height').value;
    perfilUsuario.goal = document.getElementById('goal').value;

    this.cargarDatos();
    UI.cerrarModal('profileModal');
    alert('¡Perfil actualizado exitosamente!');
  }
};

// ========================================
// 5. MÓDULO DE BÚSQUEDA Y NAVEGACIÓN
// ========================================
const Navigation = {
  // Función de búsqueda mejorada
  buscar() {
    const busqueda = document.getElementById('searchInput').value.toLowerCase();

    if (!busqueda) {
      alert('Por favor ingresa un término de búsqueda');
      return;
    }

    if (busqueda.includes('entrenamiento') || busqueda.includes('ejercicio') || 
        busqueda.includes('rutina') || busqueda.includes('pesas')) {
      window.location.href = 'entrenamiento.html';
    } else if (busqueda.includes('dieta') || busqueda.includes('alimentacion') || 
               busqueda.includes('nutricion') || busqueda.includes('comida')) {
      window.location.href = 'alimentacion.html';
    } else if (busqueda.includes('contacto') || busqueda.includes('ayuda') || 
               busqueda.includes('soporte')) {
      window.location.href = 'contacto.html';
    } else {
      alert('No se encontraron resultados para "' + busqueda + '". Intenta con: entrenamiento, dieta, o contacto.');
    }
  }
};

// ========================================
// 6. MÓDULO DE ENTRENAMIENTOS
// ========================================
const Workout = {
  // Función para mostrar entrenamiento
  mostrar() {
    const sexo = document.getElementById('sexo').value;
    const objetivo = document.getElementById('objetivo').value;

    if (!sexo || !objetivo) {
      // Animación de error
      const selects = document.querySelectorAll('select');
      selects.forEach(select => {
        if (!select.value) {
          select.style.border = '2px solid #ff6b6b';
          select.style.animation = 'shake 0.5s ease-in-out';
          setTimeout(() => {
            select.style.border = 'none';
            select.style.animation = 'none';
          }, 500);
        }
      });
      
      alert('🤔 Por favor selecciona ambas opciones para continuar');
      return false;
    }

    // Mostrar loading
    document.getElementById('form-datos').style.display = 'none';
    document.getElementById('loading').classList.add('active');

    // Simular carga
    setTimeout(() => {
      document.getElementById('loading').classList.remove('active');
      
      // Ocultar todos los bloques
      const bloques = document.querySelectorAll('.bloque-entrenamiento');
      bloques.forEach(bloque => {
        bloque.classList.add('oculto');
        bloque.style.display = 'none';
      });

      // Mostrar el bloque correspondiente
      const bloqueId = `${sexo}-${objetivo}`;
      const bloqueSeleccionado = document.getElementById(bloqueId);
      
      if (bloqueSeleccionado) {
        document.getElementById('contenido-entrenamiento').classList.add('visible');
        bloqueSeleccionado.style.display = 'block';
        bloqueSeleccionado.classList.remove('oculto');
        
        // Mostrar botón de regreso
        document.getElementById('btnRegreso').classList.add('visible');
        
        // Scroll suave al contenido
        setTimeout(() => {
          bloqueSeleccionado.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
    }, 2000);

    return false;
  },

  // Función para regresar al formulario
  regresarFormulario() {
    // Ocultar contenido de entrenamiento
    document.getElementById('contenido-entrenamiento').classList.remove('visible');
    document.getElementById('btnRegreso').classList.remove('visible');
    
    // Mostrar formulario con animación
    setTimeout(() => {
      document.getElementById('form-datos').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }
};

// ========================================
// 7. MÓDULO DE CONTACTO
// ========================================
const Contact = {
  // Función para enviar mensaje (simulada)
  enviarMensaje(event) {
    event.preventDefault();
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validaciones básicas
    if (!nombre.trim() || !email.trim() || !asunto.trim() || !mensaje.trim()) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }

    // Simular envío exitoso
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Limpiar formulario
    document.getElementById('contactForm').reset();
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);

    // En una aplicación real, aquí harías la llamada al servidor
    console.log('Mensaje enviado:', { nombre, email, telefono, asunto, mensaje });
  }
};

// ========================================
// 8. MÓDULO DE EFECTOS VISUALES
// ========================================
const Effects = {
  // Crear partículas de fondo
  crearParticulas() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const numParticulas = window.innerWidth < 768 ? 30 : 80;

    for (let i = 0; i < numParticulas; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      particlesContainer.appendChild(particle);
    }
  },

  // Configurar observer para animaciones
  setupScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observar elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll(
      '.bloque-comida, .consejos-section, .hidratacion-section, .recomendacion-final, .bloque-entrenamiento'
    );
    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });
  },

  // Efecto de escritura en títulos
  efectoEscritura(selector, delay = 500) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, delay);
  },

  // Easter egg: Konami code
  setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
      userInput.push(e.keyCode);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }
      
      if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
        // Activar modo "beast mode"
        document.body.style.filter = 'hue-rotate(180deg)';
        document.body.style.animation = 'pulse 2s infinite';
        
        setTimeout(() => {
          document.body.style.filter = 'none';
          document.body.style.animation = 'none';
        }, 5000);
        
        alert('🦁 BEAST MODE ACTIVATED! ¡Entrena como una bestia!');
        userInput = [];
      }
    });
  }
};

// ========================================
// 9. UTILIDADES
// ========================================
const Utils = {
  // Añadir CSS dinámico
  addCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  },

  // Scroll suave para navegación
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// ========================================
// 10. INICIALIZACIÓN Y EVENT LISTENERS
// ========================================
const App = {
  init() {
    // CSS adicionales
    this.setupStyles();
    
    // Event listeners principales
    this.setupEventListeners();
    
    // Efectos visuales
    Effects.crearParticulas();
    Effects.setupScrollAnimations();
    Effects.setupKonamiCode();
    
    // Utilidades
    Utils.setupSmoothScroll();
    
    // Mostrar modal de login al cargar
    UI.mostrarModal('loginModal');
  },

  setupStyles() {
    // Keyframes para shake
    const shakeKeyframes = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `;

    // CSS para modo noche
    const nightModeCSS = `
      .night-mode {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      }
      .night-mode .navbar {
        background: rgba(52, 73, 94, 0.9);
      }
    `;

    Utils.addCSS(shakeKeyframes + nightModeCSS);
  },

  setupEventListeners() {
    // Event listeners para cerrar modales al hacer click fuera
    window.addEventListener('click', function(event) {
      const modales = document.querySelectorAll('.modal');
      modales.forEach(modal => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    });

    // Event listener para Enter en búsqueda
    document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            Navigation.buscar();
          }
        });
      }

      // Cerrar menú móvil al hacer click en enlaces
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          document.getElementById('nav-menu')?.classList.remove('active');
        });
      });

      // Efectos en la navbar al hacer scroll
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
          if (scrolled > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(25px)';
          } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
          }
        }
      });

      // Efectos de hover mejorados
      document.addEventListener('mouseover', (e) => {
        if (e.target.matches('.video-link')) {
          e.target.style.transform = 'translateY(-3px) scale(1.05) rotateX(5deg)';
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target.matches('.video-link')) {
          e.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        }
      });

      // Efectos en elementos de contacto
      const contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = 'translateX(0) scale(1)';
        });
      });

      // Efecto de escritura en títulos de contacto
      Effects.efectoEscritura('.contact-title', 500);
    });
  }
};

// ========================================
// 11. FUNCIONES GLOBALES EXPUESTAS
// ========================================
// Estas funciones deben estar disponibles globalmente para el HTML

// Autenticación
window.registrarse = Auth.registrarse;
window.iniciarSesion = Auth.iniciarSesion;
window.cerrarSesion = Auth.cerrarSesion;

// UI
window.mostrarModal = UI.mostrarModal;
window.cerrarModal = UI.cerrarModal;
window.toggleMenu = UI.toggleMenu;
window.toggleTheme = UI.toggleTheme;

// Perfil
window.guardarPerfil = Profile.guardar;

// Navegación
window.buscar = Navigation.buscar;

// Entrenamientos
window.mostrarEntrenamiento = Workout.mostrar;
window.regresarFormulario = Workout.regresarFormulario;

// Contacto
window.enviarMensaje = Contact.enviarMensaje;

// ========================================
// 12. INICIALIZACIÓN DE LA APP
// ========================================
window.onload = function() {
  App.init();
};