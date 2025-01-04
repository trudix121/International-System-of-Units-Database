const { pool } = require('../db/postdb')


async function check_key(req, res, next) {
    const key = req.query.key
    const rest = await pool.query('SELECT * from api_keys WHERE key=$1', [key])
   // console.log(rest.rows[0])
    if (rest.rows.length > 0) {
        next()
    }
    else if(rest.rows.length <= 0 ){

        res.status(401).send({'error':'unauthorized'})
    }
}

module.exports = check_key