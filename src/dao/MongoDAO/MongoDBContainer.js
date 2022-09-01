import mongoose from "mongoose";

export default class MongoDBContainer {
    constructor(collection, schema) {
        mongoose.connect('mongodb+srv://coderuser:1234@clusterbackendcoder.gfltsh5.mongodb.net/testAtlas?retryWrites=true&w=majority', err => {
            if (err) {
                console.log('ERROR DE CONECCION');
            } else {
                console.log('Connected to database');
            }
        });
        this.model = mongoose.model(collection, schema);
    }

    

    
};