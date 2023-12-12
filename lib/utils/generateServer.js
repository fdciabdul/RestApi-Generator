import fs from 'fs';

function generateServer({ moduleSystem }) {
    const importStatement = moduleSystem === 'ES6' ? 
      `import express from 'express';\nimport fs from 'fs';\nimport path from 'path';\nimport morgan from 'morgan';\n` :
      `const express = require('express');\nconst fs = require('fs');\nconst path = require('path');\nconst morgan = require('morgan');\n`;

    const includeRouterFunction = moduleSystem === 'ES6' ? 
      `
/**
 * Dinamis mengimpor router dari direktori yang diberikan.
 * @async
 * @param {string} folderName - Nama direktori yang berisi router.
 * @description Fungsi ini secara rekursif mencari dan mengimpor file router.
 *              Ini mendukung sistem modul ES6.
 */
async function includeRouter(folderName) {
  const files = fs.readdirSync(folderName);

  for (const file of files) {
    const fullName = path.join(folderName, file);
    const stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      await includeRouter(fullName);
    } else if (file.toLowerCase().endsWith('.js')) {
      const router = await import('./' + fullName);
      router.default(app);
    }
  }
}
` :
      `
/**
 * Dinamis memuat router dari direktori yang diberikan.
 * @param {string} folderName - Nama direktori yang berisi router.
 * @description Fungsi ini secara rekursif mencari dan memuat file router.
 *              Ini mendukung sistem modul CommonJS.
 */
function includeRouter(folderName) {
  fs.readdirSync(folderName).forEach(function(file) {
    const fullName = path.join(folderName, file);
    const stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      includeRouter(fullName);
    } else if (file.toLowerCase().endsWith('.js')) {
      require('./' + fullName)(app);
    }
  });
}
`;

    const serverContent = `${importStatement}
/**
 * Aplikasi server utama menggunakan Express.
 * @description Server ini mengatur middlewares dan router, dan menjalankan server.
 */

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('combined'));

${includeRouterFunction}

includeRouter('app/router');

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
`;

    fs.writeFileSync('server.js', serverContent);
}


export default generateServer;