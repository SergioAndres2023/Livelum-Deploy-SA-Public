const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');
const path = require('path');

// En runtime, los archivos están en dist/, no en src/
const baseUrl = path.join(__dirname, 'dist');

// Ajustar los paths para que apunten a los archivos compilados
const paths = {};
Object.keys(tsConfig.compilerOptions.paths || {}).forEach((key) => {
  const value = tsConfig.compilerOptions.paths[key];
  // Remover ./ del inicio y apuntar a los archivos compilados
  paths[key] = value.map((p) => p.replace('./src/', './src/').replace('./app/', './app/'));
});

tsConfigPaths.register({
  baseUrl,
  paths,
});
