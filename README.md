# aldeaconecta
# AldeaConecta

**Guía Interactiva de la Aldea Universitaria Los Guaritos**

Aplicación web ligera, **100% offline** y de bajo consumo de recursos, que integra una guía práctica estudiantil y un directorio colaborativo de saberes y servicios para la comunidad de la aldea universitaria Los Guaritos (aproximadamente 120 estudiantes).

---

## 📌 Problema que resuelve

La comunidad estudiantil de la sede enfrenta:

- **Información dispersa:** horarios, profesores, reglamentos, fechas clave y croquis no tienen un punto único de consulta.
- **Comunicación fragmentada:** los avisos circulan por canales informales y se pierden.
- **Desconocimiento de las capacidades internas:** nadie sistematiza las habilidades y servicios que los propios estudiantes pueden ofrecerse.

AldeaConecta centraliza la información y visibiliza el capital humano de la sede, fortaleciendo la integración y el apoyo mutuo.

---

## 🎯 Funcionalidades

### 1. Guía práctica
- Horarios
- Profesores
- Reglamentos
- Fechas clave
- Croquis de la sede
- Buzón de sugerencias

### 2. Directorio colaborativo de saberes y servicios
- Perfiles de habilidades y servicios ofrecidos por estudiantes
- Búsqueda y filtrado por categoría
- Alta mediante el buzón y curación manual del JSON

---

## 🏗️ Arquitectura

Aplicación web estática, **sin backend, sin cuentas y sin contraseñas**.

| Componente | Implementación |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 |
| Lógica | JavaScript (ES6+) |
| Datos | JSON estático (`data/guide.json`, `data/directory.json`) |
| Persistencia local | `localStorage` |
| Funcionamiento offline | Service Worker (rutas relativas) |
| Despliegue | GitHub Pages |
| Empaquetado móvil (opcional) | PWABuilder → APK Android |

### Patrón Repository
Ninguna vista accede directamente a `fetch` ni a `localStorage`. Solo los repositorios hablan con los datos:

- `js/repository/guideRepository.js`
- `js/repository/directoryRepository.js`

### Principios aplicados
- **SRP:** cada archivo hace una sola cosa.
- **Cero números mágicos:** constantes centralizadas en `js/config/constants.js`.
- **Zero Trust:** sin transmisión de contraseñas ni datos sensibles.
- **Degradación elegante:** si un JSON falla, la app muestra un aviso controlado y no se rompe.
- **Honestidad semántica:** el directorio es curado manualmente; no se presenta como "tiempo real".

---
aldeaconecta/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config/
│   │   └── constants.js
│   ├── repository/
│   │   ├── guideRepository.js
│   │   └── directoryRepository.js
│   ├── services/
│   │   └── buzonService.js
│   ├── ui/
│   │   ├── guideRenderer.js
│   │   └── directoryRenderer.js
│   └── main.js
├── data/
│   ├── guide.json
│   └── directory.json
├── docs/
│   ├── capitulo-I.md
│   └── propuesta.md
├── .gitignore
└── README.md
---


---

## 🚀 Despliegue en GitHub Pages

1. Crear el repositorio `aldeaconecta` (público para GitHub Free).
2. Subir los archivos.
3. Ir a `Settings → Pages`.
4. Seleccionar rama `main` y carpeta raíz (`/`).
5. Guardar. El sitio estará disponible en:
   `https://[tu-usuario].github.io/aldeaconecta/`

> ⚠️ **Service Worker:** debe registrarse con ruta relativa (`'service-worker.js'`), no con `/service-worker.js`, para que funcione correctamente en el subdirectorio de GitHub Pages.

---

## 🔄 Flujo de curación del directorio

El directorio es colaborativo mediante un flujo de curación manual:

1. El triunfador(a) envía su saber o servicio a través del buzón.
2. El buzón genera un texto exportable que se envía por el canal habitual de la sede.
3. El responsable revisa, valida el consentimiento y edita `data/directory.json`.
4. Se hace commit con mensaje semántico (`feat:`, `fix:`, `docs:`).
5. GitHub Pages actualiza automáticamente.

**Reglas de privacidad:**
- Se usa alias, no nombre real.
- El contacto es indirecto (vía buzón interno).
- Se registra `consent: true` y `verified: false` hasta validación.

---

## 📝 Convenciones de trabajo

### Commits semánticos
- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `refactor:` mejora de estructura sin cambiar comportamiento
- `docs:` documentación

### Identificadores
- IDs canónicos inmutables, en minúsculas y sin espacios (`calc-diferencial`).
- Etiquetas de búsqueda separadas de los IDs.

---

## 🛠️ Estado del proyecto

| Fase | Contenido | Estado |
|---|---|---|
| Fase 0 | Repositorio, esquema JSON, contenido semilla, guía estática | En progreso |
| Fase 1 | Buzón + Service Worker offline | Pendiente |
| Fase 2 | Directorio con búsqueda + flujo de curación | Pendiente |
| Fase 3 (opcional) | Empaquetado Android | Pendiente |

---

## 👥 Equipo

Proyecto Socio-Tecnológico del PNFI — Universidad Territorial Deltaica "Francisco Tamayo".

- [Ledezma-Carrizalez, Aurora Carolina] 
- [Ruiz Valderrey, Wolfang Isaac] 
- [Alvarez López, Jesus Adolfo] 

---

## 📄 Licencia

Proyecto académico sin fines de lucro. Uso educativo y comunitario.


## 📁 Estructura del repositorio
