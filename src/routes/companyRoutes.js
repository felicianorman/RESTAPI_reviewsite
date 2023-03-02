const express = require('express')
const router = express.Router()
const { getAllCompanies, getCompanyById } = require('../controller/companyController')

router.get('/', getAllCompanies)
router.get('/:companyId', getCompanyById)


module.exports = router
