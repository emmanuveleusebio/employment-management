const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser, createUser } = require('../controller/userController');
const validateToken = require("../middleWare/validateToken");
const {isAuth} = require("../middleWare/validateToken");


router.get("/register",async(req,res) => {
   
    res.render('register')
})

router.get("/login",async(req,res) => {
   
    res.render('login')
})


router.post('/create', createUser)
router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', currentUser)

module.exports = router;