const { fetch } = require('./../../../db/db.js')

const POST = async (sale_product_count, product_id, client_id, location_id) => {
	
	// const { sale_product_count, product_id, client_id, location_id } = req.body

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

		const [ lastOrder ] = addNewOrder

		return lastOrder

	} catch(e) {
		console.log(e)
	}
}

module.exports = {
	POST,
}