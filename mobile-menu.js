// Funcionalidad del Menú Móvil
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMobileMenu = document.querySelector('.close-mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      mobileMenuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (closeMobileMenu) {
      closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }

    // Cerrar menú al hacer clic en enlaces
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }
}