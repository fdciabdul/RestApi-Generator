
/**
 * Model User menggunakan Sequelize.
 * @extends Sequelize.Model
 * @description Mendefinisikan model 'User' dengan atribut dasar (perlu diperbarui).
 */
import Sequelize from 'sequelize';
import DB from '../config/db.js';

export class User extends Sequelize.Model {}
User.init({/* attributes */}, { sequelize: DB, modelName: 'user' });
