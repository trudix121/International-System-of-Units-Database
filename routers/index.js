const express = require('express');
const router = express.Router();

const db = require('../db/mongodb');
const { off } = require('process');

router.use(express.urlencoded({extended:true}))
router.use(express.json())



router.get('/', async (req,res)=>{
    res.render('index/index')
})

router.post('/search', async(req,res)=>{
    const searched = req.body.searched.toLowerCase()
    res.redirect(`/data/${searched}`)
})

router.get('/data/:searched', async (req, res) => {
    const searched = req.params.searched;
    const result = await db.find('base_units', 'derived_units', { 'unit_type': searched});

  // console.log(result)
    // Verificăm dacă unitatea a fost găsită
    if (result.finded === false) {
        res.render('lib/error', { unit_type : searched})
    } else if (!Array.isArray(result.result)) {
        res.send('No units found for the specified type.');
    } else {
       // console.log(result)
        if(result.type == 'derive_unit'){
            res.render('index/data_derived', { data: result.result });
        }
        else if (result.type == 'base_unit') {
      //      console.log(result.result)
            res.render('index/data_base', {data: result.result})

        }

    }
    
});





module.exports = router;
