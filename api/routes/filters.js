const express = require("express");
const router = express.Router();
const Filter = require("../models/Filter");

router.post("/register-product", async (req, res) => {
    console.log(req.body);

    const newProduct = new Filter({
        product_id: req.body.product_id,
        product_category: req.body.product_category,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_store_address: req.body.product_store_address,
    });

    await newProduct.save();
    return res.status(200).json(newProduct);
});

router.get("/get-product-all", (req, res) => {
    Filter.find({}).then(productList => {
        if(productList){
            return res.status(200).json({results: [...productList]});
        }
        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });
});

router.get("/get-product-id", (req, res) => {
    Filter.findOne({_id: req.product_id}).then(product => {
        if(product){
            return res.status(200).json({...product});
        }

        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });
});

module.exports = router;

