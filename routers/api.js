const express = require('express');
const router = express.Router();

const cookiejwt = require('../lib/jwt');
const generate_key = require('../lib/gen_key');
const cookieParser = require('cookie-parser')
const check_key = require('../lib/verify_key')
const { find } = require('../db/mongodb')


router.use(cookieParser())
// Route setup
router.get('/gen', cookiejwt, generate_key, async (req, res) => {
});

router.get('/get/:name', check_key, async (req, res) => {
    res.json(await find('base_units', 'derived_units', {unit_type:req.params.name }))
})


module.exports = router;
