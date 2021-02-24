const { fetch } = require('./../../../db/db.js')

const GET = async (req, res) => {
	try {
		const SELECT_ALL_PRODUCTS = `
			select
				p.product_name, 
				p.product_price, 
				p.product_image, 
				p.product_info,
				r.reserve_product_count
			from reserves as r
			join products as p on r.product_id = p.product_id;
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

module.exports = {
	GET
}