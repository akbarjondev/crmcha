const { fetch } = require('./../../../db/db.js')

const getAllClients = async (req, res) => {

	try {

		const data = await fetch('select count(client_id) as clients_number from clients;')

		res.send({
			status: 200,
			message: 'ok',
			data: data
		})

	} catch(e) {
		console.log(e)
	}

}

module.exports = {
	getAllClients,
}
