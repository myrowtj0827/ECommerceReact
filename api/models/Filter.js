const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Brand schema
 */
const FilterSchema = new Schema({
    product_id: {
        type: String,
        required: true,
    },

    product_category: {
        type: String,
        required: true,
    },

    product_name: {
        type: String,
        required: true,
    },

    product_description: {
        type: String,
        required: true,
    },

    product_price: {
        type: String,
        required: true,
    },

    product_store_address: {
        type: String,
        required: true,
    },
});

module.exports = Filter = mongoose.model("filters", FilterSchema);
