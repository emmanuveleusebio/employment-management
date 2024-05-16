const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser, createUser} = require('../controller/userController');
const validateToken = require("../middleWare/validateToken");
const {isAuth} = require("../middleWare/validateToken");
const { logout } = require('../middleWare/validateToken');



router.get("/register",async(req,res) => {
   
    res.render('register')
})

router.get("/login",async(req,res) => {
   
    res.render('login')
})
router.get('/logout', logout);

router.post('/login', loginUser)
router.post('/create', createUser)
router.post('/register', registerUser)
router.get('/current', currentUser)
router.get('/logout', logout)
module.exports = router;