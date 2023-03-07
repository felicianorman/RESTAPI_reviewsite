const { QueryTypes } = require('sequelize')
const { sequelize } = require('../database/config')
const { userRoles } = require("../constants/users");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");


exports.getAllCompanies = async (req, res) => {
    const [companies, metadata] = await sequelize.query('SELECT * FROM company')
    return res.json(companies)
}

exports.getCompanyById = async (req, res) => {
	const companyId = req.params.companyId

	const [company, metadata] = await sequelize.query(
		`
			SELECT id, name, adress, fk_city_id
			FROM company
			WHERE id = $companyId;
		`,
		{
			bind: { companyId: companyId },
		}
	)

    
	if (!company) throw new Error ("That company does not exist");

	// Send back user info
	return res.json(company);
}

exports.deleteCompanyById = async (req, res) => {

	const companyId = req.params.companyId


	if (companyId != req.user?.companyId && req.user.role !== userRoles.ADMIN) {
		throw new UnauthorizedError('Unauthorized Access')
	}


	const [results, metadata] = await sequelize.query('DELETE FROM company WHERE id = $companyId RETURNING *', {
		bind: { companyId },
	})


	if (!results || !results[0]) throw new NotFoundError('That company does not exist')

	await sequelize.query('DELETE FROM company WHERE id = $companyId', {
		bind: { companyId },
	})

	return res.sendStatus(204)
}

exports.createNewCompany = async (req, res) => {
	const { name, adress, fk_city_id} = req.body

	const [newCompanyId] = await sequelize.query('INSERT INTO company (name, adress, fk_city_id) VALUES ($name, $adress, $fk_city_id);', {
		bind: { 
        name: name,
        adress: adress,
        fk_city_id: fk_city_id
        
     },
		type: QueryTypes.INSERT, 
	})
	
	return res
    .setHeader('Location', `${req.protocol}://${req.headers.host}/api/v1/companies/${newCompanyId}`)
    .sendStatus(201)
}