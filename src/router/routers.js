const { Router } = require('express')
const productsRouter = require('./api/products.router')
const cartsRouter = require('./api/carts.router')
const viewsProductRouter = require('./api/viewsProducts.router')
const viewsCartRouter = require('./api/viewsCart.router')

const router = Router()

router.use('/', viewsProductRouter)
router.use('/', viewsCartRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)


module.exports = router
