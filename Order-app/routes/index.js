const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')

const routeCustomer = require('./customer')
const routeMenu = require('./menu')

router.get('/', HomeController.getHome)
router.use('/customers', routeCustomer)
router.use('/menus', routeMenu)
router.get('/*', HomeController.notFound)

module.exports = router