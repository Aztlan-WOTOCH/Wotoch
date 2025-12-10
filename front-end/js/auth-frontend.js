(function(){
  // Helpers
  function closeModal(id){
    const modal = document.getElementById(id);
    if(modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  function openModal(id){
    const modal = document.getElementById(id);
    if(modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // Login form
  const loginForm = document.querySelector('#loginModal form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!email || !password) {
        alert('Por favor ingresa correo y contraseña.');
        return;
      }

      try {
        const res = await window.wotochApi.loginWithEmail(email, password);
        if (res && res.token) {
          alert('Inicio de sesión correcto');
          closeModal('loginModal');
          // Optionally refresh UI or fetch profile
          try { window.wotochApi.getCurrentUser(); } catch(e){}
        } else {
          console.warn('Login response:', res);
          alert(res.mensaje || 'No se pudo iniciar sesión.');
        }
      } catch (err) {
        console.error(err);
        alert('Error en inicio de sesión. Revisa la consola.');
      }
    });
  }

  // Register form
  const registerForm = document.querySelector('#registerModal form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = registerForm.querySelector('input[type="email"]');
      const passwordInput = registerForm.querySelector('input[type="password"]');
      const dateInput = registerForm.querySelector('input[type="date"]');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const fecha_nacimiento = dateInput ? dateInput.value : '';

      if (!email || !password) {
        alert('Por favor ingresa correo y contraseña.');
        return;
      }

      // Derivar nombre_usuario desde el correo si no hay campo específico
      const nombre_usuario = email.split('@')[0] || 'usuario';
      const nombre = nombre_usuario.charAt(0).toUpperCase() + nombre_usuario.slice(1);

      try {
        const res = await window.wotochApi.registerWithEmail(nombre, nombre_usuario, email, fecha_nacimiento, password);
        if (res && res.token) {
          alert('Registro exitoso');
          closeModal('registerModal');
          // Optionally open profile modal or refresh
        } else {
          console.warn('Register response:', res);
          alert(res.mensaje || 'No se pudo registrar.');
        }
      } catch (err) {
        console.error(err);
        alert('Error en el registro. Revisa la consola.');
      }
    });
  }

})();
