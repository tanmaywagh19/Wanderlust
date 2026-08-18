const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const wrapAsync = require('../utils/wrapAsync.js')
const passport = require('passport')
const { isLoggedIn, saveRedirectUrl } = require('../middleware.js')
const userController = require('../controllers/users.js')

//SignUp Routes
router.route('/signup')
    .get(userController.renderSignUpRoute)
    .post(wrapAsync(userController.userSignUpRoute))

//Login Routes
router.route('/login')
    .get(userController.renderLoginRoute)
    .post(saveRedirectUrl,
        passport.authenticate('local',
            { failureRedirect: '/login', failureFlash: true }),
        wrapAsync(userController.userLoginRoute))

//LogOut Route
router.get('/logout', userController.userLogOutRoute)

module.exports = router;