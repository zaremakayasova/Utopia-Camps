const mongoose = require('mongoose');
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");


mongoose.connect("mongodb://localhost:27017/utopia-camps", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <= 20; i++) {
        const random20 = Math.floor(Math.random() * 20);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "5fca5c6b96194701016aec6b",
            location: `${cities[random20].city}, ${cities[random20].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste provident impedit fugiat! Fugiat dolore exercitationem eius impedit debitis obcaecati, dignissimos sint, suscipit iste quasi doloremque.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random20].longitude,
                    cities[random20].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dtec7lvgy/image/upload/v1608305506/UtopiaCamps/hfcuvpqmjp5m7wsi6s4k.jpg",
                    filename: "UtopiaCamps/hfcuvpqmjp5m7wsi6s4k"

                },

                {
                    url: "https://res.cloudinary.com/dtec7lvgy/image/upload/v1608305523/UtopiaCamps/e8awmov5tlfmdilfn6bp.jpg",
                    filename: "UtopiaCamps/e8awmov5tlfmdilfn6bp"
                },
                {
                    url: "https://res.cloudinary.com/dtec7lvgy/image/upload/v1608305541/UtopiaCamps/itiqrot02xstqaqcnnfg.png",
                    filename: "UtopiaCamps/itiqrot02xstqaqcnnfg"
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

