import FilesContainer from "./FilesContainer.js";
import fs from 'fs';
import __dirname from "../../utils.js";

const path = __dirname + '/db/products.json';

export default class Products extends FilesContainer {
    getAll = async () => {
        try {
            //si hay algo lo trae, si no array vacio
            if (fs.existsSync(path)) {
                //read
                let data = await fs.promises.readFile(path, 'utf-8');
                let products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log('Error function getALL(): ' + error);
        }
    }

    save = async (product) => {
        try {
            let products = await this.getAll();
            if (products.length) { //si hay algo sigue el id
                product.id = products[products.length - 1].id + 1;
                product.date = new Date(Date.now()).toLocaleDateString();
                products.push(product);
                await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

            } else { //si no es id 1
                product.id = 1;
                product.date = new Date(Date.now()).toLocaleDateString();
                products.push(product);
                await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

            }
        } catch (error) {
            console.log('ERROR function save(): ' + error);
        }
    }

    getById = async (id) => {
        try {
            let products = await this.getAll();
            let product = products.find((element) => element.id === id);
            return product;
        } catch (error) {
            console.log('ERROR getById(): ' + error);
        }
    }

    deleteById = async (id) => {
        try {
            let products = await this.getAll();
            const newArray = products.filter(prod => prod.id != id);
            await fs.promises.writeFile(path, JSON.stringify(newArray, null, "\t"));
            return newArray;
        } catch (error) {
            console.log('ERROR deleteById(): ' + error);
        }
    }

    deleteAll = async () => {
        try {
            let products = await this.getAll();
            products = [];
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        } catch (error) { }
    }

    update = async (obj, id) => {
        try {

            let products = await this.getAll();
            let prodID = parseInt(id);
            products.map(function (prod) {
                if (prod.id === prodID) {
                    prod.title = obj.title;
                    prod.price = obj.price;
                    prod.thumbnail = obj.thumbnail;
                }
            });
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
            return products;
        } catch (error) {
            console.log('ERROR UPDATE(): ' + error);
        }
    }
}