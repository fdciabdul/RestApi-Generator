import fs from 'fs';
import path from 'path';

/**
 * Generates a Sequelize configuration file in the 'app/config' directory.
 * @param {Object} options - Configuration options for the database.
 * @param {string} options.moduleSystem - The module system to use ('ES6' or 'CommonJS').
 * @param {string} options.database - The database type (e.g., 'MySQL', 'PostgreSQL').
 * @description Fungsi ini membuat file konfigurasi untuk Sequelize, mendukung berbagai jenis database. Mendukung ES6 dan CommonJS.
 */
function generateConfig({ moduleSystem, database }) {
    const configDir = 'app/config';
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const importStatement = moduleSystem === 'ES6' ? 
      `import Sequelize from 'sequelize';\n` :
      `const Sequelize = require('sequelize');\n`;

    const configContent = `${importStatement}
/**
 * Konfigurasi database menggunakan Sequelize.
 * @description Konfigurasi untuk koneksi database '${database}'. Sesuaikan 'database', 'username', dan 'password'.
 */
const DB = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: '${database.toLowerCase()}',
    // Additional Sequelize configuration
});

export default DB;`;

    fs.writeFileSync(path.join(configDir, 'db.js'), configContent);
}

export default generateConfig;
