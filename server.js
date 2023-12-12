import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

/**
 * Aplikasi server utama menggunakan Express.
 * @description Server ini mengatur middlewares dan router, dan menjalankan server.
 */

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('combined'));


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


includeRouter('app/router');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
