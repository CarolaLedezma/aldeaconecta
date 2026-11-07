// js/main.js
import { GuideRenderer } from './ui/guideRenderer.js';
import { DirectoryRenderer } from './ui/directoryRenderer.js';
import { guideRepository } from './repository/guideRepository.js';
import { directoryRepository } from './repository/directoryRepository.js';

document.addEventListener('DOMContentLoaded', async () => {
    // --- CARGA DE LA GUÍA ---
    const guideRenderer = new GuideRenderer('contenedor-guia');
    try {
        const guideData = await guideRepository.getGuide();
        guideRenderer.render(guideData);
    } catch (error) {
        console.error("Fallo la carga de la guía:", error);
        const container = document.getElementById('contenedor-guia');
        if (container) container.innerHTML = '<p class="error">No se pudo cargar la guía. Intente más tarde.</p>';
    }

    // --- CARGA DEL DIRECTORIO ---
    const directoryRenderer = new DirectoryRenderer('contenedor-directorio');
    try {
        const directoryData = await directoryRepository.getDirectory();
        directoryRenderer.render(directoryData);
    } catch (error) {
        console.error("Fallo la carga del directorio:", error);
        const container = document.getElementById('contenedor-directorio');
        if (container) container.innerHTML = '<p class="error">El directorio no está disponible offline.</p>';
    }
});