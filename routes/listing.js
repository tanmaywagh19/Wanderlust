const express = require('express')
const router = express.Router()
const Listing = require('../models/listing.js')
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/expressError.js')
const { listingSchema, reviewSchema } = require('../schema.js')
const flash = require('connect-flash')
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js')
const listingController = require('../controllers/listings.js')

const multer = require('multer')
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage })
// const leaflet = require('leaflet')
const nominatim = require('nominatim')

//Index Route,Create Route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image]'), validateListing, isLoggedIn, wrapAsync(listingController.createListing))


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm)

//Search Route
router.get('/search', async (req, res) => {
    let search = req.query.search;
    await Listing.createIndexes({country:"text",location:"text"})
    if (search) {
        const allListing = await Listing.find({location:`${search}`})
        res.render('search.ejs', { allListing })
    }else{
        res.redirect('/listings')
    }

})

//Read Route (Show),Update Route,Delete Route
router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(upload.single('listing[image]'), validateListing, isOwner, isLoggedIn,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing))



module.exports = router;