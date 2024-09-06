const { Router } = require('express')
const { CartManagerMongo } = require('../../daos/mongoDB/cartsManager.mongo');
const { isValidObjectId } = require('mongoose');



const router = Router()
const cartService = new CartManagerMongo


router.get('/cart/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        
        // Validar que el ID del carrito sea válido
        if (!isValidObjectId(pid)) {
            throw new Error('ID del carrito no es válido')
        }
        
        // Obtener el carrito por ID
        const cart = await cartService.getCart(pid) // Implementa este método en tu servicio

        if (!cart) {
            throw new Error('Carrito no encontrado')
        }
        
        // Renderizar la vista con los productos del carrito
        res.render('cart', { 
            cart: cart.toObject(),
            products: cart.products.map(p => ({
                ...p.toObject(), 
                product: p.product.toObject()
            }))
        });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message })
    }
});


module.exports = router