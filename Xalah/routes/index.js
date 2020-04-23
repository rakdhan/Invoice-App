const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')

const routeMenu = require('./menu')
const routeCustomer = require('./customer')

router.get('/', HomeController.getHome)
router.use('/menu', routeMenu)
router.use('/customers', routeCustomer)
router.get('/*', HomeController.notFound)

module.exports = router