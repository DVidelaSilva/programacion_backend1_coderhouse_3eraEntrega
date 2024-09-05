const { Router } = require('express')
const { ProductManagerMongo } = require('../../daos/mongoDB/productsManager.mongo')
const { isValidObjectId } = require('mongoose');
const { productModel } = require('../../models/products.model')
const router = Router()
const productService = new ProductManagerMongo



//***************** GET *****************



router.get('/', async (req, res) => {
    try{
        const result = await productService.getProducts()
        //Validaciones
        if (result.length === 0){
            res.send({status: 'success', message: 'GET desde rutas PRODUCTS', data: 'No existen productos creados'})
        } else {
            res.send({status: 'success', message: 'GET desde rutas PRODUCTS', data: result})
        }
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
});


/* router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 1, sort = 'asc' } = req.query;
        const sortOrder = sort === 'desc' ? -1 : 1;

        const result = await productService.getProducts(parseInt(page), parseInt(limit), { price: sortOrder });

        const productsResultadoFinal = result.products.map( p => {
            const {_id, ...rest} = p.toObject()
            return rest;
        })

        res.render('products', {
            products: productsResultadoFinal,
            totalPages: result.totalPages,
            currentPage: result.currentPage,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});
 */

//***************** GET by ID *****************

router.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        // Valida que ID sea un ID Mongo Valido
        if (!isValidObjectId(pid)) {
            throw new Error (`El ID '${pid}' ingresado no es un ID de mongoDB válido`)
        } 

        const result = await productService.getProduct({_id: pid})

        // Valida si encuentra el producto por el ID
        if(result){
            res.send({status: 'success', message: 'GET by ID desde rutas PRODUCTS', data: result})
            return result
        } else {
            throw new Error (`Producto ID '${pid}' NO encontrado en BD`)
        }
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }  
});



//***************** POST *****************

router.post('/', async (req, res) => {
    try{
        const { body } = req

        // Validaciones Campos requeridos y validacion de tipo de datos
        if (!body.title || typeof body.title !== 'string') {
            throw new Error('El campo title no fue ingresado, o no es un texto')
        }
        if (typeof body.description !== 'string') {
            throw new Error('El campo description no o es un texto')
        }
        if (!body.code || typeof body.code !== 'string') {
            throw new Error('El campo code no fue ingresado, o no es una texto')
        }
        if (!body.price || typeof body.price !== 'number') {
            throw new Error('El campo price no fue ingresado, o no es un numero')
        }
        if (body.status !== false){
            body.status = true
        }
        if (!body.stock || typeof body.stock !== 'number') {
            throw new Error('El campo stock no fue ingresado, o no es un numero')
        }
        if (!body.category || typeof body.category !== 'string') {
            throw new Error('El campo category no fue ingresado, o no es una texto')
        }
        if (body.thumbnails && typeof body.thumbnails !== 'string') {  
            throw new Error('El campo thumbnails no es una texto')
        } else if (body.thumbnails && typeof body.thumbnails === 'string'){
            body.thumbnails = body.thumbnails;
        } else {
            body.thumbnails = ''
        }
        const result = await productService.createProduct(body)
        res.send({status: 'success', message: 'POST desde rutas PRODUCTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }   
});



//*********** PUT   *****************

router.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        // Valida que ID sea un ID Mongo Valido
        if (!isValidObjectId(pid)) {
            throw new Error (`El ID '${pid}' ingresado no es un ID de mongoDB válido`)
        }
        let toReplace = req.body
        const result = await productService.updateProduct({_id: pid}, toReplace)
        const dataUploader = await productService.getProduct({_id: pid})
        // Valida si encuentra el producto por el ID
        if(dataUploader){
            res.send({status: 'success', message1: 'PUT desde rutas PRODUCTS', message2: 'Producto Actualizado', dataActualizada: dataUploader})   
            return dataUploader
        } else {
            throw new Error (`Producto ID '${pid}' NO encontrado en BD`)
        }
    } catch ( error){
        res.status(400).send({ status: 'error', message: error.message })
    }  
});




//**********  DELETE  *****************
router.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        // Valida que ID sea un ID Mongo Valido
        if (!isValidObjectId(pid)) {
            throw new Error (`El ID '${pid}' ingresado no es un ID de mongoDB válido`)
        }
        
        const result = await productService.getProduct({_id: pid})
        // Valida si encuentra el producto por el ID
        if(result){
            const resultToDelete = await productService.deleteProduct({_id: pid})
            res.send({status: 'success', message: 'DELETE desde rutas PRODUCTS', data: 'Producto Eliminado'})
            return result
        } else {
            throw new Error (`Producto ID '${pid}' NO encontrado en BD`)
        }
        //res.send({status: 'success', message: 'DELETE desde rutas PRODUCTS', data: 'Producto Eliminado'})
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});


module.exports = router

