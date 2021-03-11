const { fetch } = require('./../../../db/db.js')

const GET = async (req, res) => {
	try {
		const SELECT_ALL_PRODUCTS = `
			select
				product_id,
				product_name, 
				product_price, 
				product_image, 
				product_info
			from 
				products
			where product_status = 1
			;
		`

		const allProducts = await fetch(SELECT_ALL_PRODUCTS)
		
		res.send({
			status: 200,
			message: 'ok',
			data: allProducts
		})
		
	} catch(e) {
		console.log(e)

		res.send(e)
	}
}

const GET_ONE = async (req, res) => {

	const { product_id } = req.params

	try {
		const oneProduct = await fetch(`
			select
				p.product_id,
				p.product_name, 
				p.product_price, 
				p.product_image, 
				p.product_info
			from products as p
				where
					p.product_id = $1
			;
		`, product_id)


		res.send({
			status: 200,
			message: 'ok',
			data: oneProduct
		})
		
	} catch(e) {
		console.log(e)

		res.send(e)
	}
}

module.exports = {
	GET,
	GET_ONE
}