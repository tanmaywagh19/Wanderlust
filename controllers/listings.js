const Listing = require('../models/listing.js')
const ExpressError = require('../utils/expressError.js')
const flash = require('connect-flash')

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({})
    res.render("index.ejs", { allListing })
}

module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs")
}

module.exports.createListing = async (req, res, next) => {

    //OR BEST WAY
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data")
    }
    let url = req.file.path;
    let filename = req.file.filename
    const location = req.body.listing.location;

    // Geocoding using Nominatim
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        {
            headers: {
                "User-Agent": "Wanderlust/1.0"
            }
        }
    );
    const data = await response.json();

    if (!data.length) {
        throw new ExpressError(400, "Location not found");
    }

    const latitude = parseFloat(data[0].lat);
    const longitude = parseFloat(data[0].lon);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename }
    
    // Save coordinates
    newListing.geometry = {
        type: "Point",
        coordinates: [longitude, latitude]
    };
    await newListing.save()
    req.flash('success', 'New listing created!')
    res.redirect("/listings")
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews', populate: {
                path: 'author',
            },
        })
        .populate('owner')
    if (!listing) {
        req.flash('error', 'Listing you requested for does not exist!')
        return res.redirect('/listings')
    }
    res.render("show.ejs", { listing })
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    if (!listing) {
        req.flash('error', 'Listing you requested for does not exists!')
        return res.redirect('/listings')
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250')
    res.render("edit.ejs", { id, listing, originalImageUrl })
}

module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data!")
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save();
    }
    req.flash('success', 'Listing updated!')
    await res.redirect(`/listings/${id}`)
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params
    let deletedListing = await Listing.findByIdAndDelete(id)
    req.flash('success', 'Listing deleted!')
    res.redirect("/listings")
}