const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Scraping Product schema
 */
const ScrapingSchema = new Schema({
    scraping_id: {
        type: String,
        required: true,
    },

    scraping_store_address: {
        type: String,
        required: true,
    },

    scraping_photo_link: {
        type: String,
        required: false,
    },

    scraping_category: {
        type: String,
        required: false,
    },

    scraping_name: {
        type: String,
        required: false,
    },

    scraping_description: {
        type: String,
        required: false,
    },

    scraping_price: {
        type: Number,
        required: false,
    }
});

module.exports = ScrapingProduct = mongoose.model("scrapingProduct", ScrapingSchema);
