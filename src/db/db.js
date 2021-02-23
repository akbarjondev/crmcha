const Pool = require('pg').Pool

const pool = new Pool({
	'host': 'localhost',
	'user': 'postgres',
	'password': '11235',
	'database': 'ajwa',
	'port': 5432
})

const fetch = async (SQL, ...params) => {
	const client = await pool.connect()

	try {
		
		const { rows } = await client.query(SQL, params)
		return rows

	} catch(e) {
		console.log(e)
	} finally {
		client.release()
	}
}

module.exports.fetch = fetch
