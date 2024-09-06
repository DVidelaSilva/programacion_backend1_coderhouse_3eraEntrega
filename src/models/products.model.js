const { Schema, model} = require('mongoose')

const mongoosePaginate = require('mongoose-paginate-v2')

const collectionName = 'Products'

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

productSchema.plugin(mongoosePaginate)

const productModel = model(collectionName, productSchema)


module.exports = {
    productModel
}

