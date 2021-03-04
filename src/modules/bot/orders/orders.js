const { fetch } = require('./../../../db/db.js')

const POST = async (req, res) => {
	
	const { sale_product_count, product_id, client_id, location_id } = req.body

	try {
		
		const addNewOrder = await fetch(`
			insert into 
				sales (
					sale_product_count,
					product_id,
					client_id,
					location_id
				)
			values
				($1, $2, $3, $4)
			returning
				sale_id,
				sale_date,
				sale_product_count,
				product_id,
				client_id,
				location_id
		`, sale_product_count, product_id, client_id, location_id)

		res.send({
			status: 200,
			message: 'ok',
			data: addNewOrder
		})
	} catch(e) {
		console.log(e)

		res.send(e)
	}
}

module.exports = {
	POST,
}