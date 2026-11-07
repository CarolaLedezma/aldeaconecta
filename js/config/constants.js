/**
 * @file constants.js
 * @description Centralización de constantes globales para evitar números mágicos.
 * Cumple con el principio de Responsabilidad Única (SRP).
 */

export const CONFIG = {
    // Rutas de los datos
    PATHS: {
        // Usamos rutas relativas para que funcione en Live Server y en GitHub Pages
        GUIDE_DATA: './data/guide.json',
        DIRECTORY_DATA: './data/directory.json'
    },
    
    // Configuración del Buzón de Sugerencias
    BUZON: {
        MAX_LENGTH: 500,          
        STORAGE_KEY: 'aldea_buzon_draft' 
    },
    
    // Configuración de la App
    APP: {
        VERSION: '1.0.0',
        ALDEA_NAME: 'Los Guaritos',
        CACHE_KEY_GUIDE: 'aldea_cache_guide_v1',
        CACHE_KEY_DIRECTORY: 'aldea_cache_dir_v1'
    },

    // Mensajes de UI
    MESSAGES: {
        ERROR_LOADING_GUIDE: 'No se pudo cargar la guía en este momento. Intente más tarde.',
        ERROR_LOADING_DIRECTORY: 'El directorio no está disponible offline todavía.',
        EMPTY_DIRECTORY: 'Aún no hay saberes registrados. ¡Sé el primero en compartir el tuyo!'
    }
};