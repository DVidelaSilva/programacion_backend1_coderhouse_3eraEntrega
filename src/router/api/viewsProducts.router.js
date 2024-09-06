const { Router } = require('express')

const { productModel } = require('../../models/products.model')
const router = Router()


router.get('/products', async (req, res) => {

    // Query Params
    let page = parseInt(req.query.page) || 1 //Pagina
    let limit = parseInt(req.query.limit) || 2 // Limite de productos
    let sortOrder = req.query.sort === 'desc' ? -1 : 1 // Orden de productos
    let sort = req.query.sort ? { price: sortOrder } : {} // Elemento a ordenar    
    let query = req.query.query || '' // Filtro de búsqueda


    try {
         // Aplicar filtro de búsqueda si hay un query por title
        const filter = query ? { category: new RegExp(query, 'i') } : {}

        // Paginacion
        const listadoProducts = await productModel.paginate(filter, { limit, page, sort })
    
        const productsResultadoFinal = listadoProducts.docs.map( p => {
            const {_id, ...rest} = p.toObject()
            return rest
        })

        res.render('products', {
            products: productsResultadoFinal,
            hasPrevPage: listadoProducts.hasPrevPage,
            hasNextPage: listadoProducts.hasNextPage,
            prevPage: listadoProducts.prevPage,
            nextPage: listadoProducts.nextPage,
            currentPage: listadoProducts.page,
            totalPages: listadoProducts.totalPages,          

        })
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});




module.exports = router