const { fetch } = require('./../../../db/db.js')

const POST = async (req, res) => {

	const { tg_user_id, tg_first_name, tg_last_name, tg_username, tg_phone } = req.body

	try {
		const [ obj ] = await fetch('select count(client_id) from clients where tg_user_id = $1', tg_user_id)

		if(obj.count === '0') {

			const ADD_CLIENT = `
				insert into 
					clients (
						tg_user_id, 
						tg_first_name, 
						tg_last_name, 
						tg_username, 
						tg_phone)
				values
					($1, $2, $3, $4, $5)
				returning
					tg_user_id, 
					tg_first_name, 
					tg_last_name, 
					tg_username, 
					tg_phone 
			`

			const data = await fetch(ADD_CLIENT, tg_user_id, tg_first_name, tg_last_name, tg_username, tg_phone)

			res.send({
				status: 200,
				message: 'Client added',
				data: data
			})
		} else {
			res.send({
				status: 201,
				message: 'Client already exits'
			})
		}

	} catch(e) {
		console.log(e)

		res.send(e)
	}
}

const PUT = async (req, res) => {

	const { tg_phone, tg_user_id } = req.body

	try {
		const editedUser = await fetch('update clients set tg_phone = $1 where tg_user_id = $2 returning client_id', tg_phone, tg_user_id)
		
		res.send({
			status: 200,
			message: 'Client edited',
			data: editedUser
		})
	} catch(e) {
		console.log(e)

		res.send(e)
	}
}

const GET_ONE = async (req, res) => {

	const { tg_user_id } = req.params

	try {
		const client = await fetch('select client_id from clients where tg_user_id = $1', tg_user_id)

		res.send({
			status: 200,
			message: 'ok',
			data: client[0]
		})
	} catch(e) {
		console.log(e)

		res.send(e)
	}

}

module.exports = {
	POST, 
	PUT,
	GET_ONE
}

