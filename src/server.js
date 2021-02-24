const ejs = require('ejs')
const parser = require('co-body')
const { fetch } = require('./db/db.js')
const { PORT } = require('./config/config.js')

const BotClients = require('./modules/bot/clients/clients.js')
const BotProducts = require('./modules/bot/products/products.js')

const run = (app, express) => {

	app.use(express.json())

	// Admin Panel
	app.engine('html', ejs.renderFile)
	app.set('view engine', 'html')

	app.get('/admin', (req, res) => {
		res.send('Admin Panel')
	})

	// BOT API 
	// add client
	app.post('/bot/clients', BotClients.POST)

	// edit client
	app.put('/bot/clients', BotClients.PUT)

	// get all products ready at reserve
	app.get('/bot/products', BotProducts.GET)

	app.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
}

module.exports.run = run
