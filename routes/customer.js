const express = require('express')
const router = express.Router()

const CustomerController = require('../controllers/CustomerController')

router.get('/', CustomerController.show)
router.get('/add', CustomerController.addPage)
router.post('/add', CustomerController.postAddPage)
router.get('/delete/:id', CustomerController.delete)
router.get('/order/:id', CustomerController.orderBy)

module.exports = router