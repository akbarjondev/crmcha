const { fetch } = require('./../../../db/db.js')

const addProduct = async (req, res) => {

	try {

		const { name, price, image, info } = req.body
			
		const ADD_NEW_PRODUCT = `
			insert into products (
				product_name,
				product_price,
				product_image,
				product_info
			) 
			values ($1, $2, $3, $4)
			returning *
		`

		const addedProduct = await fetch(ADD_NEW_PRODUCT, name, price, image, info)

		res.send({
			status: 200,
			message: 'product added',
			data: addedProduct
		})

	} catch(e) {
		console.log(e)
	}

}

const editProduct = async (req, res) => {

	try {

		const { id, name, price, image, info, status } = req.body
			
		const EDIT_PRODUCT = `
			update products
			set
				product_name = $1,
				product_price = $2,
				product_image = $3,
				product_info = $4,
				product_status = $5
			where
				product_id = $6
			returning *
		`

		const editedProduct = await fetch(EDIT_PRODUCT, name, price, image, info, status, id)

		res.send({
			status: 200,
			message: 'product edited',
			data: editedProduct
		})

	} catch(e) {
		console.log(e)
	}

}

const deleteProduct = async (req, res) => {

	try {

		const { id } = req.body
			
		const DELETED_PRODUCT = `
			update
				products
			set
				product_status = 0
			where
				product_id = $1
			returning product_id;
		`

		const deletedProduct = await fetch(DELETED_PRODUCT, id)

		res.send({
			status: 200,
			message: 'product deleted',
			data: deletedProduct
		})

	} catch(e) {
		console.log(e)
	}

}

const getProducts = async (req, res) => {

	try {

		const GET_PRODUCTs = `
			select 
				* 
			from 
				products
			where
				product_status = 1;
		`

		const allProducts = await fetch(GET_PRODUCTs)

		res.send({
			status: 200,
			message: 'ok',
			data: allProducts
		})

	} catch(e) {
		console.log(e)
	}

}

module.exports = {
	addProduct,
	editProduct,
	getProducts,
	deleteProduct,
}
