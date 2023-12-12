import Sequelize from 'sequelize';

/**
 * Konfigurasi database menggunakan Sequelize.
 * @description Konfigurasi untuk koneksi database 'MySQL'. Sesuaikan 'database', 'username', dan 'password'.
 */
const DB = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    // Additional Sequelize configuration
});

export default DB;