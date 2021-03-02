const ejs = require('ejs')
const cors = require('cors')
const parser = require('co-body')
const { fetch } = require('./db/db.js')
const { PORT } = require('./config/config.js')

const BotOrders = require('./modules/bot/orders/orders.js')
const BotClients = require('./modules/bot/clients/clients.js')
const BotProducts = require('./modules/bot/products/products.js')
const BotLocations = require('./modules/bot/locations/locations.js')

const AdminOrders = require('./modules/adminPanel/orders/orders.js')

const run = (app, express) => {

	app.use(express.json())
	app.use(cors())

	app.engine('html', ejs.renderFile)
	app.set('view engine', 'html')

	//* ADMIN PANEL *//
	// get orders
	app.get('/admin/orders', AdminOrders.GET)

	//* BOT API *// 
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
	app.post('/bot/order', BotOrders.POST)

	// get locations
	app.get('/bot/locations', BotLocations.GET)

	// post locations
	app.post('/bot/locations', BotLocations.POST)

	// update locations
	app.put('/bot/locations', BotLocations.PUT)


	app.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
}

module.exports.run = run