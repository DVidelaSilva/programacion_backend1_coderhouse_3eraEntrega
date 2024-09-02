const { Router } = require('express')
const { CartManagerMongo } = require('../../daos/mongoDB/cartsManager.mongo')


const router = Router()
const cartService = new CartManagerMongo

//GET
router.get('/', async (req, res) => {
    try{
        const result = await cartService.getCarts()
        res.send({status: 'success', message: 'GET desde rutas CARTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//GET by ID
router.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        const result = await cartService.getCart({_id: pid})
        res.send({status: 'success', message: 'GET by ID desde rutas CARTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//POST
router.post('/', async (req, res) => {
    try{
        const { body } = req
        const result = await cartService.createCart(body)
        res.send({status: 'success', message: 'POST desde rutas CARTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//POST --> Añadir productos al carrito
router.post('/:pidCart/product/:pidProduct', async (req, res) => {
    try{
        const { pidCart, pidProduct } = req.params
        const {body} = req
        const result = await cartService.createProductToCart(pidCart, pidProduct, body)
        res.send({status: 'success', message: 'POST desde rutas CARTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//PUT
router.put('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        let toReplace = req.body
        const result = await cartService.updateCart({_id: pid}, toReplace)
        const dataUploader = await cartService.getCart({_id: pid})
        res.send({status: 'success', message1: 'PUT desde rutas CARTS', message2: 'Carrito Actualizado', dataActualizada: dataUploader})
    } catch ( error){
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})

//DELETE
router.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        const result = await cartService.deleteCart({_id: pid})
        res.send({status: 'success', message: 'DELETE desde rutas CARTS', data: 'Carrito Eliminado'})
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
    
})


module.exports = router


