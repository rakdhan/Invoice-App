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
        res.render('add-customer')
    }

    static postAddPage(req, res){
       
        Customer.create({
            id: req.body.id,
            notes: req.body.notes
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