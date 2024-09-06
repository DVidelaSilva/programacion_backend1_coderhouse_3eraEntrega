const { Schema, model} = require('mongoose')

const collectionName = 'Carts'

const cartsSchema = new Schema ({

    
    products: [{
        
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Products'
            },
            quantity: Number,
        }]
})

cartsSchema.pre('findOne', function() {
    this.populate('products.product');
});

const cartsModel = model(collectionName, cartsSchema)


module.exports = {
    cartsModel
}
 
