const { productModel } = require('../../models/products.model')


class ProductManagerMongo {

    constructor(){
        this.model = productModel
    }

//?? ***************** READ a MongoDB *****************
    getProducts = async () => this.model.find({})


//?? ***************** READ por _id MongoDB *****************
    getProduct = async opts => this.model.findOne({_id: opts})


//?? ***************** CREATE a MongoDB *****************
    createProduct = async newProduct => await this.model.create(newProduct)


//?? ***************** UPDATE a MongoDB *****************
    updateProduct = async (opts, field) => this.model.updateOne({_id: opts}, field)
    
    
//?? ***************** DELETE a MongoDB *****************
    deleteProduct = async opts => this.model.deleteOne({_id: opts})

}



module.exports = {
    ProductManagerMongo
}
