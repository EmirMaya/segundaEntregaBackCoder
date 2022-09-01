import { Router } from "express";
import services from "../dao/index.js";

const router = Router();

router.get("/", async (req, res) => {
    let result = await services.productsService.getAll();
    console.log(result);
    res.send(result);
});

router.get("/:id", async (req, res) => {
    let products = await services.productsService.getAll();
    if (isNaN(req.params.id)) return res.status(400).send("El parámetro debe ser númerico")
    if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > products.length) return res.status(404).send({ error: 'producto no encontrado' })
    let id = parseInt(req.params.id);
    res.send({ product: products[id - 1] })
});

router.post("/", async (req, res) => {
    let prod = req.body;
    console.log('LLEGASTE HASTA ACÁ' + prod);
    await services.productsService.save(prod);
    res.send({ status: "success" });
});

router.put("/:id", async (req, res) => {
    //files
    // let id = parseInt(req.params.id);
    // let products = await services.productsService.update(req.body, id);
    //res.send({ status: "success", payload: products })
    //mongo
    let id = parseInt(req.params.id);
    await services.productsService.update(id);
    res.send({ status: "success" })

});

router.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    await services.productsService.deleteById(id);
    res.send({ status: 'deleted successfully' });
});

export default router;