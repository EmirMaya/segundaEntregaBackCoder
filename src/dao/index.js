const persistence = "MongoDB";
let productsService;
let cartsService;
switch (persistence) {
    case "MongoDB":
        const { default: MongoProduct } = await import('./MongoDAO/Products.js');
        productsService = new MongoProduct();
        const {default: MongoCart} = await import('./MongoDAO/Carts.js')
        cartsService = new MongoCart();
        break;

    case "Files":
        const { default: FileProduct } = await import('./FilesDAO/Products.js');
        productsService = new FileProduct();
        const { default: FileCart } = await import('./FilesDAO/Carts.js');
        cartsService = new FileCart();
        break;
}

const services = {
    productsService,
    cartsService
}

export default services;