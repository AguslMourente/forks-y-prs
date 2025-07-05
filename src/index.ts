#!/usr/bin/env node
const peliService = require('./pelis');

// Sacamos los flags y valores de process.argv
const args = process.argv.slice(2);
let searchTerm, tagTerm, sortProp;

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--search':
      searchTerm = args[i + 1];
      i++;
      break;
    case '--tag':
      tagTerm = args[i + 1];
      i++;
      break;
    case '--sort':
      sortProp = args[i + 1];
      i++;
      break;
  }
}

// Cargamos todas las películas
let pelis = peliService.getAll();

// Aplicamos search → tag → sort si vienen
if (searchTerm) pelis = peliService.search(searchTerm);
if (tagTerm)    pelis = peliService.filterByTag(tagTerm);
if (sortProp)   pelis = peliService.sortBy(sortProp);

// Y mostramos la tabla
console.table(pelis);
