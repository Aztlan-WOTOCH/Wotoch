// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const authButtons = document.querySelector('.auth-buttons');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    authButtons.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling para enlaces de navegación
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

// Sistema de Modales
const registerBtn = document.querySelector('.btn-register');
const loginBtn = document.querySelector('.btn-login');
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const closeModals = document.querySelectorAll('.close-modal');
const switchModals = document.querySelectorAll('.switch-modal');

// Abrir modal de registro
registerBtn.addEventListener('click', () => {
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Abrir modal de login
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Cerrar modales
closeModals.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        registerModal.classList.remove('active');
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cambiar entre modales
switchModals.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetModal = link.getAttribute('data-target');
        
        // Cerrar todos los modales primero
        registerModal.classList.remove('active');
        loginModal.classList.remove('active');
        
        // Abrir el modal objetivo
        document.getElementById(targetModal).classList.add('active');
    });
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        registerModal.classList.remove('active');
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Manejo de formularios
const registerForm = document.querySelector('#registerModal .modal-form');
const loginForm = document.querySelector('#loginModal .modal-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log('Registro enviado');
    // Simulación de registro exitoso
    alert('¡Registro exitoso!');
    registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí iría la lógica de login
    console.log('Login enviado');
    // Simulación de login exitoso
    alert('¡Inicio de sesión exitoso!');
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Efectos adicionales para inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

console.log('WOTOCH - Donaciones con Propósito cargado correctamente');

// ==========================================
// FUNCIONES REUTILIZABLES PARA TODAS LAS PÁGINAS
// ==========================================

// Función: Animación de perfil (click en foto de perfil)
function initProfileAnimation() {
    const profileBtn = document.getElementById('profileBtn');
    if (!profileBtn) return;
    
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const profileImg = document.getElementById('profileImg');
        if (!profileImg) return;
        
        const rect = profileBtn.getBoundingClientRect();
        
        // Crear clon animado
        const clone = profileImg.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.borderRadius = '50%';
        clone.style.zIndex = '9999';
        clone.style.transition = 'all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1.2s ease-in-out';
        clone.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
        clone.style.border = '4px solid #A25D53';
        clone.style.opacity = '1';
        document.body.appendChild(clone);
        
        // Forzar reflow
        clone.offsetHeight;
        
        // Posición final: exactamente donde está la foto en profile.html
        const sidebarWidth = 96;
        const paddingLeft = 48;
        const finalSize = 192;
        const finalLeft = sidebarWidth + paddingLeft;
        const finalTop = 64;
        
        clone.style.left = finalLeft + 'px';
        clone.style.top = finalTop + 'px';
        clone.style.width = finalSize + 'px';
        clone.style.height = finalSize + 'px';
        clone.style.opacity = '0.3';
        
        // Navegar después de la animación
        setTimeout(function() {
            window.location.href = 'profile.html';
        }, 1200);
    });
}

// Función: Selección de categoría (deseas_donar.html)
function selectCategory(categoryName) {
    console.log("Categoría seleccionada:", categoryName);
    alert("Has seleccionado: " + categoryName + ". Aquí iría el formulario de detalles.");
}

// Inicializar funciones cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initProfileAnimation();
});