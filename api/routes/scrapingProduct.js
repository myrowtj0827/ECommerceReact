const express = require("express");
const router = express.Router();
const ScrapingProduct = require("../models/ScrapingProduct");
const Filter = require("../models/Filter");

const async = require('async');
const wait = require('wait.for');
const axios = require("axios");
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
let goLink = [];
let mLen, timeFlag;

router.post("/scraping-product", async (req, res) => {
    await console.log("--------------- success  ----------------");

    let baseUrl = "https://www.noon.com/saudi-en/";
    //let baseUrl = "https://www.noon.com/saudi-en/beauty-and-health/beauty";

    let firstStr = "div.bannerContainer.bannerModule";
    let secondStr = "div.productContainer";
    await goLink.slice(0, goLink.length);
    goLink[0] = baseUrl;

    /**
     * starting newly
     */
    // let m = 0;
    // const flag_new = true;
    // const flag_repeat = false;

    /**
     * repeat scraping const
     */
    let m = 415;
    const flag_new = false;
    const flag_repeat = true;

    /**
     * Repeat order
     */
    const nth = 2;

    await initializeDB(flag_new, flag_repeat);

    let nCount_First = 1, nCount_Products;

    if (nth === 1) {
        /**
         * 1th filter
         */
        while (m < goLink.length) {
            //await sleep_Time(500);
            await gettingFirstStageLink(firstStr, m);
            m = m + 1;
            await console.log("\n 1st stage -> ",  goLink.length, '/' , m, "th", "   Passed \n");
        }

        nCount_First = goLink.length;
        m = 0;
        /**
         * 2nd filter
         */
        while (m < nCount_First) {
            //await sleep_Time(500);
            await gettingFirstStageLink(secondStr, m);
            m = m + 1;
            await console.log("\n 2nd stage -> ", nCount_First, '/', m, "th   Passed \n");
        }
        nCount_Products = goLink.length;

    } else if (nth === 2) {
        /**
         * 2nd filter
         */

        /**
         * nCount-First is the data number after 1st filter finished
         */
        nCount_First = 1341;

        while (m < nCount_First) {
            //await sleep_Time(500);
            await gettingFirstStageLink(secondStr, m);
            m = m + 1;
            await console.log("\n 2nd stage -> ", nCount_First, '/', m, "th   Passed \n");
        }
        nCount_Products = goLink.length;

    } else if ( nth === 3) {
        nCount_First = m;
        nCount_Products = goLink.length;
    }

    /**
     * full code
     */
    // /**
    //  * 1th filter
    //  */
    // while (m < goLink.length) {
    //     await sleep_Time(500);
    //     await gettingFirstStageLink(firstStr, m);
    //     m = m + 1;
    //     await console.log("\n 1st stage -> ",  goLink.length, '/' , m, "th", "   Passed \n");
    // }
    //
    // let nCount_First = goLink.length;
    // m = 0;
    // /**
    //  * 2nd filter
    //  */
    // while (m < nCount_First) {
    //     await sleep_Time(500);
    //     await gettingFirstStageLink(secondStr, m);
    //     m = m + 1;
    //     await console.log("\n 2nd stage -> ", nCount_First, '/', m, "th   Passed \n");
    // }
    //
    // let nCount_Products = goLink.length;

    /**
     * Getting Last Information
     */
    await gettingScraping(nCount_First, nCount_Products);
    await console.log(" ===============  Scraping Done !!!!! =============");

    /**
     * Inserting in the real DB
     */
    await shownData(ScrapingProduct);

    async function initializeDB(type_new, type_repeat) {
        if ((type_new === true && type_repeat === false) && (m === 0)) { // starting from the first
            const scraping_Product = await new ScrapingProduct({
                scraping_id: m + 1,
                scraping_store_address: baseUrl,
            });

            await scraping_Product.collection.deleteMany({});

            const scraping_ProductOne = await new ScrapingProduct({
                scraping_id: m + 1,
                scraping_store_address: baseUrl,
            });

            await scraping_ProductOne.save();
            await console.log( " === +++++++++++++++++++++++++++++++ === Total/Start -> ", await ScrapingProduct.countDocuments(), '/', m + 1, 'th');

        } else if ((type_new === false && type_repeat === true) && (m > 0)) {  // using the previous results

            await ScrapingProduct.find({}).then( async arrayLink => {
                let t = arrayLink.length;

                for( let i = 0; i < t; i ++) {
                    goLink[i] = arrayLink[i].scraping_store_address;
                }
            });

            await console.log( " === +++++++++++++++++++++++++++++++ ===  Total/Start ", goLink.length, '/', m + 1);

        } else {
            return res.status(200).json("Conflict of the condition");
        }
    }

    return res.status(200).json("scraping_Product");
});

router.get("/scraping-product-all", async (req, res) => {
    let regLink = new RegExp('.+');

    Filter.find({
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

    Filter.find({
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



async function gettingFirstStageLink(pStr, mIndex) {
    try {
        const result = await axios.get(goLink[mIndex]);
        let $ = await cheerio.load(result.data);

        await $(pStr).each( function() {
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

        if(error.response === undefined) {
            console.log("Site Error - Un-existing Product Url");
            return 0;
        }

        console.log(goLink.length, " / ", mIndex + 1, "th  -> ", "Timeout 1st + 2nd");
        // await sleep(1000);
        await sleep(2500);
        await gettingFirstStageLink(pStr, mIndex);
    }
}


/**
 * Getting the last scraping Information
 * @param nFirst
 * @param nSecond
 * @returns {Promise<void>}
 */
async function gettingScraping(nFirst, nSecond) {

    //let nRepeat = 0;
    for (let i = nFirst; i <= nSecond; i ++) {
        try {
            if(i === 0) i = 1;

            //await sleep(1100);
            const result = await axios.get(goLink[i - 1]);
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
                for (let j = 0; j < mArray.length - 1; j ++) {
                    categoryList += mArray[j] + '/';
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

            await ScrapingProduct.updateOne({scraping_id: i.toString()},
                {scraping_category: categoryList, scraping_name: productName, scraping_photo_link: photoLink,
                    scraping_description: productDescription, scraping_price: productPrice, scraping_thumbnail_Link: thumbnailPhotoLink});

            await console.log("\n 3rd stage -> ", goLink.length, '/', i, "th   Passed \n");

        } catch (error) {

            if(error.response === undefined) {
                console.log("Site Error - Un-existing Product Url");
                return ;
            }

            console.log('3rd stage -> ', goLink.length, '/', i, 'th  ', "Timeout");
            i = i - 1;

            await sleep(1000);
        }
    }
}


/**
 * Inserting the scraping results to the real DB
 * @param pDbName
 * @returns {Promise<void>}
 */
async function shownData(pDbName) {
    let regLink = new RegExp('.+');

    await pDbName.find({
        scraping_photo_link: {$regex: regLink},
        scraping_name: {$regex: regLink},
        scraping_category: {$regex: regLink}
    }).then( scrapingItems =>  {
        if(scrapingItems){

            for (let i = 0; i < scrapingItems.length; i ++)
            {
                const scraping_Product = new Filter({
                    scraping_id: scrapingItems[i].scraping_id,
                    scraping_store_address: scrapingItems[i].scraping_store_address,
                    scraping_photo_link: scrapingItems[i].scraping_photo_link,
                    scraping_category: scrapingItems[i].scraping_category,
                    scraping_name: scrapingItems[i].scraping_name,
                    scraping_description: scrapingItems[i].scraping_description,
                    scraping_price: scrapingItems[i].scraping_price,
                    scraping_thumbnail_Link: scrapingItems[i].scraping_thumbnail_Link,
                });

                scraping_Product.save();
                console.log(i + 1, "  -> ");
            }
        } else {
            return res.status(400).json({msg: "The products don't exist at all !"});
        }
    });

    await console.log("Adding to the real DB !!!");
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


/**
 * Getting the URL Information
 * @param scrappingUrl
 * @returns {Promise<[]|number>}
 */

// async function gettingFirstStageLink(pStr, scrappingUrl, mIndex) {
//
//     try {
//         const result = await axios.get(scrappingUrl);
//         let $ = await cheerio.load(result.data);
//
//         await $(pStr).each( async function( index ) {
//             // await sleep(300);
//
//             if ($(this).find('a').attr('href') !== undefined) {
//                 let cStr = 'https://www.noon.com' + $(this).find('a').attr('href');
//
//                 // goLink.push(cStr);
//                 // goLink = [... new Set(goLink)];
//
//                 // console.log("cStr = ", cStr)
//                 // await ScrapingProduct.find({}).then( async sData => {
//                 //
//                 //     let iFlag = 0;
//                 //     let dbLen = await ScrapingProduct.countDocuments();
//                 //
//                 //     for (let i = 0; i < dbLen; i ++) {
//                 //         if(sData[i].scraping_store_address === cStr) {
//                 //             iFlag = 1;
//                 //             break;
//                 //         }
//                 //     }
//                 //
//                 //     if (iFlag === 0) {
//
//                         const scraping_Product = await new ScrapingProduct({
//                             scraping_id: 1,
//                             scraping_store_address: cStr
//                         });
//
//                         await scraping_Product.save();
//
//                         console.log("  -> ", await ScrapingProduct.countDocuments());
//                 //     }
//                 //
//                 // });
//
//             }
//         });
//     } catch (error) {
//         console.log(goLink.length, " / ", mIndex, "th -> ", error.response.statusText);
//         await sleep(2100);
//         await gettingFirstStageLink(pStr, scrappingUrl, mIndex);
//     }
// }
