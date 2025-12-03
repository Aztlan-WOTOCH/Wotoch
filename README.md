# 🌿 Rama `Front-end` – Wotoch  
&gt; Interfaz de usuario de la plataforma de donaciones con propósito.

## 📌 Objetivo de la rama
Unificar y pulir la **experiencia móvil y desktop** de las tres vistas principales:  
`index.html` | `como-funciona.html` | `quienes-somos.html`

---

## ✅ Entregables activos
| Tarea | Estado | Detalle |
|-------|--------|---------|
| **Navbar universal** | ✅ Listo | Mismo menú responsivo en las 3 páginas |
| **Botón hamburguesa** | ✅ Listo | Se abre/cierra sin superponer la “X” |
| **Modales login / registro** | ✅ Listo | Accesibles desde cualquier vista |
| **Tooltips informativos** | ✅ Listo | Con posicionamiento manual mobile-first |
| **Optimización móvil** | ✅ Listo | Modales adaptados a pantallas ≤ 375 px |

---

## 🧪 Pruebas recomendadas antes de merge
1. Abrir menú hamburguesa en iPhone SE → la “X” **no debe tapar** el icono original.  
2. Cambiar de página → el menú debe **cerrarse automáticamente**.  
3. Abrir modal → desactivar scroll del body.  
4. Cerrar con **ESC** o **clic fuera** → debe funcionar en las 3 vistas.

---

## 🛠 Stack técnico
- **Tailwind CSS** (v3) – clases utilitarias + configuración personalizada.  
- **JavaScript vanilla** – `main.js` único para toda la UI.  
- **SVG inline** – logo animado sin dependencias.  
- **CSS custom-properties** – paleta ODS y colores marca.

---

## 🌱 Próximos pasos (siguiente sprint)
- [ ] Hacer que el navbar sea un **componente reutilizable** (`header.html` → fetch).  
- [ ] Agregar **lazy-loading** de imágenes hero.  
- [ ] Tests de Lighthouse ≥ 95 en performance y a11y.  
- [ ] **Migrar a entorno XAMPP**: levantar proyecto en `localhost/wotoch` y configurar `.htaccess` para rutas limpias.  
- [ ] **Refactor de botones**: reemplazar `onclick="openModal()"` por **clases de comportamiento** (`data-behavior="openModal"`) y delegación de eventos (patrón *Interfaces de Usuario* visto en clase).  
- [ ] **Clases Java para lógica de negocio**: crear `UsuarioDAO`, `DonacionDAO` y `LoginServlet` conectados a MySQL vía XAMPP.  
- [ ] **Validación en tiempo real** con `Fetch API` desde los modales (disponibilidad de correo, contraseña segura, etc.).

---

&gt; Rama protegida: solo se permite merge vía **Pull Request** con review de otro front.
