import fs from 'fs';
import path from 'path';


function generateRouter({ moduleSystem }) {
    const routerDir = 'app/router';
    if (!fs.existsSync(routerDir)) {
      fs.mkdirSync(routerDir, { recursive: true });
    }
  
    const routerContent = moduleSystem === 'ES6' ? 
      `
/**
 * Router dasar untuk aplikasi.
 * @param {Express.Application} app - Instance aplikasi Express.
 * @description Mendefinisikan rute '/' yang mengirim 'Hello World!'.
 */
export default function (app) {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
};` :
      `
/**
 * Router dasar untuk aplikasi.
 * @param {Express.Application} app - Instance aplikasi Express.
 * @description Mendefinisikan rute '/' yang mengirim 'Hello World!'.
 */
module.exports = function(app) {
    app.get('/', function(req, res) {
      res.send('Hello World!');
    });
};`;
  
    fs.writeFileSync(path.join(routerDir, 'index.js'), routerContent);
}

export default generateRouter;
