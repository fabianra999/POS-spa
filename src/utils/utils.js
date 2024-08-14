/*
UserView.vue
 - import { capitalize, formatDate } from '../utils'; // Importa las funciones de utils.js
    - <p>{{ capitalize('hello world') }}</p>
*/

export function capitalize(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Busca un objeto en un array de objetos por una clave específica y su valor.
 * @param {Array} array - El array de objetos.
 * @param {String} key - La clave por la que se va a buscar.
 * @param {any} value - El valor de la clave que se está buscando.
 * @returns {Object|null} - El objeto encontrado o null si no se encuentra.
 */
export function findByKey(array, key, value) {
  if (value === null || value === undefined) {
    return [];
  }
  return array.find((obj) => obj[key] === value) || null;
}

export function filterByKey(array, key, value) {
  if (value === null || value === undefined) {
    return array;
  }
  return array.filter((obj) => obj[key] === value) || new Proxy([], {});
}

export default {
  capitalize,
  findByKey,
  filterByKey,
};
