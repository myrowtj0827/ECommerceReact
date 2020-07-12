const express = require("express");
const router = express.Router();
const ScrapingProduct = require("../models/ScrapingProduct");

const async = require('async');
const wait = require('wait.for');
const axios = require("axios");
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
let goLink = [];
let mLen, timeFlag;

router.post("/scraping-product", async (req, res) => {
    let baseUrl = "https://www.noon.com/saudi-en/fashion/men-31225/clothing-16204/active-16233/sportswear-all";

    let firstStr = "div.bannerContainer.bannerModule";
    let secondStr = "div.productContainer";
    goLink.slice(0, goLink.length);
    goLink[0] = baseUrl;
    let m = 0;

    console.log("--------------- success  ----------------");

    const scraping_Product = new ScrapingProduct({
        scraping_id: m + 1,
        scraping_store_address: baseUrl,
    });

    await scraping_Product.collection.deleteMany({});
    await scraping_Product.save();

    /**
     * 1th filter
     */
    while (m < goLink.length) {
        await sleep_Time(1500);

        await gettingFirstStageLink(firstStr, goLink[m]);
        //await delay();

        m = m + 1;
        console.log("1st -> ", m, '\t', 'goLink.length : ', goLink.length);
    }

    let nCount_First = goLink.length;
    m = 0;

    /**
     * 2nd filter
     */
    while (m < nCount_First) {
        await sleep_Time(1500);
        await gettingFirstStageLink(secondStr, goLink[m]);
        m = m + 1;
        console.log("2nd -> ", m, '/', nCount_First, '\t', 'goLink.length : ', goLink.length);
    }

    let nCount_Products = goLink.length;

    /**
     * Getting Last Information
     */
    await gettingScraping(nCount_First-1, nCount_Products);
    console.log(" ===============  Scraping Done !!!!! =============");
    return res.status(200).json(scraping_Product);
});

router.get("/scraping-product-all", async (req, res) => {
    let regLink = new RegExp('.+');

    ScrapingProduct.find({
        scraping_photo_link: {$regex: regLink}
    }).then( scrapingList =>  {
        if(scrapingList){

            return res.status(200).json({results: [...scrapingList]});
        }
        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });
});

router.post("/scraping-product-sort", (req, res) => {
    let pStr = req.body.category;
    let pSplit = pStr.split(' ');

    let mLen = pSplit.length;
    let reE = '^(?=.*\\b' + pSplit[0] + '\\b)';

    for (let i = 1; i < mLen; i ++) {
        reE += '(?=.*\\b' + pSplit[i] + '\\b)';
    }

    reE += '.*$';
    let rew = new RegExp(reE);
    let regLink = new RegExp('.+');

    ScrapingProduct.find({
        scraping_category: {$regex: rew, $options: 'i/w'},
        scraping_photo_link: {$regex: regLink}
    }).collation( { locale: 'en', strength: 2 } ).sort({scraping_price: 1}).then(scrapingSortList => {

        if(scrapingSortList){
            return res.status(200).json({results: [...scrapingSortList]});
        }
        else{
            return res.status(400).json({msg: "The products can not find"});
        }
    });
});


router.post("/delete-product", async (req, res) => {

    const scraping_Product = new ScrapingProduct({
        scraping_id: 0,
        scraping_store_address: '',
    });

    await scraping_Product.collection.deleteMany({});

    console.log("Success Delete !");
});
module.exports = router;

/**
 * Getting the last URL Information
 * @param scrappingUrl
 * @returns {Promise<[]|number>}
 */
 async function gettingFirstStageLink(pStr, scrappingUrl) {

    try {
        const result = await axios.get(scrappingUrl);

        let $ = await cheerio.load(result.data);
        timeFlag = 0;

        await $(pStr).each( function( index ) {
            if ($(this).find('a').attr('href') !== undefined) {
                mLen = goLink.length;

                goLink.push('https://www.noon.com' + $(this).find('a').attr('href'));
                goLink = [...new Set(goLink)];

                if (mLen < goLink.length) {
                    const scraping_Product = new ScrapingProduct({
                        scraping_id: goLink.length,
                        scraping_store_address: goLink[goLink.length - 1]
                    });
                    scraping_Product.save();

                    console.log("  -> ", goLink.length);
                }
            }
        });

    } catch (error) {
        console.log(goLink.length, " -> 1: ", error.response.statusText);
        // await sleep(1000);
        await sleep(3100);
        await gettingFirstStageLink(pStr, scrappingUrl);

    }
}

/**
 * Getting the last scraping Information
 * @param scrappingUrl
 * @returns {Promise<[]|number>}
 */
async function gettingScraping(nFirst, nSecond) {

    for (let i = nFirst; i < nSecond; i ++) {
        try {

            await sleep(1010);
            const result = await axios.get(goLink[i]);
            let $ = await cheerio.load(result.data);

            /**
             * Getting the category list
             */
            let categoryList = '';

            await $("div.breadcrumbContainer > div > div.breadcrumb").each(async function( index ) {

                $("span.crumb > a").each( function( index ) {
                    if ($(this).text() !== undefined) {
                        categoryList += $(this).text() + '/';
                        categoryList = categoryList.replace(' & ', '/');
                    }
                });

                categoryList = categoryList.replace('Home/', '');
                let mArray = categoryList.split('/');
                mArray = [...new Set(mArray)];

                categoryList = '';
                for (let i = 0; i < mArray.length - 1; i ++) {
                    categoryList += mArray[i] + '/';
                }
            });

            /**
             * Getting the details information
             */
            let sInfo = $("div.primaryDetails");

            let photoLink = $(sInfo).find("div.mediaContainer > div > img").attr("src");
            let thumbnailPhotoLink = $(sInfo).find("div.mediaContainer > img").attr("src");
            let productName = $(sInfo).find("div.coreWrapper > div > a").text().trim();
            let productDescription = $(sInfo).find("div.coreWrapper > div > h1").text().trim();
            let productPrice = $(sInfo).find("span.sellingPrice > span > span.value").text().trim();

            await ScrapingProduct.updateOne({scraping_id: (i+1).toString()},
                {scraping_category: categoryList, scraping_name: productName, scraping_photo_link: photoLink,
                    scraping_description: productDescription, scraping_price: productPrice, scraping_thumbnail_Link: thumbnailPhotoLink});

        } catch (error) {
            await sleep(3100);
            console.log('3 : last -> ', i,  error.response.statusText);
            i = i - 1;
        }
    }
}

// helper to delay execution by 300ms to 1100m
async function delay() {
    const durationMs = Math.random() * 800 + 300;
    return new Promise(resolve => {
        setTimeout(() => resolve(), durationMs);
    });
}

function sleep(milliseconds) {
    let timeStart = new Date().getTime();
    while (true) {
        let elapsedTime = new Date().getTime() - timeStart;
        if (elapsedTime > milliseconds) {
            break;
        }
    }
}

const sleep_Time = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

