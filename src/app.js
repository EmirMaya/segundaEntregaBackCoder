import express from 'express';
import __dirname from './utils.js';

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
});

const admin = true;

server.on('error', (e) => console.log(`Server error: ${e}`));

//para leer archivos json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(express.static(__dirname + "/public"));

