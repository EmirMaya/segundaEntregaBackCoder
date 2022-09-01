import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'carts';

const cartsSchema = mongoose.Schema({
    products: Array

});

export default class Carts extends MongoDBContainer {
    constructor() {
        super(collection, cartsSchema);
    }

    getAll = async () => {
        try {
            let restult = await this.model.find();
            return restult;
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (id) => {
        try {
            let restult = await this.model.findById(id);
            return restult;
        } catch (error) {
            console.log(error);
        }
    }

    save = async (document) => {
        try {
            let result = await this.model.create(document);
            return result;
        } catch (error) {
            console.log(error);
        }
    }


    getProductsByCartId = async (id) => {
        try {
            let result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log('ERROR getProductsByCartId(): ' + error);
        }
    }

    deleteById = async (id) => {
        try {
            let result = await this.model.deleteById(id);
            return result;
        } catch (error) {
            console.log('ERROR deleteById(): ' + error);
        }
    }

    deleteProductsInCart = async (id) => {
        try {
            //la verdad no se si está bien este

            let result = await this.model.updateOne({ products: [] });
            return result;
        } catch (error) {
            console.log('ERROR deleteProductsInCart(): ' + error);
        }
    }

    deleteAll = async () => {
        try {
            let result = await this.model.deleteMany({});
            return result;
        } catch (error) {
            console.log('DELETE ERROR ' + error);
        }
    }

    update = async () => {
        try {
            //no sabria como traer el id de la collection de productos 
            let result = await this.model.updateOne({ products: [] });
            return result;
        } catch (error) {
            console.log('UPDATE CART ERROR ' + error);
        }
    }

};