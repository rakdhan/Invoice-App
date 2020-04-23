const  { Menu, ProductionHouse, Customer, Order } = require('../models')
const formatUang = require('../helpers/formatUang')

class MenuController {

    static show(req, res){
        const alert = req.query
        Menu.findAll({
            // order : [['released_year', 'DESC']]
        })
        .then( data => {
            // res.send(data)
            res.render('menu', {data, alert, formatUang})
        })
        .catch( (err) => {
            res.render('error', {msg:err})
        })
    }

    static addPage(req, res){
        const alert = req.query
        // ProductionHouse.findAll()
        Menu.findAll()
        .then( data => {
            // res.send(data)
            res.render('add-menu', {data, alert})
        })
        .catch( () => {
            res.render('error')
        })
    }

    static postAddPage(req, res){
        Menu.create({
            name: req.body.name,
            price: req.body.price
        })
        .then( () => {
            const msg = `Succesfully added new menu! '${req.body.name}'`
            res.redirect(`/menu?msg=${msg}`)
        })
        .catch( (err) => {
            res.render('error', {msg: err})
        })
    }

    static editPage(req, res){
        const alert = req.query
        let newData
        // ProductionHouse.findAll()
        Menu.findAll({
            order: [['id']]
        })
        .then( temp => {
            newData = temp
            return Menu.findByPk(Number(req.params.id))
        })
        .then( data => {
            res.render('edit-menu', {data, newData, alert})
        })
        .catch( () => {
            res.render('error')
        })

    }

    static postEditPage(req, res){
        Menu.update({
            name: req.body.name,
            price: req.body.price
        }, {
            where: {
                id: Number(req.params.id)  
            }
        })
        .then( () => {
            const msg = `Successfully edit selected menu!`
            res.redirect(`/menu?msg=${msg}`)
        })
        .catch( (err) => {
            res.render('error', {msg: err})
        })
    }

    static delete(req, res){
        Menu.destroy({
            where:{
                id: Number(req.params.id)
            }
        })
        .then( () => {
            const msg = `Successfully delete selected menu.`
            res.redirect(`/menu?msg=${msg}`)
        })
        .catch( (err) =>{
            res.render('error' ,{msg: err})
        })
    }

    static addCustomer(req, res){
        const alert = req.query
        let dataCust = null
        let data = null
        // Cast.findAll()
        Customer.findAll()
        .then( data1 => {
            dataCust = data1
            return Menu.findByPk(Number(req.params.id), {include : {model: Customer}})
        })
        .then( data2 => {
            data = data2
            return Order.findAll({
                where: {
                    MenuId : req.params.id
                }
            })
        })
        .then( dataOrder => {
            res.render('add-order', {data, dataCust, dataOrder, alert})
            // res.send(data, dataCust, dataOrder, alert)
        })
        .catch( (err) => {
            // res.send(err)
            res.render('error', {msg : err})
        })
    }

    static postAddCustomer(req, res){
        Order.create({
            MenuId: req.body.MenuId,
            CustomerId: req.body.CustomerId
        })
        .then( () => {
            res.redirect(`/menu/addCustomers/${req.params.id}`)
        })
        .catch( err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/menu/addCustomers/${req.params.id}?msg=${msg.join(', ')}&type=danger`)
        })
    }

}

module.exports = MenuController;