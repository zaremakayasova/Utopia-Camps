# Utopia-Camps

Full-stack web application built with Node.js, Express.js, MongoDB, EJS, Bootstrap. 
A Node.js web application project from the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/course/the-web-developer-bootcamp/)

## Live Demo
The application is hosted on heroku and can be accessed at the below web address:
https://boiling-taiga-61964.herokuapp.com/

###### Home page

![Screenshot (1)](https://user-images.githubusercontent.com/71195337/102698542-18ea9680-420c-11eb-99ff-eeb43c66411b.png)

###### Campgrounds Index page

![Screenshot (2)](https://user-images.githubusercontent.com/71195337/102698840-61a34f00-420e-11eb-85d6-7aa1450ff3e7.png) 

###### Campgrounds Show page

![Screenshot (3)](https://user-images.githubusercontent.com/71195337/102698854-84356800-420e-11eb-9bf0-94b0ed9613b9.png) 

## Overview
- Utopia Camps is a web application where registered users can create new campgrounds, edit and delete their campgrounds, review and rate other users' campgrounds.
- In order to create, edit, delete or review a campground, user must be a registered user and be logged in.
- Users can only edit/delete campgrounds and comments that they have added and cannot edit or delete other users' reviews or campgrounds.
- Every user can view campgrounds and reviews without registering or logging in.
- Users are allowed to upload multiple photos related to their campgrounds.
- Users review or rate(star rating, 1-5 stars) directly on show page. 
- On every show page user can use a map showing the location of a particular campground.
- On index page users can view a clustered map with pinned locations of all campgrounds.

## Features 
- REST API(CRUD) for campgrounds, reviews, users.
- Authentication and authorization for Edit, Update and Delete routes.
- Register and Login.

## Technologies Used
 ## Front-End: 
 - HTML5
 - CSS3
 - Bootstrap 5
 - Javascript
 ## Back-End:
 - Node.js
 - Express.js
 - EJS
 - Ejs-mate
 - Method-override
 - Mapbox
 - Mapbox Geocoding SDK
 - Connect-flash
 - Connect-mongo
 - Dotenv
 - Express-session
 - Joi
 - Cloudinary
 - Multer
 - Multer-storage-cloudinary
 - Passport
 - Passport-local
 - Passport-local-mongoose
 - Helmet
 - Express-mongo-sanitize
 - Sanitize-html
 
 ## Database:
 - MongoDB
 - Mongoose
 ## Deployment:
 - Heroku
 - MongoDB Atlas
 - Git
 
 ## Running Application Locally:
 - to run this app, install it locally using npm.
 ```
 npm install
 npm start
 ```
 - create a cloudinary account to get an API key, cloud name and secret code.
 - create a mapbox account to get mapbox token.
 - create an .env file in the root directory and add API key, cloud name, secret code, mapbox token and db url.
 - run node app.js and mongod.
 
 
 
 
 








