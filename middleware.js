const ExpressError = require('./utils/expressError.js')
const { listingSchema,reviewSchema } = require('./schema.js')
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'Login required!')
        return res.redirect('/login')
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    res.locals.redirectUrl = req.session.redirectUrl;
    next()
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((er) => er.message).join(",")
        console.log(errMsg)
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash('error', 'Access denied,Unable to Change!')
        return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map(er => er.message).join(",");
        let errPath = error.details.map(er => console.log(er)).join(",")
        console.log(errPath);
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let { id , reviewId} = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash('error','Access denied,Unable to delete!')
        return res.redirect(`/listings/${id}`)
    }
    next()
}