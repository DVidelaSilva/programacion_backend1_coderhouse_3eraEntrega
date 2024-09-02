const { Schema, model} = require('mongoose')

const collectionName = 'carts'



const cartsSchema = new Schema ({

    products: []
})

const cartsModel = model(collectionName, cartsSchema)


module.exports = {
    cartsModel
}

