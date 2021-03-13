const ejs = require('ejs')
const cors = require('cors')
const http = require('http')
const parser = require('co-body')
const { fetch } = require('./db/db.js')
const { EventEmitter } = require('events')
const { PORT } = require('./config/config.js')


const BotOrders = require('./modules/bot/orders/orders.js')
const BotClients = require('./modules/bot/clients/clients.js')
const BotProducts = require('./modules/bot/products/products.js')
const BotLocations = require('./modules/bot/locations/locations.js')

const AdminOrders = require('./modules/adminPanel/orders/orders.js')
const AdminProducts = require('./modules/adminPanel/products/products.js')
const AdminClients = require('./modules/adminPanel/clients/clients.js')

const ee = new EventEmitter()

const run = (app, express) => {

	const server = http.createServer(app)
	const io = require('socket.io')(server)

	app.use(express.json())
	app.use(cors())


	app.engine('html', ejs.renderFile)
	app.set('view engine', 'html')

	//* ===================== ADMIN PANEL ===================== *//
	// get orders
	app.get('/admin/orders', AdminOrders.GET)

	//change order status
	app.put('/admin/orders', AdminOrders.changeStatus)

	// get all filtered orders
	app.get('/admin/orders/filtered', AdminOrders.getFilteredProducts)

	// get all products
	app.get('/admin/products', AdminProducts.getProducts)

	// add product
	app.post('/admin/product', AdminProducts.addProduct)

	// edit product
	app.put('/admin/product', AdminProducts.editProduct)

	// delete product
	app.delete('/admin/product', AdminProducts.deleteProduct)

	// get all clients count
	app.get('/admin/clients', AdminClients.getAllClients)


	//* ===================== BOT API ===================== *// 
	// add client
	app.post('/bot/clients', BotClients.POST)

	// find client by tg_user_id
	app.get('/bot/client/:tg_user_id', BotClients.GET_ONE)

	// edit client
	app.put('/bot/clients', BotClients.PUT)

	// get all products ready at reserve
	app.get('/bot/products', BotProducts.GET)

	// get one product ready at reserve
	app.get('/bot/product/:product_id', BotProducts.GET_ONE)

	// add new order || sale
	app.post('/bot/order', async (req, res) => {
		const { sale_product_count, product_id, client_id, location_id } = req.body

		try {
			const data = await BotOrders.POST(sale_product_count, product_id, client_id, location_id)
			
			res.send({
				status: 200,
				message: 'ok',
				data: data
			})

		} catch(e) {
			console.log(e)

			res.send(e)
		}
	})

	// select all products on status basket for basket
	app.get('/bot/orders/:user_id', BotOrders.GETAll)

	// edit orders 
	/*
	* Status
	*	0 - basket
	*	1 - ordered
	* 2 - coocking
	* 3 - onway
	* 4 - completed
	* 5 - cancelled
	*/
	app.put('/bot/order', BotOrders.MAKEStatus)

	// get locations
	app.get('/bot/locations', BotLocations.GET)

	// post locations 
	app.post('/bot/locations', async (req, res) => {
		try {
			const { client_id: client, latitude, longitude } = req.body

			const data = await BotLocations.POST(client, latitude, longitude)

			io.emit('new_order', { data })
			
			res.send({
				status: 200,
				message: 'ok',
				data: data
			})

		} catch(e) {
			console.log(e)
		}
	})

	// update locations
	app.put('/bot/locations', BotLocations.PUT)


	io.on('connection', client => {

		console.log('connected: ' + client.id)

	})

	server.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
}

module.exports.run = run
