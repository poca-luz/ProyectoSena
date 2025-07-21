// Variables globales para el estado de la sesión
        let usuarioActual = null;
        let perfilUsuario = {};

        // Función para mostrar modales
        function mostrarModal(modalId) {
            // Cerrar otros modales primero
            const modales = document.querySelectorAll('.modal');
            modales.forEach(modal => modal.style.display = 'none');
            
            // Mostrar el modal solicitado
            document.getElementById(modalId).style.display = 'flex';
        }

        // Función para cerrar modales
        function cerrarModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Función de registro
        function registrarse() {
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

            // Simular guardado (en una app real, esto iría a una base de datos)
            usuarioActual = usuario;
            perfilUsuario = perfilInicial;

            cerrarModal('registerModal');
            mostrarContenido();
            alert('¡Registro exitoso! Bienvenido a NO LIMITS');
        }

        // Función de inicio de sesión
        function iniciarSesion() {
            const usuario = document.getElementById('loginUsuario').value;
            const clave = document.getElementById('loginClave').value;

            if (!usuario || !clave) {
                alert('Por favor ingresa usuario y contraseña');
                return;
            }

            // Simular verificación de credenciales
            if (perfilUsuario.usuario === usuario && perfilUsuario.clave === clave) {
                usuarioActual = usuario;
                cerrarModal('loginModal');
                mostrarContenido();
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }

        // Función para mostrar el contenido principal
        function mostrarContenido() {
            document.getElementById('contenido').classList.remove('oculto');
            document.getElementById('userNameNav').textContent = usuarioActual || 'Mi Perfil';
            cargarDatosPerfil();
        }

        // Función para cargar datos en el perfil
        function cargarDatosPerfil() {
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
        }

        // Función para guardar perfil
        function guardarPerfil() {
            perfilUsuario.fullName = document.getElementById('fullName').value;
            perfilUsuario.age = document.getElementById('age').value;
            perfilUsuario.weight = document.getElementById('weight').value;
            perfilUsuario.height = document.getElementById('height').value;
            perfilUsuario.goal = document.getElementById('goal').value;

            cargarDatosPerfil();
            cerrarModal('profileModal');
            alert('¡Perfil actualizado exitosamente!');
        }

        // Función de búsqueda mejorada
        function buscar() {
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

        // Función para cerrar sesión
        function cerrarSesion() {
            if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
                usuarioActual = null;
                document.getElementById('contenido').classList.add('oculto');
                cerrarModal('profileModal');
                mostrarModal('loginModal');
            }
        }

        // Event listeners para cerrar modales al hacer click fuera
        window.addEventListener('click', function(event) {
            const modales = document.querySelectorAll('.modal');
            modales.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Event listener para la tecla Enter en los campos de búsqueda
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        buscar();
                    }
                });
            }
        });

        // Inicializar la aplicación
        window.onload = function() {
            // Mostrar modal de login al cargar la página
            mostrarModal('loginModal');
        };