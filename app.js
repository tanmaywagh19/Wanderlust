if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const Listing = require('./models/listing.js')
const methodOverride = require('method-override')
const ejsMate = require("ejs-mate")
const wrapAsync = require('./utils/wrapAsync.js')
const ExpressError = require('./utils/expressError.js')
const { listingSchema, reviewSchema } = require('./schema.js')
const Review = require('./models/review.js');
const review = require('./models/review.js');
const { wrap } = require('module');
const listingRouter = require('./routes/listing.js')
const reviewRouter = require('./routes/review.js')
const userRouter = require('./routes/user.js')
const session = require('express-session')
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash')
const LocalStrategy = require('passport-local')
const User = require('./models/user.js');
const passport = require('passport');

const dbUrl = process.env.ATLAS_DB_URL;
main()
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))
app.engine("ejs", ejsMate);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error", () => {
    console.log("ERROR In MONGO SESSION STORE :", err)
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}



app.use(session(sessionOptions))
app.use(flash());

//Complete Passport setup
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currUser = req.user;
    next();
})


//Listings Routes
app.use('/listings', listingRouter);

//Review Routes
app.use('/listings/:id/reviews', reviewRouter);

//User Routes
app.use('/', userRouter);

app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something Wrong!' } = err;
    res.status(statusCode).render("error.ejs", { err })
})

app.listen(8080, () => {
    console.log("Listening on Port 8080");
});