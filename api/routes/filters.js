const express = require("express");
const router = express.Router();
const Filter = require("../models/Filter");


const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

router.post("/register-product", async (req, res) => {
    console.log(req.body);

    const newProduct = new Filter({
        product_id: req.body.product_id,
        product_photo: req.body.product_photo,
        product_category: req.body.product_category,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_photo_url: req.body.product_photo_url,
        product_store_address: req.body.product_store_address,
    });

    await newProduct.save();
    return res.status(200).json(newProduct);
});

router.get("/get-product-all", (req, res) => {
    Filter.find({}).then(productList => {
        if(productList){
            request("https://news.ycombinator.com/news", function(error, response, body) {
                if(error) {
                    console.log("Error: " + error);
                }
                console.log("Status code: " + response.statusCode);

                let $ = cheerio.load(body);

                $('tr.athing:has(td.votelinks)').each(function( index ) {
                    let title = $(this).find('td.title > a').text().trim();
                    let link = $(this).find('td.title > a').attr('href');
                    fs.appendFileSync('hackernews.txt', title + '\n' + link + '\n');
                });

            });

            return res.status(200).json({results: [...productList]});
        }
        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });
});

router.post("/get-product-sort", (req, res) => {
    Filter.find({
        product_category: req.body.category,
    }).collation( { locale: 'en', strength: 2 } ).sort({product_price: 1}).then(productSortList => {

        if(productSortList){
            return res.status(200).json({results: [...productSortList]});
        }
        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });
});

module.exports = router;

