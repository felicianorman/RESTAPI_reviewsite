const { Sequelize } = require('sequelize')
const path = require('path')

const sequelize = new Sequelize('hairdresserMap', '', '', {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'hairdresserMap.sqlite')
})

module.exports = { sequelize }