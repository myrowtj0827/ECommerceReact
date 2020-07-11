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
    let baseUrl = "https://www.noon.com/saudi-en/solar-fuse-running-shoes/N35700744V/p?o=c72a94ca0a00ff3a";

    let firstStr = "div.bannerContainer.bannerModule";
    let secondStr = "div.productContainer";

    goLink[0] = baseUrl;
    let m = 0;

    console.log("--------------- success  ----------------");

    const scraping_Product = new ScrapingProduct({
        scraping_id: m + 1,
        scraping_store_address: baseUrl,
    });

    await scraping_Product.collection.deleteMany({});
    await scraping_Product.save();

    //while (m < goLink.length) {
        await gettingFirstStageLink(firstStr, goLink[m]);
   //     m = m + 1;
        console.log("1st Stage Current Index ===== ", m, '\t', 'goLink.length +++++++++ ', goLink.length);
   // }

    let nCount_First = goLink.length;
    m = 0;
     while (m < nCount_First) {
         await gettingFirstStageLink(secondStr, goLink[m]);
         m = m + 1;
         console.log("2nd Stage Current Index ==== ", m, '/', nCount_First, '\t\t', 'goLink.length +++++ ', goLink.length);
     }


    // await ScrapingProduct.find({}).then(async aLink => {
    //     for(let i = 1; i < nCount_First; i ++) {
    //         //await gettingFirstStageLink(secondStr, aLink[i].scraping_store_address);
    //         console.log(i, ' = ', aLink[i], aLink.length);
    //
    //         console.log("2nd Stage Current Index ==== ", i, '\t\t', 'goLink.length +++++ ', goLink.length);
    //     }
    // });


    let nCount_Products = goLink.length;
    await gettingScraping(nCount_First-1, nCount_Products);

    //await fs.appendFileSync('scrapingLink.txt', goLink);

    console.log("nCount_First = ", nCount_First + "\t\t\t nCount_Products = ", nCount_Products + "Done !!!!!");
    return res.status(200).json(scraping_Product);
});

module.exports = router;


/**
 * Getting the last URL Information
 * @param scrappingUrl
 * @returns {Promise<[]|number>}
 */
 async function gettingFirstStageLink(pStr, scrappingUrl) {
    let mTime;
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

                    console.log(goLink.length, "   --->  ", goLink[goLink.length - 1]);
                }
            }
        });

    } catch (error) {
        console.log("===", goLink.length, '===', goLink[goLink.length-1], '   ++++++    ', error.response.statusText);

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
            let photoLink = $(sInfo).find("div.mediaContainer > img").attr("src");
            let productName = $(sInfo).find("div.coreWrapper > div > a").text().trim();
            let productDescription = $(sInfo).find("div.coreWrapper > div > h1").text().trim();
            let productPrice = $(sInfo).find("span.sellingPrice > span > span.value").text().trim();

            console.log('photoLink = ', photoLink);
            console.log('productName = ', productName);
            console.log('productDescription = ', productDescription);

            await ScrapingProduct.updateOne({scraping_id: (i+1).toString()},
                {scraping_category: categoryList, scraping_name: productName, scraping_photo_link: photoLink, scraping_description: productDescription, scraping_price: productPrice});




        } catch (error) {
            console.log('====', i, '   +++    ', error.response.statusText);
            i = i - 1;
        }
    }

}


