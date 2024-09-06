const { Router } = require('express')
const { CartManagerMongo } = require('../../daos/mongoDB/cartsManager.mongo');
const { isValidObjectId } = require('mongoose');
const { ProductManagerMongo } = require('../../daos/mongoDB/productsManager.mongo');


const router = Router()
const cartService = new CartManagerMongo
const productService = new ProductManagerMongo



//***************** GET *****************

router.get('/', async (req, res) => {
    try{
        const result = await cartService.getCarts()
        //Validaciones
        if (result.length === 0){
            res.send({status: 'success', message: 'GET desde rutas CARTS', data: 'No existen carritos creados'})
        } else {
            res.send({status: 'success', message: 'GET desde rutas CARTS', data: result})
        }
    } catch (error){
        res.status(400).send({ status: 'errorgetcart', message: error.message })
    }    
});




//***************** GET by ID *****************

router.get('/:pid', async (req, res) => {
    try{
        const { pid } = req.params
        // Valida que ID sea un ID Mongo Valido
        if (!isValidObjectId(pid)) {
            throw new Error (`El ID '${pid}' ingresado no es un ID de mongoDB válido`)
        } 

        const result = await cartService.getCart({_id: pid})

        // Valida si encuentra el producto por el ID
        if(result){
            res.send({status: 'success', message: 'GET by ID desde rutas CARTS', data: result})
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
        const {body} = req
        const result = await cartService.createCart(body)
        res.send({status: 'success', message: 'POST desde rutas CARTS', data: result})
    } catch (error){
        res.status(400).send({ status: 'errorpostcart', message: error.message })
    }
});




//***************** POST Anadir Productos al carrito *****************

router.post('/:pidCart/products/:pidProduct', async (req, res) => {
    try {
        const { pidCart, pidProduct } = req.params;
        // Valida que los ID`s  sean un ID Mongo Valido
        if (!isValidObjectId(pidCart) || !isValidObjectId(pidProduct) ) {
            throw new Error (`Uno de los ID´s o ambos, no son ID de mongoDB validos`)
        } 
        // Busqueda y validacion de carrito en BD
        const resultCartFind = await cartService.getCart({_id: pidCart})
        if (!resultCartFind){
            throw new Error (`El ID carrito ingresado no existe en BD`)
        }
        // Busqueda y validacion de Producto en BD
        const resultProductFind = await productService.getProduct({_id: pidProduct})
        if (!resultProductFind){
            throw new Error (`El ID producto ingresado no existe en BD`)
        }

        const { body } = req;
        // Valida que la quantity este en el request
        if (body.quantity === undefined) {
            throw new Error ('El campo quantity es obligatorio')
        }
        // Valida que la cantidad un dato numerico y que sea 1 o mayor
        if(isNaN(body.quantity) || body.quantity <= 0){
            throw new Error (`quantity no es un Numero, o no es mayor o igual a 1`)
        }
        // Agregar producto a carrito con quantity indicada
        const result = await cartService.createProductToCart(pidCart, pidProduct, body);
        res.send({ status: 'success', message: 'Producto añadido al carrito', data: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});



//***************** PUT Actualizar cantidad del producto en el carrito *****************

router.put('/:pidCart/products/:pidProduct', async (req, res) => {
    try {
        const { pidCart, pidProduct } = req.params;
        // Valida que los ID`s  sean un ID Mongo Valido
        if (!isValidObjectId(pidCart) || !isValidObjectId(pidProduct) ) {
            throw new Error (`Uno de los ID´s o ambos, no son ID de mongoDB validos`)
        } 
        // Busqueda y validacion de Carrito en BD
        const resultCartFind = await cartService.getCart({_id: pidCart})
        if (!resultCartFind){
            throw new Error (`El ID carrito ingresado no existe en BD`)
        }
        // Busqueda y validacion de Producto en BD
        const resultProductFind = await productService.getProduct({_id: pidProduct})
        if (!resultProductFind){
            throw new Error (`El ID producto ingresado no existe en BD`)
        }

        const { quantity } = req.body;

        // Valida que la quantity este en el request
        if (quantity === undefined) {
            throw new Error ('El campo quantity es obligatorio')
        }
        // Valida que la cantidad un dato numerico y que sea 1 o mayor
        if(isNaN(quantity) || quantity <= 0){
            throw new Error (`quantity no es un Numero, o no es mayor o igual a 1`)
        }

        // Actualiza quantity indicada
        const result = await cartService.updateCart(pidCart, pidProduct, quantity);
        res.send({ status: 'success', message: 'Cantidad del producto actualizada en el carrito', data: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});



//***************** PUT Actualizar array de productos en request *****************

router.put('/:pidCart', async (req, res) => {
    try {
        const { pidCart } = req.params;
        const { products } = req.body; 

        // Validar que el ID del carrito sea válido
        if (!isValidObjectId(pidCart)) {
            throw new Error ('El ID del carrito no es válido')
        }
        // Validar que el array de productos esté presente y sea un array
        if (!Array.isArray(products)) {
            throw new Error ('El cuerpo de la solicitud debe contener un array de productos')

        }
        // Busqueda y validacion de Carrito en BD
        const resultCartFind = await cartService.getCart({_id: pidCart})
        if (!resultCartFind){
            throw new Error (`El ID carrito ingresado no existe en BD`)
        }
        // Validar que todos los productos en el array sean válidos
        for (const product of products) {
            if (!isValidObjectId(product._id)) {
                return res.send({ status: 'error', message: `El ID del producto ${product._id} no es válido` });
            }
            if(isNaN(product.quantity) || product.quantity <= 0 ){
                return res.send({ status: 'error', message: `quantity no es un numero, o no es mayor o igual a 1` });
            }
        }

        // Actualizar el carrito con el nuevo array de productos
        const result = await cartService.updateProduct(pidCart, products);
        res.send({ status: 'success', message: 'Productos actualizados en el carrito'});

    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});




//**********  DELETE (Vaciar productos en el carrito pero no eliminar el carrito) *****************

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        // Valida que ID sea un ID Mongo Valido
        if (!isValidObjectId(pid)) {
            throw new Error (`El ID '${pid}' ingresado no es un ID de mongoDB válido`)
        } 
        // Busqueda y validacion de Carrito en BD
        const resultCartFind = await cartService.getCart({_id: pid})
        if (!resultCartFind){
            throw new Error (`El ID carrito ingresado no existe en BD`)
        }
        const result = await cartService.deleteCart(pid);
        res.send({ status: 'success', message: 'Productos eliminados del carrito', data: result });
    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});



//***************** DELETE Eliminar Productos del carrito *****************

router.delete('/:pidCart/products/:pidProduct', async (req, res) => {
    try {
        const { pidCart, pidProduct } = req.params;
        // Valida que los ID`s  sean un ID Mongo Valido
        if (!isValidObjectId(pidCart) || !isValidObjectId(pidProduct) ) {
            throw new Error (`Uno de los ID´s o ambos, no son ID de mongoDB validos`)
        } 
        // Busqueda y validacion de carrito en BD
        const resultCartFind = await cartService.getCart({_id: pidCart})
        if (!resultCartFind){
            throw new Error (`El ID carrito ingresado no existe en BD`)
        }
        // Busqueda y validacion de Producto en BD
        const resultProductFind = await productService.getProduct({_id: pidProduct})
        if (!resultProductFind){
            throw new Error (`El ID producto ingresado no existe en BD`)
        }

        const result = await cartService.deleteProductFromCart(pidCart, pidProduct);
        let productDelete = result.modifiedCount

        // Valida si producto se encuentra en carrito
        if(productDelete === 0){
            res.send({ status: 'success', message: 'Producto No se encuentra en el carrito'});
        } else{
            res.send({ status: 'success', message: 'Producto eliminado del carrito'});
        }


    } catch (error) {
        res.status(400).send({ status: 'error', message: error.message });
    }
});







module.exports = router


