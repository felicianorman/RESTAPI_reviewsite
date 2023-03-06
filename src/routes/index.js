const express = require("express");
const router = express.Router();

const authRoutes = require('./authRoutes')
const companyRoutes = require('./companyRoutes')
const reviewRoutes = require('./reviewRoutes')
const userRoutes = require('./userRoutes')

router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
router.use/('/reviews', reviewRoutes);
router.use('/companies', companyRoutes)

module.exports = router;