const { Router } = require('express')

const { productModel } = require('../../models/products.model')
const router = Router()





router.get('/products', async (req, res) => {

    let page = req.query.page || 1;
    let limit = 3;
    sortBy = req.query.sortBy || 'code'; // Por defecto ordenar por 'price'
    let sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Orden descendente si se pasa 'desc'


    try {

        const sort = { [sortBy]: sortOrder }; // 

        const listadoProducts = await productModel.paginate({}, {limit, page, sort})
    
        const productsResultadoFinal = listadoProducts.docs.map( p => {
            const {_id, ...rest} = p.toObject()
            return rest;
        })

        res.render('products', {
            products: productsResultadoFinal,
            hasPrevPage: listadoProducts.hasPrevPage,
            hasNextPage: listadoProducts.hasNextPage,
            prevPage: listadoProducts.prevPage,
            nextPage: listadoProducts.nextPage,
            currentPage: listadoProducts.page,
            totalPages: listadoProducts.totalPages,          

        });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).send({ status: 'error', message: error.message });
    }
});




module.exports = router