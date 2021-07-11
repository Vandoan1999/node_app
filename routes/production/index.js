const express = require('express');
const router = express.Router();
const productHomeController = require('../../controller/production/productHomeController')
router.get('/', productHomeController.index)
module.exports = router;