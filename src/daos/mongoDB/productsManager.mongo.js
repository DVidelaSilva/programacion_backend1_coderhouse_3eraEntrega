const { productModel } = require('../../models/products.model')


class ProductManagerMongo {

    constructor(){
        this.model = productModel
    }

//?? ***************** READ a MongoDB *****************
    getProducts = async () => this.model.find({})

/*     //***************** READ con Paginación *****************
getProducts = async (page = 1, limit = 10, sort = {}) => {
        // Paginación usando mongoose-paginate-v2
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort
        };

        const result = await this.model.paginate({}, options);

        return {
            products: result.docs, // Array de productos
            totalPages: result.totalPages,
            currentPage: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        };
    };

    // Otros métodos permanecen igual...

 */

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
