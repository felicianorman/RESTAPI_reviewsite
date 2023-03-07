const express = require('express')
const router = express.Router()
const { getAllCompanies, getCompanyById, deleteCompanyById, createNewCompany, updateCompanyById } = require('../controller/companyController')

router.get('/', getAllCompanies)
router.get('/:companyId', getCompanyById)
router.delete('/:companyId', deleteCompanyById)
router.post('/', createNewCompany)
router.put('/:companyId', updateCompanyById);

module.exports = router

//lägga till isAuthenticated, authorizeRoles(userRoles.ADMIN)