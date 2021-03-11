const { fetch } = require('./../../../db/db.js')

const GET = async (req, res) => {

	try {
		const GET_ALL_SALES = `
			select
			  s.sale_id,
			  s.sale_date,
			  s.sale_status,
			  s.sale_product_count,
			  l.latitude,
			  l.longitude,
			  p.product_name,
			  p.product_price,
			  p.product_image,
			  p.product_info,
			  c.tg_username,
			  c.tg_phone,
			  c.tg_first_name,
			  c.tg_last_name,
			  c.client_id
			from
			  sales as s
			join
			  products as p on p.product_id = s.product_id
			join
			  locations as l on l.location_id = s.location_id
			join
				clients as c on c.client_id = s.client_id
			where
				s.location_id <> 0 and 
				sale_status <> 5
			order by s.sale_date asc
			;
		`

		res.send({
			status: 200,
			message: 'ok',
			data: await fetch(GET_ALL_SALES)
		})

	} catch(e) {
		console.log(e)

		res.send(e)
	}
}

const changeStatus = async (req, res) => {

	try {
		const { status, sale_id } = req.body

		const changedStatus = await fetch(`
			update
				sales
			set
				sale_status = $1
			where
				sale_id = $2
			returning
				sale_id,
				sale_status
		`, status, sale_id)

		res.send({
			status: 200,
			message: 'ok',
			data: changedStatus
		})

	} catch(e) {
		console.log(e)
	}

}

const getFilteredProducts = async (req, res) => {

	try {

		const GET_FILTERED_PRODUCTS = `
			select
			  array_agg(s.sale_id) as sale_id,
			  array_agg(s.sale_date) as sale_date,
			  array_agg(s.sale_status) as sale_status,
			  array_agg(s.sale_product_count) as product_count,
			  array_agg(l.latitude) as latitude,
			  array_agg(l.longitude) as longitude,
			  array_agg(p.product_name) as product_name,
			  array_agg(p.product_price) as product_price,
			  array_agg(p.product_image) as product_image,
			  array_agg(p.product_info) as product_info,
			  c.tg_username as tg_username,
			  c.tg_phone as tg_phone,
			  c.tg_first_name as tg_first_name,
			  c.tg_last_name,
			  c.client_id
			from
			  sales as s
			join
			  products as p on p.product_id = s.product_id
			join
			  locations as l on l.location_id = s.location_id
			join
			  clients as c on c.client_id = s.client_id
			where
			  s.location_id <> 0
			group by c.client_id
			order by sale_date asc
			;
		`

		const allFilteredProducts = await fetch(GET_FILTERED_PRODUCTS)

		res.send({
			status: 200,
			message: 'ok',
			data: allFilteredProducts
		})

	} catch(e) {
		console.log(e)
	}

}

module.exports = {
	getFilteredProducts,
	GET,
	changeStatus
}
