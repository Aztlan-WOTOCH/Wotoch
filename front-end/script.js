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