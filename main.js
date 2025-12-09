// Funcionalidad del Menú Móvil
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden', '-translate-x-full');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            });
        }

        // Cerrar menú al hacer clic en enlaces
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
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
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Cerrar menú móvil si está abierto
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.add('-translate-x-full');
            mobileMenu.classList.remove('active');
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

// POSICIONAMIENTO MANUAL DE TOOLTIPS - AJUSTA ESTAS FUNCIONES
function positionTooltipManual(tooltipId, position) {
    const tooltip = document.getElementById(tooltipId);
    if (!tooltip) return;
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    const tooltipRect = tooltip.getBoundingClientRect();
    let left, top;
    
    // POSICIONES PREDEFINIDAS - ¡CAMBIAR ESTOS VALORES SEGÚN NECESITES!
    switch(position) {
        case 'top-right':
            left = viewport.width - tooltipRect.width - 50;  // 50px desde la derecha
            top = 100;  // 100px desde arriba
            break;
        case 'top-left':
            left = 50;  // 50px desde la izquierda
            top = 100;  // 100px desde arriba
            break;
        case 'bottom-right':
            left = viewport.width - tooltipRect.width - 50;
            top = viewport.height - tooltipRect.height - 100;  // 100px desde abajo
            break;
        case 'bottom-left':
            left = 50;
            top = viewport.height - tooltipRect.height - 100;
            break;
        case 'center':
            left = (viewport.width - tooltipRect.width) / 2;
            top = (viewport.height - tooltipRect.height) / 2;
            break;
        default:
            // Posición por defecto (centro superior)
            left = (viewport.width - tooltipRect.width) / 2;
            top = 150;
    }
    
    // Asegurar que no se salga de los límites
    left = Math.max(10, Math.min(left, viewport.width - tooltipRect.width - 10));
    top = Math.max(10, Math.min(top, viewport.height - tooltipRect.height - 10));
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Función para mostrar tooltip con posicionamiento manual
function showTooltip(trigger) {
    const tooltipId = trigger.getAttribute('data-tooltip');
    const tooltip = document.getElementById(tooltipId);
    
    if (!tooltip) return;
    
    // Ocultar tooltip anterior si existe
    if (activeTooltip && activeTooltip !== tooltip) {
        activeTooltip.classList.add('hidden');
    }
    
    // POSICIONAMIENTO MANUAL - ¡CAMBIAR ESTAS POSICIONES SEGÚN NECESITES!
    if (window.innerWidth <= 768) {
        // En móvil, siempre centrar
        positionTooltipManual(tooltipId, 'center');
    } else {
        // En desktop, usar posiciones específicas
        if (tooltipId === 'passwordTips') {
            positionTooltipManual('passwordTips', 'top-right'); // Cambia a 'top-left', 'bottom-right', etc.
        } else if (tooltipId === 'birthdayInfo') {
            positionTooltipManual('birthdayInfo', 'top-left'); // Cambia a 'top-right', 'bottom-left', etc.
        } else {
            // Para otros tooltips, usar posición por defecto
            positionTooltipManual(tooltipId, 'center');
        }
    }
    
    tooltip.classList.remove('hidden');
    activeTooltip = tooltip;
}

// Funcionalidad para los tooltips
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    
    let activeTooltip = null;
    let tooltipTimeout;
    
    tooltipTriggers.forEach(trigger => {
        // Mostrar tooltip al hacer hover
        trigger.addEventListener('mouseenter', (e) => {
            clearTimeout(tooltipTimeout);
            showTooltip(trigger);
        });
        
        // Ocultar tooltip al salir del trigger
        trigger.addEventListener('mouseleave', () => {
            tooltipTimeout = setTimeout(() => {
                hideAllTooltips();
            }, 300);
        });
        
        // Para dispositivos táctiles
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const tooltipId = trigger.getAttribute('data-tooltip');
            const tooltip = document.getElementById(tooltipId);
            
            if (!tooltip) return;
            
            // Si el tooltip ya está visible, ocultarlo
            if (!tooltip.classList.contains('hidden')) {
                hideAllTooltips();
            } else {
                showTooltip(trigger);
            }
        });
    });
    
    // Mantener tooltip visible si el mouse está sobre él
    document.querySelectorAll('[id$="Tips"], [id$="Info"]').forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            clearTimeout(tooltipTimeout);
        });
        
        tooltip.addEventListener('mouseleave', () => {
            tooltipTimeout = setTimeout(() => {
                tooltip.classList.add('hidden');
                activeTooltip = null;
            }, 300);
        });
        
        // Cerrar tooltip al tocar en móvil
        tooltip.addEventListener('click', (e) => {
            e.stopPropagation();
            hideAllTooltips();
        });
    });
    
    // Ocultar tooltips al hacer scroll, redimensionar o click fuera
    window.addEventListener('scroll', hideAllTooltips);
    window.addEventListener('resize', hideAllTooltips);
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tooltip-trigger') && !e.target.closest('.tooltip')) {
            hideAllTooltips();
        }
    });
}

function hideAllTooltips() {
    document.querySelectorAll('[id$="Tips"], [id$="Info"]').forEach(tooltip => {
        tooltip.classList.add('hidden');
    });
    activeTooltip = null;
}

// Función para mostrar alertas personalizadas
function alertCustom(message) {
    const modalId = 'custom-alert-modal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 opacity-0 pointer-events-none';
        modal.innerHTML = `
            <div class="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform scale-95 transition-transform duration-300">
                <h3 class="text-xl font-bold mb-4 text-primary-brown">Notificación</h3>
                <p id="alert-message" class="text-gray-700 mb-6"></p>
                <button id="close-alert" class="w-full py-2 bg-primary-brown text-white rounded-lg hover:bg-opacity-90 transition">
                    Cerrar
                </button>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('close-alert').addEventListener('click', () => {
            hideModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('opacity-100')) {
                hideModal(modal);
            }
        });
    }

    document.getElementById('alert-message').textContent = message;
    showModal(modal);
}

function showModal(modal) {
    modal.classList.remove('pointer-events-none', 'opacity-0');
    modal.classList.add('opacity-100');
    modal.querySelector('div').classList.remove('scale-95');
    modal.querySelector('div').classList.add('scale-100');
}

function hideModal(modal) {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('pointer-events-none');
    }, 300);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initTooltips();
    
    // Cerrar modales al hacer clic fuera
    document.addEventListener('click', (e) => {
        // Cerrar modales
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
            // Cerrar modales
            const modals = document.querySelectorAll('[id$="Modal"]');
            modals.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    closeModal(modal.id);
                }
            });
            
            // Cerrar tooltips
            hideAllTooltips();
        }
    });
});

// Hacer publicación: activar carga de archivo
document.addEventListener('DOMContentLoaded', () => {
  const fileDrop = document.querySelector('.file-drop');
  const fileInput = document.querySelector('.file-input');

  if (!fileDrop || !fileInput) return;

  fileDrop.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      fileDrop.querySelector('.file-text').textContent = `Archivo: ${file.name}`;
    }
  });

  // Drag & drop visual (opcional)
  fileDrop.addEventListener('dragover', e => {
    e.preventDefault();
    fileDrop.classList.add('border-primary-brown');
  });

  fileDrop.addEventListener('dragleave', () => {
    fileDrop.classList.remove('border-primary-brown');
  });

  fileDrop.addEventListener('drop', e => {
    e.preventDefault();
    fileDrop.classList.remove('border-primary-brown');
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      fileDrop.querySelector('.file-text').textContent = `Archivo: ${file.name}`;
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
      const fileInput = document.getElementById('fileInput');
      const imagePreview = document.getElementById('imagePreview');
      const previewImage = document.getElementById('previewImage');
      const previewVideo = document.getElementById('previewVideo');
      const removeImageBtn = document.getElementById('removeImageBtn');
      
      // Cuando se hace clic en el área de vista previa, activa el input de archivo
      imagePreview.addEventListener('click', function() {
        fileInput.click();
      });
      
      // Cuando se selecciona un archivo
      fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const fileType = file.type.split('/')[0]; // 'image' o 'video'
          
          const reader = new FileReader();
          
          reader.onload = function(e) {
            if (fileType === 'image') {
              previewImage.src = e.target.result;
              previewImage.style.display = 'block';
              previewVideo.style.display = 'none';
            } else if (fileType === 'video') {
              previewVideo.src = e.target.result;
              previewVideo.style.display = 'block';
              previewImage.style.display = 'none';
            }
            
            imagePreview.classList.add('has-image');
            removeImageBtn.classList.remove('hidden');
          };
          
          reader.readAsDataURL(file);
        }
      });
      
      // Eliminar la imagen/video seleccionado
      removeImageBtn.addEventListener('click', function() {
        fileInput.value = '';
        previewImage.src = '';
        previewVideo.src = '';
        previewImage.style.display = 'none';
        previewVideo.style.display = 'none';
        imagePreview.classList.remove('has-image');
        removeImageBtn.classList.add('hidden');
      });
    });