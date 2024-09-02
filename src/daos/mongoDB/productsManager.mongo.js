const { productModel } = require('../../models/products.model')


class ProductManagerMongo {

    constructor(){
        this.model = productModel
    }

    // GET (READ) a MongoDB
    getProducts = async () => this.model.find({})

    // GET by opts (READ) a MongoDB
    getProduct = async opts => this.model.findOne({_id: opts})

    // POST (CREATE) a MongoDB
    createProduct = async newProduct => await this.model.create(newProduct)

    // PUT (UPDATE) a MongoDB
    updateProduct = async (opts, field) => this.model.updateOne({_id: opts}, field)
    
    // DELETE (DELETE) a MongoDB
    deleteProduct = async opts => this.model.deleteOne({_id: opts})

}



module.exports = {
    ProductManagerMongo
}