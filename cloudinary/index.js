const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({ //ASSOCIATING OUR ACCOUNT WITH THIS CLOUDINARY INSTANCE
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//setting up an instance of clodinary storage in this file
const storage = new CloudinaryStorage({
    cloudinary, //cloudinary object that we configured above
    params: {
        folder: "UtopiaCamps", //we specify a folder in cloudinary that we store things in
        allowedFormats: ["jpeg", "png", "jpg"]
    }
});

module.exports = { cloudinary, storage }