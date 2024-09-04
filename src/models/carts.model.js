const { Schema, model} = require('mongoose')

const collectionName = 'carts'



const cartsSchema = new Schema ({

   //product: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]

    products: [{

        quantity: { type: Number}
}]
})

const cartsModel = model(collectionName, cartsSchema)


module.exports = {
    cartsModel
}
 
