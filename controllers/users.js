const User = require('../models/user.js')


module.exports.renderSignUpRoute = (req, res) => {
    res.render('./users/signup.ejs')
}

module.exports.userSignUpRoute = async (req, res) => {
    try {
        let { username, email, password } = await req.body;
        let newUser = await new User({ username, email })
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to WanderLust!')
            res.redirect('/listings');
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/signup')
    }
}

module.exports.renderLoginRoute = (req, res) => {
    res.render('./users/login.ejs')
}

module.exports.userLoginRoute = async (req, res) => {
        console.log(req.user)
        req.flash('success', 'Welcome back to WanderLust!')
        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl);
    }

module.exports.userLogOutRoute = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out!')
        res.redirect('/listings')
    })
}