const { productModel } = require('../../models/products.model')


class ProductManagerMongo {

    constructor(){
        this.model = productModel
    }

//?? ***************** READ a MongoDB *****************
    getProducts = async (filter = {}, sort = {}, limit = 10, page = 1) => {
        try {
            const skip = (page - 1) * limit

            const products = await this.model.find(filter)  
                .sort(sort) 
                .skip(skip)  
                .limit(limit)

            return products
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    };


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
