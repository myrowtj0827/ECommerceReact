const express = require("express");
const router = express.Router();
const ScrapingProduct = require("../models/ScrapingProduct");
const Filter = require("../models/Filter");

const axios = require("axios");
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
let goLink = [];
let mLen;


// let baseUrl = "https://www.noon.com/saudi-en/";
// let firstStr = "div.bannerContainer.bannerModule";
// let secondStr = "div.productContainer";

/**
 * starting newly
 * if (flag_new === true) then starting the scraping from the first
 * if (flag_repeat === true) then starting the scraping from the middle
 * m is the starting position of the scraping
 */
// let m = 0;
// const flag_new = true;
// const flag_repeat = false;

/**
 * repeat scraping const
 */
let m = 35072;
const flag_new = false;
const flag_repeat = true;

/**
 * Repeat order
 *  nth have to take one among 1, 2, 3: it is stage order
 *  nCount_First is starting position on the DB, ex the end of the first stage
 *  nCount_Products is the end of the 2 nd stage
 */
const nth = 3;
let nCount_First = 1, nCount_Products;


let baseUrl = "https://swsg.co/ar/";
let pStage = 0;
let lastStage = false;

let lastLink = "a";

let nCategory = 0;


router.post("/scraping-product", async (req, res) => {
    await console.log("--------------- success  ----------------");

    if(baseUrl === "https://www.noon.com/saudi-en/") {
        await goLink.slice(0, goLink.length);
        goLink[0] = baseUrl;
        await initializeDB(flag_new, flag_repeat);
        /**
         * the main scraping part
         */
        await mainScraping();
        /** From now on, common scraping part about the whole site
         * Getting Last Information and Inserting in the real DB
         */
        await gettingScraping(nCount_First, nCount_Products);
        await console.log(" ===============  Scraping Done !!!!! =============");
        await shownData(ScrapingProduct);

    } else if(baseUrl === "https://swsg.co/ar/") {

        console.log("2nd result starting");

        await goLink.slice(0, goLink.length);
        goLink[0] = baseUrl;
        await initializeSimpleDB(pStage);

        const scrapingItem = await ScrapingProduct.find({});
        for(let k = 0; k < scrapingItem.length; k ++) {
            goLink[k] = scrapingItem[k].scraping_store_address;
            console.log(k + 1, " -> ", goLink[k]);
        }
        console.log("The Initialize !");

        /**
         * Getting Last Links
         */
        nCategory = 1;
        await gettingFinalLink(0, lastLink, baseUrl);

        const items = await ScrapingProduct.find({});
        let kl = 1;

        for (const ele of items) {
            await gettingFinalLink(0, lastLink, ele.scraping_store_address);

            console.log(kl, " -> ", ele.scraping_store_address);
            kl ++;
        }

        console.log("Getting the last link !", goLink.length);


        await console.log(" ===============  Category Scraping Done !!!!! =============");
        console.log("nCategory = ", nCategory);

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

async function mainScraping() {
    if (nth === 1) {
        /**
         * 1th filter
         */
        while (m < goLink.length) {
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
            await gettingFirstStageLink(secondStr, m);
            m = m + 1;
            await console.log("\n 2nd stage -> ", nCount_First, '/', m, "th   Passed \n");
        }

        nCount_Products = goLink.length;

    } else if (nth === 2) {
        /**
         * 2nd filter
         * nCount-First is the data number after 1st filter finished
         */
        nCount_First = 1341;

        while (m < nCount_First) {
            await gettingFirstStageLink(secondStr, m);
            m = m + 1;
            await console.log("\n 2nd stage -> ", nCount_First, '/', m, "th   Passed \n");
        }
        nCount_Products = goLink.length;

    } else if ( nth === 3) {
        nCount_First = m;
        nCount_Products = await ScrapingProduct.countDocuments();
        console.log(nCount_Products, '+++++++++')
    }
}

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
        await sleep(1500);
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

    for (let i = nFirst; i <= nSecond; i ++) {
        try {
            if(i === 0) i = 1;

            const result = await axios.get(goLink[i - 1]);
            // await sleep(2000);
            let $ = await cheerio.load(result.data);

            /**
             * Getting the category list
             */
            let categoryList = '';

            await $("div.breadcrumbContainer > div > div.breadcrumb").each(async function( index ) {
                // await sleep(1000);
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

            let photoLink = await $(sInfo).find("div.mediaContainer > div > img").attr("src");
            let thumbnailPhotoLink = await $(sInfo).find("div.mediaContainer > img").attr("src");
            let productName = await $(sInfo).find("div.coreWrapper > div > a").text().trim();
            let productDescription = await $(sInfo).find("div.coreWrapper > div > h1").text().trim();
            let productPrice = await $(sInfo).find("div.coreWrapper > div > div.priceRow > div.pdpPrice > p > span.value > span.sellingPriceContainer > span.sellingPrice > span > span.value").text().trim();

            await ScrapingProduct.updateOne({scraping_store_address: goLink[i-1]},
                [{$set: {scraping_category: categoryList, scraping_name: productName, scraping_photo_link: photoLink,
                    scraping_description: productDescription, scraping_price: productPrice, scraping_thumbnail_Link: thumbnailPhotoLink}}]).then(async () => {
                        console.log(i, "    ------> ", goLink[i-1]);
            });

            await console.log("\n 3rd stage -> ", goLink.length, '/', i, "th   Passed \n");
        } catch (error) {
            // console.log(i, ' -> ', error.response.status);
            if(error.response === undefined) {
                console.log('3rd stage -> ', goLink.length, '/', i, 'th  ', "Site Error - Un-existing Product Url");
                // console.log('3rd stage -> ', goLink.length, '/', i, 'th  ', error);
            } else {

                // console.log('3rd stage -> ', goLink.length, '/', i, 'th  ', "Timeout");
                i = i - 1;
            }

            // await sleep(2000);
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

/**
 * Initailize of the database
 * @param pStage
 * @returns {Promise<*>}
 */
async function initializeSimpleDB(pStage) {
    if (pStage === 0) { // starting from the first
        const scraping_Product = await new ScrapingProduct({
            scraping_id: 1,
            scraping_store_address: baseUrl,
        });

        await scraping_Product.collection.deleteMany({});

        goLink = [];
        goLink[0] = baseUrl;

        const scraping_ProductOne = await new ScrapingProduct({
            scraping_id: 1,
            scraping_store_address: baseUrl,
        });
        m = 0;

        await scraping_ProductOne.save();

        await console.log( " === +++++++ === Total/Start -> ", await ScrapingProduct.countDocuments(), '/', m + 1, 'th');

    } else {
        return res.status(200).json("Conflict of the condition");
    }
}

/**
 * Getting CategoryName and Link
 * @param firstStr
 * @param baseUrl
 * @returns {Promise<number>}
 */
async function gettingFinalLink(iM, matchStr, bUrl) {
    try {
        if (lastStage === true) {
            try {
                require('chromedriver');
                const webdriver = require('selenium-webdriver');
                let By = webdriver.By;
                let until = webdriver.until;
                const driver = new webdriver.Builder()
                    .forBrowser('chrome')
                    .build();

                await driver.get(bUrl);

                try {
                    let mError = await driver.findElement(By.className('nmf__title')).getAttribute('innerHTML');console.log("***********22********");
                    if(mError === "Nessun incontro trovato.") {
                        await driver.quit();
                        return 0;
                    }
                } catch (e) {
                    await sleep(300);
                }


                await sleep(1000);
                driver.navigate().to(driver.getCurrentUrl());
                // console.log("=======", await (await driver).getCurrentUrl());

                await driver.wait(until.elementLocated(By.className(matchStr)));
                let sMatch = await driver.findElement(By.className(matchStr)).getAttribute('innerHTML');
                console.log(sMatch.length);
                await driver.quit();

                /**
                 * Getting the last Link
                 */
                let sCategory;
                let sCountry;
                let sLeague;

                let nCount = 0;
                let lastLink;
                let sTeamA;
                let sTeamB;
                let finalScore;

                let ss = bUrl.split("/");
                sCategory = ss[3];
                sCountry = ss[4];
                sLeague = ss[5];

                if(sLeague.includes("-20") === false) {
                    sLeague += "-2019-2020";
                }

                if(sCategory === "calcio") {
                    sCategory = "football";
                }

                let sId = "id=\"g_";
                let n = sMatch.search(sId);

                console.log("n's Testing", n);
                if(n === -1) throw 0;

                while(n >= 0) {
                    try {
                        sMatch = sMatch.slice(n + 8, );
                        if(sMatch[0] === "_") sMatch = sMatch.slice(1, );

                        let nI = sMatch.search("\"");
                        lastLink = sMatch.slice(0, nI);
                        sMatch = sMatch.slice(nI + 1, );

                        lastLink = baseUrl + "partita/" + lastLink + "/#informazioni-partita/";
                        console.log('\n LastLink = ', lastLink);
                        nCount += 1;

                        let t = (iM).toString() + "-" + (nCount).toString();


                        const scraping_data = await new Filter({
                            id: t,
                            link: lastLink.trim(),
                            category: sCategory.trim(),
                            country: sCountry.trim(),
                            league: sLeague.trim(),
                        });
                        await scraping_data.save();

                        n = sMatch.search(sId);
                    } catch (e) {
                        await driver.quit();
                        n = sMatch.search(sId);
                        console.log(" error -> n = ", n);
                    }
                }
            } catch (e) {
                if(error.response === undefined) {
                    console.log("Site Error - Un-existing Url");
                    await sleep(1000);
                    return 0;
                } else {
                    console.log("Last Stage Error !!", error);
                    await sleep(1000);
                    await gettingCategoryLink(matchStr, bUrl);
                }
            }
        } else {
            const result = await axios.get(bUrl);
            let $ = await cheerio.load(result.data);

            const aTags = $(matchStr);


            for(let kk = 0; kk < aTags.length; kk++) {            //console.log("======================", aTags.length);
                let aStr = await aTags[kk]['attribs']['href'];

                try {
                    if ((aStr !== undefined) && (aStr.includes("https://swsg.co/ar/") === true) && (aStr.slice(aStr.length - 6, ).includes(".html") === true)) {
                        mLen = goLink.length;
                        goLink.push(aStr);

                        goLink = [...new Set(goLink)];

                        if(mLen < goLink.length) {
                            const scraping_Product = new ScrapingProduct({
                                scraping_id: goLink.length,
                                scraping_store_address: goLink[goLink.length - 1]
                            });

                            await scraping_Product.save();
                            console.log(goLink.length, ' -> ', aStr, '\n');
                        }
                    }
                } catch (e) {}
            }








        }
    } catch (error) {
        await sleep(1500);
        return 0;
    }
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
