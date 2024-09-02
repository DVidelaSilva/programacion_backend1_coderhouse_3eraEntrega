const { Router } = require('express')
const { ProductManagerMongo } = require('../../daos/mongoDB/productsManager.mongo')

const router = Router()
const productService = new ProductManagerMongo

//GET
router.get('/', async (req, res) => {
    try{
        const result = await productService.getProducts()
        res.send({status: 'success', message: 'GET desde rutas PRODUCTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//GET by ID
router.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        const result = await productService.getProduct({_id: pid})
        res.send({status: 'success', message: 'GET by ID desde rutas PRODUCTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//POST
router.post('/', async (req, res) => {
    try{
        const { body } = req
        const result = await productService.createProduct(body)
        res.send({status: 'success', message: 'POST desde rutas PRODUCTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//PUT
router.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        let toReplace = req.body
        const result = await productService.updateProduct({_id: pid}, toReplace)
        const dataUploader = await productService.getProduct({_id: pid})
        res.send({status: 'success', message1: 'PUT desde rutas PRODUCTS', message2: 'Producto Actualizado', dataActualizada: dataUploader})
    } catch ( error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//DELETE
router.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        const result = await productService.deleteProduct({_id: pid})
        res.send({status: 'success', message: 'DELETE desde rutas PRODUCTS', data: 'Producto Eliminado'})
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})


module.exports = router
