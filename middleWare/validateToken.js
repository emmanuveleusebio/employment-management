// const asyncHandler = require('express-async-handler');
// const jwt = require('jsonwebtoken');

// const validateToken = asyncHandler(async(req, res, next) => {
//     let token;
//      token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if(authHeader && authHeader.startsWith("bearer"))
//     token = authHeader.split(' ')[1]
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
//         if(err){
//             res.status(401);
//             throw new Error("user is not authorized");
//         }
//         req.user = decoded.user;
//         next();
//         console.log("decoded");
//     })


// });


// module.exports = validateToken;




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
