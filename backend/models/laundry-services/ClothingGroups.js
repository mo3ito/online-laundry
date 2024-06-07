const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClothingGroupsSchema = new Schema({
    clothing_category:{
        type : String,
        required: true
    },
    clothing_category_English:{
        type : String,
        required: true
    },
    group_name:{
        type : String,
        required: true
    }
})