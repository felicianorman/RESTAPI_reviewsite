const { QueryTypes } = require('sequelize')
const { sequelize } = require('../database/config')

exports.getAllCompanies = async (req, res) => {
    const [companies, metadata] = await sequelize.query('SELECT * FROM company',)
    return res.json(companies)
}