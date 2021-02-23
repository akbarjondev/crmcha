const ejs = require('ejs')
const parser = require('co-body')
const { fetch } = require('./db/db.js')
const { PORT } = require('./config/config.js')

const BotClients = require('./modules/bot/clients/clients.js')

const run = (app, express) => {

	app.use(express.json())

	// Admin Panel
	app.engine('html', ejs.renderFile)
	app.set('view engine', 'html')

	app.get('/admin', (req, res) => {
		res.send('Admin Panel')
	})


	// API
	app.post('/bot/clients', BotClients.POST)

	app.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
}

module.exports.run = run
