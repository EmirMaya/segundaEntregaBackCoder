import FilesContainer from "./FilesContainer.js";
import fs from 'fs';
import __dirname from "../../utils.js";

const path = __dirname + '/db/carts.json';

export default class Carts extends FilesContainer {
    getAll = async () => {
        try {
            //si hay algo lo trae, si no array vacio
            if (fs.existsSync(path)) {
                //read
                let data = await fs.promises.readFile(path, 'utf-8');
                let carts = JSON.parse(data);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            console.log('Error function getALL(): ' + error);
        }
    }

    getById = async (id) => {
        const data = await this.getAll();
        return data.find((element) => element.id === id);
    }

    save = async (cart) => {
        try {
            let carts = await this.getAll();
      
            if (carts.length) { //si hay algo sigue el id
                cart.id = carts[carts.length - 1].id + 1;
                cart.products = [];
                cart.timestamp = new Date(Date.now()).toLocaleDateString();
                carts.push(cart);
                await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));

            } else { //si no es id 1
                cart.id = 1;
                cart.products = [];
                cart.date = new Date(Date.now()).toLocaleDateString();
                carts.push(cart);
                await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
            }
        } catch (error) {
            console.log('ERROR function save(): ' + error);
        }
    }

    getProductsByCartId = async (id) => {
        try {
            let carts = await this.getAll();
            let cart = carts.find((element) => element.id === id);
            return cart.products;
        } catch (error) {
            console.log('ERROR getProductsByCartId(): ' + error);
        }
    }

    deleteById = async (id) => {
        try {
            let carts = await this.getAll();
            const newArray = carts.filter(cart => cart.id != id);
            await fs.promises.writeFile(path, JSON.stringify(newArray, null, "\t"));
            return newArray;
        } catch (error) {
            console.log('ERROR deleteById(): ' + error);
        }
    }

    deleteProductsInCart = async (cid, pid) => {
        try {
            let carts = await this.getAll();
            let cart = carts.find((element) => element.id === cid);
            let products = cart.products.find((element) => element.id != pid);
            console.log(carts);
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
            return products;
        } catch (error) {
            console.log('ERROR deleteProductsInCart(): ' + error);
        }
    }

    deleteAll = async () => {
        try {
            let carts = await this.getAll();
            carts = [];
            await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        } catch (error) {
            console.log('DELETE ERROR ' + error);
        }
    }

    update = async (obj, cid) => {
        try {
            let carts = await this.getAll();
            let cart = carts.find((element) => element.id === cid);
            //traigo los productos por id de carro
            let products = await this.getProductsByCartId(cid);
            //busc
            let product = products.find((element) => element.id === pid);
            if (product) {
                let Quantity = product.quantity;
                product.quantity = (
                    parseInt(findedProductQuantity) + parseInt(req.body.quantity)
                ).toString();
                cart.products = products;
                await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
            } else {
                products.push(obj)
                cart.products = products;
                await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
            }

        } catch (error) {
            console.log('UPDATE CART ERROR ' + error);
        }
    }
}