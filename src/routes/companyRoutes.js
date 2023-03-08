const express = require('express');
const { userRoles } = require('../constants/users');
const router = express.Router()
const { getAllCompanies, getCompanyById, deleteCompanyById, createNewCompany, updateCompanyById } = require('../controller/companyController')

const { isAuthenticated, authorizeRoles} = require("../middleware/authenticationMiddleware");

router.get('/', getAllCompanies)
router.get('/:companyId', getCompanyById)
router.delete('/:companyId', isAuthenticated, authorizeRoles(userRoles.ADMIN, userRoles.OWNER), deleteCompanyById)
router.post('/', isAuthenticated, authorizeRoles(userRoles.ADMIN, userRoles.OWNER), createNewCompany)
router.put('/:companyId', isAuthenticated, authorizeRoles(userRoles.ADMIN, userRoles.OWNER), updateCompanyById);

module.exports = router
