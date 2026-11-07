// js/ui/guideRenderer.js

/**
 * Clase encargada ÚNICAMENTE de transformar los datos de la guía en HTML.
 * Cumple con SRP: No hace fetch, no valida red, solo pinta.
 */
export class GuideRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[GuideRenderer] Contenedor no encontrado: #${containerId}`);
    }
  }

  /**
   * Método principal que orquesta el renderizado.
   * @param {Object} data - El objeto JSON completo de la guía.
   */
  render(data) {
    if (!this.container || !data) return;

    // Degradación elegante: Limpiamos y mostramos cabecera
    this.container.innerHTML = '';
    this._renderHeader(data);

    // Renderizamos cada sección si existe (Tolerancia a fallos)
    if (data.horarios) this._renderHorarios(data.horarios);
    if (data.profesores) this._renderProfesores(data.profesores);
    if (data.reglamentos) this._renderReglamentos(data.reglamentos);
    if (data.fechasClave) this._renderFechasClave(data.fechasClave);
    if (data.croquis) this._renderCroquis(data.croquis);
  }

  _renderHeader(data) {
    const header = document.createElement('div');
    header.className = 'guide-header';
    header.innerHTML = `
      <p><small>Versión: ${data.version || 'N/A'} | Actualizado: ${data.lastUpdated || 'N/A'} | Aldea: ${data.aldea || 'N/A'}</small></p>
    `;
    this.container.appendChild(header);
  }

  _renderHorarios(horarios) {
    if (horarios.length === 0) return;
    
    const section = this._createSection('Horarios');
    horarios.forEach(h => {
      const card = this._createCard(h.titulo);
      card.innerHTML += `<p>${h.notas || 'Sin notas adicionales'}</p>`;
      // Degradación elegante para imágenes
      if (h.imagenUrl && h.imagenUrl.trim() !== '') {
        card.innerHTML += `<img src="${h.imagenUrl}" alt="${h.titulo}" class="guide-img">`;
      } else {
        card.innerHTML += `<p class="text-muted"><em>(Imagen no disponible)</em></p>`;
      }
      section.appendChild(card);
    });
    this.container.appendChild(section);
  }

  _renderProfesores(profesores) {
    if (profesores.length === 0) return;
    
    const section = this._createSection('Profesores');
    const ul = document.createElement('ul');
    profesores.forEach(p => {
      ul.innerHTML += `<li><strong>${p.nombre}</strong> - ${p.materia} (Contacto: ${p.contacto})</li>`;
    });
    section.appendChild(ul);
    this.container.appendChild(section);
  }

  _renderReglamentos(reglamentos) {
    if (reglamentos.length === 0) return;

    const section = this._createSection('Reglamentos');
    const ul = document.createElement('ul');
    reglamentos.forEach(r => {
      // Degradación elegante: Si la url es "#", no es un enlace real
      const url = r.url && r.url !== '#' ? r.url : null;
      const content = url 
        ? `<a href="${url}" target="_blank">${r.titulo}</a>` 
        : `${r.titulo} <em>(Enlace no disponible)</em>`;
      
      ul.innerHTML += `<li>${content}</li>`;
    });
    section.appendChild(ul);
    this.container.appendChild(section);
  }

  _renderFechasClave(fechas) {
    if (fechas.length === 0) return;

    const section = this._createSection('Fechas Clave');
    const ul = document.createElement('ul');
    fechas.forEach(f => {
      ul.innerHTML += `<li><strong>${f.fecha}</strong>: ${f.evento}</li>`;
    });
    section.appendChild(ul);
    this.container.appendChild(section);
  }

  _renderCroquis(croquis) {
    const section = this._createSection('Croquis');
    const p = document.createElement('p');
    p.textContent = croquis.descripcion || 'Sin descripción';
    section.appendChild(p);

    if (croquis.imagenUrl && croquis.imagenUrl.trim() !== '') {
      section.innerHTML += `<img src="${croquis.imagenUrl}" alt="Croquis" class="guide-img">`;
    } else {
      section.innerHTML += `<p class="text-muted"><em>(Croquis no disponible)</em></p>`;
    }
    this.container.appendChild(section);
  }

  // --- Helpers para mantener el código DRY (Don't Repeat Yourself) ---

  _createSection(title) {
    const section = document.createElement('div');
    section.className = 'guide-section';
    section.innerHTML = `<h3>${title}</h3>`;
    return section;
  }

  _createCard(title) {
    const card = document.createElement('div');
    card.className = 'guide-card';
    card.innerHTML = `<h4>${title}</h4>`;
    return card;
  }
}