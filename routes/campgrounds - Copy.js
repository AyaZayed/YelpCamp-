const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review');
const user = require('../models/user');
const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage });
const { isLoggedIn, validateCampground, isAuthorized } = require('../middleware');

router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthorized, upload.array('image'), validateCampground, wrapAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthorized, wrapAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthorized, wrapAsync(campgrounds.renderEditForm))

module.exports = router;