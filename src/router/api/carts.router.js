const { Router } = require('express')
const { CartManagerMongo } = require('../../daos/mongoDB/cartsManager.mongo')


const router = Router()
const cartService = new CartManagerMongo

//GET 
router.get('/', async (req, res) => {
    try{
        const result = await cartService.getCarts()
        //Validaciones
        if (result.length === 0){
            res.send({status: 'success', message: 'GET desde rutas CARTS', data: 'No Existen Carritos Creados'})
        } else {
            res.send({status: 'success', message: 'GET desde rutas CARTS', data: result})
        }
        
        console.log(result);

    } catch (error){
        res.status(400).send({ status: 'errorgetcart', message: error.message })
    }    
});

//GET by ID
router.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        const result = await cartService.getCart({_id: pid})
        res.send({status: 'success', message: 'GET by ID desde rutas CARTS', data: result})

    } catch (error){
        res.status(400).send({ status: 'errorgetbyidcart', message: error.message })
    }
    
})

//POST
router.post('/', async (req, res) => {
    try{
        const {body} = req
        //onst newCart = {}
        const result = await cartService.createCart(body)
        console.log(result);
        res.send({status: 'success', message: 'POST desde rutas CARTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'errorpostcart', message: error.message })
    }
    
})

//// POST Añadir productos al carrito
router.post('/:pidCart/product/:pidProduct', async (req, res) => {
    try {
        const { pidCart, pidProduct } = req.params;
        const { body } = req;
        const result = await cartService.createProductToCart(pidCart, pidProduct, body);
        res.send({ status: 'success', message: 'Producto añadido al carrito', data: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});


// PUT Actualizar cantidad del producto en el carrito
router.put('/:pidCart/product/:pidProduct', async (req, res) => {
    try {
        const { pidCart, pidProduct } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).send({ status: 'error', message: 'El campo quantity es obligatorio' });
        }

        // Llamada al método updateCart
        const result = await cartService.updateCart(pidCart, pidProduct, quantity);
        res.send({ status: 'success', message: 'Cantidad del producto actualizada en el carrito', data: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});



// DELETE (Vaciar productos en el carrito pero no eliminar el carrito)
router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await cartService.deleteCart(pid);
        res.send({ status: 'success', message: 'Productos eliminados del carrito', data: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});


module.exports = router


