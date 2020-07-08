const express = require("express");
const router = express.Router();
const Filter = require("../models/Filter");
const async = require('async');


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
    Filter.find({}).then( productList =>  {
        if(productList){
            return res.status(200).json({results: [...productList]});
        }
        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });


    /**
     * /noon.com/saudi-en Scrapping
     */            //         let title = $(this).find('td.title > span').text().trim();

    let goLink = [];
    let m = 0;
    let linkUrl = "https://www.noon.com/saudi-en/";
    goLink[0] = linkUrl;
    //fs.unlinkSync('saudi.txt');
    fs.truncate('saudi.txt', 0, function() {
        console.log('File Content Deleted', );
    });

     gettingLink("https://www.noon.com/saudi-en/home-kitchen");
     gettingLink("https://www.noon.com/saudi-en/fashion");

    while (m < goLink.length) {
        gettingLink(goLink[m]);
        m = m + 1;
        console.log(m, '  :  ', goLink.length);
    }
    console.log("=================", goLink, goLink.length);

    let mData = "Hello World !";
    fs.writeFileSync("saudi.txt", mData);
    let fileContentModified = fs.readFileSync("saudi.txt", "utf8");

    let nRegex = '/n';
    let nArray = fileContentModified.split(nRegex);

    console.log("+++++++++", nArray[10]);


    function gettingLink(scrappingUrl) {
        request(scrappingUrl, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
            }
            console.log("Status code: " + response.statusCode);
            let $ = cheerio.load(body);

            $('div.bannerContainer.bannerModule').each(function( index ) {
                if ($(this).find('a').attr('href') !== undefined) {
                    goLink[goLink.length] = 'https://www.noon.com' + $(this).find('a').attr('href');
                    goLink = [...new Set(goLink)];
                    //console.log("###", goLink.length + '   ->   ' + goLink[goLink.length - 1]);
                    fs.appendFileSync('saudi.txt', goLink.length - 1 + ' -> ' + goLink[goLink.length - 1] + '\n');
                }
            });
        });
    }




























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

