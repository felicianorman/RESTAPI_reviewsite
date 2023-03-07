const express = require('express')
const router = express.Router()
const { getAllCompanies, getCompanyById, deleteCompanyById, createNewCompany } = require('../controller/companyController')

router.get('/', getAllCompanies)
router.get('/:companyId', getCompanyById)
router.delete('/:companyId', deleteCompanyById)
router.post('/', createNewCompany)

module.exports = router
