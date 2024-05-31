const express = require('express');
const router = express.Router();

const {getAllAssets , AddNewAssets , DeleteAssets , UpdateAssets , getSpecificAssets} = require('../Controller/assetController')

router.get('/getAsset', getAllAssets);
router.post('/AddAssets', AddNewAssets);
router.delete('/DeleteAssets/:id', DeleteAssets);
router.put('/UpdateAsset/:id', UpdateAssets);
router.get('/getAsset/:id', getSpecificAssets);


module.exports = router