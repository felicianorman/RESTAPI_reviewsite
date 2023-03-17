const { QueryTypes } = require('sequelize')
const { sequelize } = require('../database/config')
const { userRoles } = require("../constants/users");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");

exports.getAllCompanies = async (req, res) => {
	try {
	  const limit = Number(req.query.limit || 10);
	  const offset = Number(req.query.offset || 0);
	  const city = req.query.city;
  
	  if (!city) {
		const [companies, metadata] = await sequelize.query(
		  `SELECT * FROM company ORDER by name ASC, fk_city_id ASC LIMIT $limit OFFSET $offset;`,
		  {
			bind: {
			  limit: limit,
			  offset: offset,
			},
		  }
		);
		if (!companies || !companies[0]) {
		  throw new NotFoundError("sorry we can't find any companies");
		}
		return res.json({
		  data: companies,
		  metadata: {
			limit: limit,
			offset: offset,
		  },
		});
	  } else {
		const [companies, metadata] = await sequelize.query(
		  `SELECT * FROM company 
		  WHERE fk_city_id = (SELECT id FROM city WHERE UPPER(cityName)= UPPER(TRIM($cityName))) 
		  ORDER BY name ASC 
		  LIMIT $limit 
		  OFFSET $offset;`,
		  {
			bind: {
			  cityName: city,
			  limit: limit,
			  offset: offset,
			},
		  }
		);

		if (!companies || !companies[0]) {
		  throw new NotFoundError(" sorry we have no companies listed in that city");
		}
		return res.json({
		  data: companies,
		});
	  }
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ message: error.message });
	}
  };

exports.getCompanyById = async (req, res) => {
	try {
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
	
		return res.json(company);
		
	} catch (error) {
		return res.status(error.statusCode || 500).json(error.message)
		
	}
	
}

exports.deleteCompanyById = async (req, res) => {
	try {
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
		
	} catch (error) {
		return res.status(error.statusCode || 500).json(error.message);
	}
	
}

exports.createNewCompany = async (req, res) => {
	try {
		const { name, adress, fk_city_id, fk_user_id} = req.body

		const [newCompanyId] = await sequelize.query('INSERT INTO company (name, adress, fk_city_id, fk_user_id) VALUES ($name, $adress, $fk_city_id, $fk_user_id);', {
			bind: { 
			name: name,
			adress: adress,
			fk_city_id: fk_city_id,
			fk_user_id: fk_user_id,
			
		 },
			type: QueryTypes.INSERT, 
		})
		
		return res
		.setHeader('Location', `${req.protocol}://${req.headers.host}/api/v1/companies/${newCompanyId}`)
		.sendStatus(201)

		
		
	} catch (error) { 
		return res.status(error.statusCode || 500).json(error.message)
		
	}
};

exports.updateCompanyById = async (req, res) => {
	
	try {
		const { name, adress, fk_city_id } = req.body;
		const companyId = req.params.companyId;
		
	  if (req.user?.role !== userRoles.ADMIN) {
		throw new UnauthorizedError("Unauthorized Access");
	  }
	  const [companyExists] = await sequelize.query(
		`SELECT * FROM company WHERE id =$companyId;`,
		{
		  bind: {
			companyId: companyId,
		  },
		}
	  );
  
	  if (!companyExists || companyExists.length < 1) {
		throw new BadRequestError("That company does not exists");
	  }
  
	  const [updatedcompany] = await sequelize.query(
		`UPDATE company SET name= $name, adress = $adress, fk_city_id=$fk_city_id
		WHERE id = $companyId RETURNING *;`,
		{
		  bind: {
			name: name,
			adress: adress,
			fk_city_id: fk_city_id,
			companyId: companyId,
		  },
		}
	  );
  
	  return res.status(200).json(updatedcompany[0]);
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  };