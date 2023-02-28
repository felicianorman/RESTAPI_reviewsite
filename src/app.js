require('dotenv').config()
const express = require('express')
const { sequelize } = require('./database/config.js')
const companyRoutes = require('./routes/companyRoutes')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
	console.log(`Processing ${req.method} request to ${req.path}`)
	next()
})

app.use('/api/v1/companies', companyRoutes)

const port = process.env.PORT || 3000
const run = async () => {
	try {
		await sequelize.authenticate()

		app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`)
			//FRÅGA PETTER om node 
		})
	} catch (error) {
		console.error(error)
	}
}

run()