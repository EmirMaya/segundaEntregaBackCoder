import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'products';

const productsSchema = mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String

});

export default class Products extends MongoDBContainer {
    constructor() {
        super(collection, productsSchema);
    }

    getAll = async () => {
        try {
            let restult = await this.model.find();
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


    getById = async (id) => {
        try {
            let result = await this.model.findById(id)
            return result;
        } catch (error) {
            console.log('ERROR getById(): ' + error);
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

    deleteAll = async () => {
        try {
            let result = await this.model.deleteMany({});
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    update = async () => {
        try {
            let result = await this.model.updateOne({ price: 12343235 });
            return result;

        } catch (error) {
            console.log('ERROR UPDATE(): ' + error);
        }
    }


};