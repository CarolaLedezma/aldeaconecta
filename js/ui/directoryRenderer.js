// js/ui/directoryRenderer.js

export class DirectoryRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`[DirectoryRenderer] Contenedor no encontrado: #${containerId}`);
    }
  }

  render(data) {
    if (!this.container || !data) return;

    // Limpiamos el "Cargando directorio..."
    this.container.innerHTML = '';

    // Cabecera
    const header = document.createElement('div');
    header.className = 'directory-header';
    header.innerHTML = `<p><small>Versión: ${data.version || 'N/A'} | Actualizado: ${data.lastUpdated || 'N/A'}</small></p>`;
    this.container.appendChild(header);

    // Si no hay categorías, mostramos mensaje controlado
    if (!data.categorias || data.categorias.length === 0) {
      this.container.innerHTML += '<p class="text-muted">Aún no hay saberes registrados.</p>';
      return;
    }

    // Iteramos por categorías
    data.categorias.forEach(categoria => {
      this._renderCategoria(categoria);
    });
  }

  _renderCategoria(categoria) {
    const section = document.createElement('div');
    section.className = 'directory-category';
    
    // Título de la categoría
    const title = document.createElement('h3');
    title.textContent = categoria.label || 'Sin categoría';
    section.appendChild(title);

    // Perfiles dentro de la categoría
    if (categoria.perfiles && categoria.perfiles.length > 0) {
      categoria.perfiles.forEach(perfil => {
        section.appendChild(this._createPerfilCard(perfil));
      });
    } else {
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'text-muted';
      emptyMsg.textContent = 'No hay perfiles en esta categoría.';
      section.appendChild(emptyMsg);
    }

    this.container.appendChild(section);
  }

  _createPerfilCard(perfil) {
    const card = document.createElement('div');
    card.className = 'directory-card';

    // Honestidad Semántica y Degradación Elegante en los datos
    const nombre = perfil.nombre || 'Sin nombre';
    const proveedor = perfil.proveedorAlias || 'Proveedor anónimo';
    const contacto = perfil.contacto || 'Contacto no disponible';
    const disponibilidad = perfil.disponibilidad || 'Horario no definido';

    card.innerHTML = `
      <h4>${nombre}</h4>
      <p><strong>Proveedor:</strong> ${proveedor}</p>
      <p><strong>Contacto:</strong> ${contacto}</p>
      <p><strong>Disponibilidad:</strong> ${disponibilidad}</p>
    `;

    // Añadimos un indicador visual si está verificado (opcional, buena práctica)
    if (perfil.verified) {
      card.innerHTML += `<span class="badge verified">✓ Verificado</span>`;
    }

    return card;
  }
}