// js/repository/guideRepository.js

export const guideRepository = {
  /**
   * Obtiene los datos de la guía desde el JSON.
   * Aplica Degradación Elegante si falla la red.
   */
  async getGuide() {
    try {
      // Asumiendo que estás sirviendo desde la raíz (Live Server)
      const response = await fetch('./data/guide.json');
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('[GuideRepository] Error al obtener la guía:', error);
      throw error; // Lanzamos el error para que main.js lo atrape
    }
  }
};