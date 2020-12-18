const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
//there are multiple services in mapbox-sdk,but we need geocoding and thats why require it
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
//and this geocoder contains 2 methods we want forward and reverse geocode and we will use only forward geocode

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
}

module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1 //results limit
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    //maping over the array that s been added to req.files thanks to multer: upload.array("image")
    //we take all files req.files, map them into these objects { url: f.path, filename: f.filename }
    campground.author = req.user._id;//REQ.USER THANKS TO PASSPORT// CONNECTING CAMPGROUND WITH USER
    await campground.save();
    req.flash("success", "Successfully Made New Campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!campground) {
        req.flash("error", "Cannot Find That Campground");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Cannot Find That Campground");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground })
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    //req.files makes us an array and we dont wanna push array into an existing array,it s gonna be a problem, we wont pass mongoose validation
    //because it is an array of objects, not an array of arrays
    //thats why we spread imgs array; do not take the array, take data from that array and push
    //spreading the array we access the objects of these array, not array itself
    //we cant do campground.images = req.files.map(f => ({ url: f.path, filename: f.filename })) like in create campground,because it overwrites,dont push
    await campground.save();
    if (req.body.deleteImages) {
        // when we delete from mongo images still exist in cloudinary so we destroy them.
        //we loop over each images
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        //we delete images from mongo:
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    //The $pull operator removes from an existing array(req.body.deleteImages) all instances of a value or values that match a specified condition.
    req.flash("success", "Successfully Updated Campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted Campground");
    res.redirect("/campgrounds");
}