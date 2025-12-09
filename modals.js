// Funcionalidad de Modales
function initModals() {
  // Abrir modal
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Cerrar modal
  document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  // Cambiar entre modales
  document.querySelectorAll('.switch-modal').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const fromModalId = link.getAttribute('data-from');
      const toModalId = link.getAttribute('data-to');
      switchModal(fromModalId, toModalId);
    });
  });

  // Cerrar modales al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id);
    }
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Cerrar menú móvil si está abierto
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.querySelector('.mobile-menu-btn').classList.remove('active');
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function switchModal(fromModalId, toModalId) {
  closeModal(fromModalId);
  setTimeout(() => {
    openModal(toModalId);
  }, 200);
}

// Función para mostrar alertas personalizadas
function alertCustom(message) {
  const modalId = 'custom-alert-modal';
  let modal = document.getElementById(modalId);
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="text-xl font-bold mb-4 text-primary-brown">Notificación</h3>
          <p id="alert-message" class="text-gray-700 mb-6"></p>
          <button class="close-alert w-full py-2 bg-primary-brown text-white rounded-lg hover:bg-opacity-90 transition">
            Cerrar
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.querySelector('.close-alert').addEventListener('click', () => {
      closeModal(modalId);
    });
  }

  document.getElementById('alert-message').textContent = message;
  openModal(modalId);
}

    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'hero-tittle-color': '#D67840',
            'primary-brown': '#A25D53',
            'light-brown': '#E8DDC8',
            'text-brown': '#000000',
            'teal-brand': '#0D9488',
            'sdg-12': '#C99933',
            'sdg-11': '#E66A27',
            'sdg-13': '#408246',
          },
          fontFamily: {
            sans: ['Lexend'],
          }
        }
      }
    }