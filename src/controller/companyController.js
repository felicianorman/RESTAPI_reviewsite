const { QueryTypes } = require("sequelize");
const { sequelize } = require("../database/config");

//hämta alla företag
exports.getAllCompanies = async (req, res) => {
  const query = `SELECT * FROM company;`;

  const [results, metadata] = await sequelize.query(query);

  console.log(results);
  // const [companies, metadata] = await sequelize.query(`SELECT * FROM company;`)
  // return res.json(companies)
};

exports.getCompanyById = async (req, res) => {
  const companyId = req.params.companyId;
  
  const [results, metadata] = await sequelize.query(`
    SELECT c.id, c.name FROM company c
    WHERE c.id = $companyId`,
    {
        bind: { companyId: companyId }
    })

    console.log(results)
    return res.json(results)
};

