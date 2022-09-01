import { Router } from "express";
import services from "../dao/index.js";

const router = Router();

router.get("/", async (req, res) => {
    let result = await services.cartsService.getAll();
    console.log(result);
    res.send(result);
});

router.get("/:cid/products", async (req, res) => {
    try {
        let id = parseInt(req.params.cid);
        let products = await services.cartsService.getProductsByCartId(id);
        res.send({ status: "success", payload: products });
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    let cart = req.body;
    let result = await services.cartsService.save();
    res.send(result);
    // res.send({ status: "success", message: "Cart Added", payload: cart });

});

router.delete("/:cid", async (req, res) => {
    let cid = req.params.cid;
    await services.cartsService.deleteById(cid);
    res.send({ status: 'deleted successfully' });
});


router.delete("/:cid/products/:pid", async (req, res) => {

    //aca no sabía como usar ambos ids para mongo
    let cid = req.params.cid;
    let pid = req.params.pid;
    await services.cartsService.deleteProductsInCart(pid)
    res.send({ status: 'deleted successfully' });
});
export default router;