const { Router } = require('express')

const router = Router()

//GET
router.get('/', async (req, res) => {
    res.send({status: 'success', message: 'GET desde rutas CARTS'})
})

//GET by ID
router.get('/:pid', async (req, res) => {
    res.send({status: 'success', message: 'GET by ID desde rutas CARTS'})
})

//POST
router.post('/', async (req, res) => {
    res.send({status: 'success', message: 'POST desde rutas CARTS'})
})

//PUT
router.put('/:pid', async (req, res) => {
    res.send({status: 'success', message: 'PUT desde rutas CARTS'})
})

//DELETE
router.delete('/:pid', async (req, res) => {
    res.send({status: 'success', message: 'DELETE desde rutas CARTS'})
})


module.exports = router


