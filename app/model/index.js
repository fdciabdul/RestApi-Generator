
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
