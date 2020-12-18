const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

//we can add virtual property to a schema,but we want to have this property on each image
//so we create image schema for this reason and nest it inside of CampgroundSchema
//every time we call thumbnail it is gonna do this calculation:this.url.replace("/upload", "/upload/w_200");
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

//By default, Mongoose does not include virtuals when you convert a document to JSON
//you need to set the toJSON schema option to { virtuals: true } and include it to schema
//we converted campground to JSON.stringif(campgrounds) in index.js to use it in clusterMap.js
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

//In Mongoose, a virtual is a property that is not stored in MongoDB
CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>` //this refers to the particular instance of campgrounds
}); //.substring() -shows the number of characters that we want

//CAMPGROUND DELETE MIDDLEWARE
//WE NEED THIS MIDDLEWARE TO DELETE NOT ONLY A CAMPGROUND BUT ALSO ITS REVIEWS

CampgroundSchema.post("findOneAndDelete", async (doc) => {
    if (doc) { //if we have something that we deleted
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Campground", CampgroundSchema);