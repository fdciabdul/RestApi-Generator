import fs from 'fs';
import path from 'path';

/**
 * Generates model files in the 'app/model' directory.
 * @param {Object} options - Configuration options for the model generation.
 * @param {string} options.moduleSystem - The module system to use ('ES6' or 'CommonJS').
 * @description Fungsi ini membuat file model dan index.js dalam direktori 'app/model'. Mendukung ES6 dan CommonJS.
 */
function generateModel({ moduleSystem }) {
    const modelDir = 'app/model';
    if (!fs.existsSync(modelDir)) {
      fs.mkdirSync(modelDir, { recursive: true });
    }
  
    const sampleModelUser = moduleSystem.sample 
    // Generate User model file
    const userModelContent = moduleSystem === 'ES6' ? 
      `
/**
 * Model User menggunakan Sequelize.
 * @extends Sequelize.Model
 * @description Mendefinisikan model 'User' dengan atribut dasar (perlu diperbarui).
 */
import Sequelize from 'sequelize';
import DB from '../config/db.js';

export class User extends Sequelize.Model {}
User.init({/* attributes */}, { sequelize: DB, modelName: 'user' });
` :
      `
/**
 * Model User menggunakan Sequelize.
 * @description Mendefinisikan model 'User' dengan atribut dasar (perlu diperbarui).
 */
const Sequelize = require('sequelize');
const DB = require('../config/db.js');

const User = DB.define('user', {/* attributes */});
module.exports = User;
`;
    fs.writeFileSync(path.join(modelDir, 'user.js'), userModelContent);
    
    // Generate index.js file in model directory
    const indexContent = moduleSystem === 'ES6' ? 
      `
import DB from '../config/db.js';
import { User } from './user.js';

const synchronizeModels = async () => {
  try {
    await DB.sync();
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Error creating database & tables: ', err);
  }
};

export { synchronizeModels, User };
` :
      `
const DB = require('../config/db.js');
const User = require('./user.js');

const synchronizeModels = async () => {
  try {
    await DB.sync();
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Error creating database & tables: ', err);
  }
};

module.exports = { synchronizeModels, User };
`;
    fs.writeFileSync(path.join(modelDir, 'index.js'), indexContent);
}

export default generateModel;
