const { Schema, model} = require('mongoose')

const collectionName = 'products'

const productSchema = new Schema ({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnails: {
        type: String,
    }
})

const productModel = model(collectionName, productSchema)


module.exports = {
    productModel
}

