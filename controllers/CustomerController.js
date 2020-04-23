const  { Customer, Menu, Order } = require('../models')
const formatUang = require('../helpers/formatUang')

class CustomerController {

    static show(req, res){
        Customer.findAll({
            order : [['id', 'DESC']] 
            // include: [{model : Menu}]
        })
        .then( data => {
            // res.send(data)
            res.render('customer', {data})
        })
        .catch( (err) => {
            res.render('error')
        })
    }

    static addPage(req, res){
        // const alert = req.query
        // res.render('add-customer')
        let dataMenu = null;
        let data = null;
        Menu.findAll()
        .then(data1 =>{
            dataMenu = data1

            return Customer.findByPk(
                Number(req.params.id), 
                {include: { model: Menu }
            })
        })
        .then( data2 => {
            data = data2

            return Order.findAll({
                where: {
                    CustomerId : req.params.id
                }
            })
        })
        .then( dataOrder => {
            res.send(data, dataMenu, dataOrder, alert)
            // res.render('add-customer', {dataMenu, data, dataOrder})
        })
        .catch( (err) => {
            res.send(err)
            // res.render('error', {msg : err})
        })
    }

    static postAddPage(req, res){
        
        // Order.create({
        Customer.create({
            id: req.body.id,
            // menu: darimana,
            notes: req.body.notes,
        })
        .then( () => {
            res.redirect(`/customers`)
        })
        .catch( err => {
            const msg = `Yay! another customer.`
            res.redirect(`/customers/add?msg=${msg.join(', ')}`)
        })
    }

    static delete(req, res){
        Customer.destroy({
            where:{
                id: Number(req.params.id)
            }
        })
        .then( () => {
            res.redirect(`/customers`)
            return Order.destroy({
                where: {
                    CustomerId: Number(req.params.id)
                }
            })
        })
        .catch( (err) =>{
            res.send(err)
            // res.render('error')
        })
    }

    static orderBy(req, res){
        Customer.findByPk(Number(req.params.id), {
            include: [{ model : Menu }]
        })
        .then( data => {
            res.render('order-by', {data, formatUang})
            // res.send(data)
        })
        .catch( err => {
            res.render('error')
            // res.send(err)
        })
    }
}

module.exports = CustomerController;