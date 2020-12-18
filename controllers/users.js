const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password); //.register() HASHES THE PASSWORD AND STORES THE SALT VALUE AND HASHED PASSW TO THE DB;
        req.login(registeredUser, err => { //REQ.LOGIN() COMING FROM PASSPORT;//REQUIRES A CALLBACK WHICH REQUIRES ERROR PARAMETER;
            if (err) return next(err);
            req.flash("success", "Welcome to Utopia Camps");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logOut(); //req.logOut() coming from Passport;
    req.flash("success", "Good Bye!");
    res.redirect("/campgrounds");
}