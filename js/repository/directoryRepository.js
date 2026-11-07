// js/repository/directoryRepository.js

export const directoryRepository = {
  /**
   * Obtiene los datos del directorio desde el JSON.
   */
  async getDirectory() {
    try {
      const response = await fetch('./data/directory.json');
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('[DirectoryRepository] Error al obtener el directorio:', error);
      throw error; // Para que main.js lo atrape
    }
  }
};