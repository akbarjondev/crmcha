const { fetch } = require('./../../../db/db.js')

const GET = async (req, res) => {
	try {

		const SELECT_ALL_LOCATIONS = `SELECT * FROM locations;`

		const locations = await fetch(SELECT_ALL_LOCATIONS)

		if (locations.length) {
			res.send({
				status: 200,
				message: 'ok',
				data: locations
			})
		} else {
			res.send({
				status: 400,
				message: 'bad request',
			})
		}

	} catch(e) {
		console.error(e)
	}
}

const POST = async (req, res) => {
	try {
			const INSERT_LOCATIONS = `insert into locations(client_id, latitude, longitude) values($1, $2, $3) returning location_id`
			const { client_id: client, latitude, longitude } = req.body

			if (client && latitude && longitude) {
				const data = await fetch(INSERT_LOCATIONS, client, latitude, longitude)
				res.send({
					status: 200,
					message: 'ok',
					data: data
				})
			} else {
				res.send({
					status: 400,
					message: 'bad request',
					data: data
				})
			}

	} catch(e) {
		console.error(e)
	}
}

const PUT = async (req, res) => {

	try {

		const UPDATE_LATITUDE = `UPDATE locations SET latitude = $1 where location_id = $2`
		const UPDATE_LONGITUDE = `UPDATE locations SET longitude = $1 where location_id = $2`

		const { location_id, latitude, longitude } = req.body

	 	if (latitude) {
			await fetch(UPDATE_LATITUDE, latitude, location_id)
		}  

		if (longitude) {
			await fetch(UPDATE_LONGITUDE, longitude, location_id)
		}

	} catch(e) {
		console.error(e)
	}

}

module.exports = {
	GET,
	POST,
	PUT,
}