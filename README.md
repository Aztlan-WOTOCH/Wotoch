
# Wotoch – Donaciones con Propósito  
> Donde la generosidad se hace verbo

[![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow.svg)](https://github.com/ErwinRomeo/Wotoch/tree/front-end)

---

## Visión del proyecto
La desigualdad económica, el desperdicio de recursos y la falta de canales eficientes para ayudar a quienes más lo necesitan afectan directamente la calidad de vida en la Ciudad de México.  
**Wotoch** es una plataforma web que conecta a personas, empresas e instituciones con causas sociales, ambientales y de bienestar comunitario para donar alimentos, ropa, medicinas y artículos tecnológicos, promoviendo una cultura de solidaridad y aprovechamiento responsable de recursos.  
Con esta iniciativa contribuimos a los **Objetivos 1 (Fin de la pobreza), 2 (Hambre cero), 10 (Reducción de las desigualdades) y 12 (Producción y consumo responsables)** de la Agenda 2030, fomentando una CDMX más equitativa, sostenible y unida.

---

## Objetivos de Desarrollo Sostenible
| ODS | Enfoque |
|-----|---------|
| **11** ‑ Ciudades sostenibles | Fomentar economía circular local |
| **12** ‑ Producción y consumo responsable | Extender vida útil de productos, no comprar más de lo necesario y no desperdiciar productos perecederos |
| **13** ‑ Acción por el clima | Reducir emisiones mediante la reutilización de artículos|

---

## Integrantes & Responsabilidades
| Nombre | Rol principal | Funciones clave |
|--------|---------------|-----------------|
| **Balam Álvarez** | Líder de proyecto / QA | Documentación, pruebas de calidad y control de versiones |
| **Erwin Amezcua** | Front-end / DevOps | Desarrollo general de la página web y gestión del repositorio |
| **Kamila Pineda** | Back-end / Diseñadora | Diseño en Figma e integración con base de datos Supebase |
| **Victoria Hernández** | Front-end / Analista | Flujo Lucidchart, diseño en Figma y desarrollo de vistas |
| **Isaac Silis** | Back-end | Implementación y mantenimiento de base de datos Supebase |

*Para tareas detalladas por sprint consultar la hoja «Backlog» del enlace abajo.*

---

## Diagrama de flujo general
Accede al mapa completo de procesos y casos de uso:  
🔗 [Lucidchart – Wotoch Flow](https://lucid.app/lucidchart/d254030a-4693-4ec3-8a98-662c5f355852/edit?view_items=IAwLaaGdBQIP&page=0_0&invitationId=inv_f0496778-b23d-48ff-af34-8d1640841b2a)

---

## Backlog & Roadmap
Plan de tareas, responsables y fechas (Google Sheets público):  
🔗 [Wotoch Backlog](https://docs.google.com/spreadsheets/d/18nbPCQ-pjm2xrMYsJirmiHzWuVViae6b/edit?usp=sharing&ouid=114746856715131739508&rtpof=true&sd=true)

---

## Tecnologías
| Capa | Stack |
|------|-------|
| **Front-end** | HTML5, CSS3, JavaScript vanilla |
| **Back-end** | Supebase (Auth & Firestore) |
| **Diseño** | Figma, Lucidchart |
| **Control de versiones** | GitHub Flow – rama `front-end` protegida vía PR |

---

## Instalación local
1. Clona el repo:
   ```bash
   https://github.com/Aztlan-WOTOCH/Wotoch.git
   ```
2. Abre `index.html` en tu navegador o sirve la carpeta con Live Server.  
3. (Opcional) Si usas XAMPP, coloca la carpeta en `htdocs/wotoch` y visita:
   ```
   http://localhost/wotoch
   ```

---

## Estructura del proyecto
```
wotoch/
├─ database/          # Reglas y mockups de Firebase
├─ src/               # Lógica Java (próximamente)
├─ web/
│  ├─ css/            # styles.css, styleInicio.css
│  ├─ js/             # main.js, mobile-*.js
│  ├─ img/            # Imágenes públicas
│  └─ *.html          # Vistas (index, como-funciona, quienes-somos)
├─ README.md
└─ LICENSE
```

---

## Funcionalidades clave implementadas
### Frontend
- **Navbar universal responsivo** con menú hamburguesa sin solapamiento  
- **Modales login/registro** accesibles desde cualquier vista  
- **Tooltips informativos** con posicionamiento manual mobile-first  
- **Optimización móvil** para pantallas ≤ 375 px  
- **Animaciones suaves** con CSS transitions  

### Backend
- **Autenticación con Firebase** (email/google)  
- **Firestore** para publicaciones y donaciones  
- **Reglas de seguridad** activas en modo prueba  

---

## Cómo contribuir
1. Crea un fork y una rama desde `front-end`.  
2. Nombra tu rama: `feat/login-modal` o `fix/navbar-z-index`.  
3. Asegura **Lighthouse ≥ 95** en Performance y Accesibilidad.  
4. Abre **Pull Request** con capturas de móvil y desktop.

---

## Licencia
 [![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow.svg)](LICENSE)

---

## Contacto
¿Dudas o sugerencias?  
Abre un **Issue**

---
**¡Juntos hacemos del planeta un lugar mejor, una donación a la vez!** 🌍💚
```
