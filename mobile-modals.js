// Funcionalidad del Menú Móvil
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden', '-translate-x-full');
            mobileMenuButton.classList.add('active');
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
            mobileMenuButton.classList.remove('active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        });

        // Cerrar menú al hacer clic en enlaces
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
                mobileMenuButton.classList.remove('active');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            });
        });
    }
}

// Funcionalidad de Modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Cerrar menú móvil si está abierto
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('-translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    setTimeout(() => {
        openModal(toModalId);
    }, 200);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    // Cerrar modales al hacer clic fuera
    document.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('[id$="Modal"]');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('[id$="Modal"]');
            modals.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    closeModal(modal.id);
                }
            });
        }
    });

    // Asignar eventos a botones existentes
    const loginButtons = document.querySelectorAll('button');
    loginButtons.forEach(button => {
        if (button.textContent.includes('Iniciar sesión') && !button.hasAttribute('onclick')) {
            button.setAttribute('onclick', "openModal('loginModal')");
        }
        if (button.textContent.includes('Regístrate') && !button.hasAttribute('onclick')) {
            button.setAttribute('onclick', "openModal('registerModal')");
        }
    });
});