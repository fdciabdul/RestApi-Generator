
/**
 * Router dasar untuk aplikasi.
 * @param {Express.Application} app - Instance aplikasi Express.
 * @description Mendefinisikan rute '/' yang mengirim 'Hello World!'.
 */
export default function (app) {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
};