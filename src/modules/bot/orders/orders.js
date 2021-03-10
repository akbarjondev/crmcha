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

const GETAll = async (req, res) => {

	try {
		const { user_id } = req.params
		
		const selectAllOrders = `
			select
			  s.sale_product_count,
			  p.product_name,
			  p.product_price,
			  p.product_id
			from 
			  sales as s
			join
			  products as p on p.product_id = s.product_id
			where
			  s.sale_status = 0 and s.client_id = $1;
		`
		const data = await fetch(selectAllOrders, user_id)

		res.send({
			status: 200,
			message: 'ok',
			data: data
		})
	} catch(e) {
		console.log(e)
	}

}

const DELETEOrder = async (req, res) => {

	try {
		const { user_id } = req.body

		const deleted = await fetch('delete from sales where sale_status = 0 and client_id = $1 returning sale_id', user_id)

		res.send({
			status: 200,
			message: 'deleted',
			data: deleted
		})

	} catch(e) {
		console.log(e)
	}

}

module.exports = {
	POST,
	GETAll,
	DELETEOrder,
}