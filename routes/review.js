const express = require('express')
const router = express.Router({ mergeParams: true })
const Listing = require('../models/listing.js')
const wrapAsync = require('../utils/wrapAsync.js')
const { listingSchema, reviewSchema } = require('../schema.js')
const Review = require('../models/review.js');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware.js')
const reviewController = require('../controllers/reviews.js')

//Reviews
//Post Review Route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.postReviewRoute))

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReviewRoute))

module.exports = router;