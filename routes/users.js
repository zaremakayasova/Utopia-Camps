const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login)

//passport.authenticate() AUTOMATICALLY COMPARES THE LOGIN PASSWORD WITH HASHED PASSWORD IN THE DB AND COMPARES LOGIN USERNAME WITH USERNAME FROM DB;


router.get("/logout", users.logout);

module.exports = router;