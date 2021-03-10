const { fetch } = require('./../../../db/db.js')

const GET = async (req, res) => {

	try {
		const GET_ALL_SALES = `
			select
			  s.sale_id,
			  s.sale_date,
			  s.sale_status,
			  s.sale_product_count,
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
				sale_status = 1
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

module.exports.GET = GET
