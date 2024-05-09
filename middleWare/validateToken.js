




const session = require("express-session");
const sessionMid = session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 60 * 60 * 1000,
        // secure: true, // Ensures cookies are only sent over HTTPS
        httpOnly: true, // Prevents client-side access to cookies
        sameSite: 'strict' // Protects against CSRF attacks by only allowing cookies from the same origin
    },
});
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        return next();
    }else{
        return res.redirect("/login");
    }
};

module.exports = { isAuth, sessionMid};
