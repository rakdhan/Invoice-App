const express = require('express')
const router = express.Router()

const MenuController = require('../controllers/MenuController')

router.get('/', MenuController.show)
router.get('/add', MenuController.addPage)
router.post('/add', MenuController.postAddPage)
router.get('/edit/:id', MenuController.editPage)
router.post('/edit/:id', MenuController.postEditPage)
router.get('/delete/:id', MenuController.delete)
router.get('/addCustomers/:id', MenuController.addCustomer)
router.post('/addCustomers/:id', MenuController.postAddCustomer)

module.exports = router