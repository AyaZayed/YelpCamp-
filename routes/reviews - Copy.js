const express = require('express');
const router = express.Router({ mergeParams: true });

const Campground = require('../models/campground');
const Review = require('../models/review');

const reviews = require('../controllers/reviews')

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');

const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');

router.post('/', isLoggedIn, isReviewAuthor, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReviews))

module.exports = router;