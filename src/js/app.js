console.log('Hello motherfucker!');

// Кастомная функция из папки с модулями
import * as flsFunctions from './modules/functions.js';
flsFunctions.isWebp();

// Готовая функция, которую установили в папку node_modules/
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper(); // и т.д.