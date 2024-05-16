const asyncHandler = require('express-async-handler');
const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const { isAuth } = require('../middleWare/validateToken');

const generateOTP = () =>{
    return Math.floor(100000 + Math.random() * 900000);
        
}

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user: 'letmefineshmyfood@gmail.com', 
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const otpCache = {};

const registerUser = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("enter values")
    }
    // const userAvailable = await users.findOne({email})
    // if(userAvailable){
    //     res.status(400);
    //     throw new Error("user already exist in this email");
    // }

    const otp = generateOTP();
    otpCache[email] = otp;
    setTimeout(() => {
        delete otpCache[email];
    }, 2 * 60 * 1000); 

    const mailOption = {
        from:'letmefineshmyfood@gmail.com',
        to:email,
        subject:'One-Time Password (OTP) for Login',
        text: `Your OTP for login is: ${otp}`

    }
    await transporter.sendMail(mailOption);
    
    res.status(200).json({ message: "OTP sent successfully." });
});

const createUser = asyncHandler(async (req, res) => {
   
    const {userName, email, password, otp} = req.body;
    const savedOTP = otpCache[email];
    // console.log(otp,"jhdfkdkhf")
    //     console.log(savedOTP,"fhghvh")
    if(otp == savedOTP){
        const hashedPassword = await bcrypt.hash(password, 10);
   
        const user = await users.create({   
            userName,
            email,
            password:hashedPassword
            
        });
        console.log(`new user created${user}`)
    
        if(user){
            req.session.isAuth = true;
            
            res.status(200).redirect('/api/user/home'); 
    
        } else {
            res.status(400)
            throw new Error("user data is not valid")
            delete otpCache[email];
        }
       
    } else {
        console.log("this otp is not matching",savedOTP,otp)
        delete otpCache[email];
    }
    

   
 })





const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
       

        
        req.session.isAuth = true;
        
             res.status(200).redirect('/api/user/home')
        } else {
            res.status(401).json({ message: 'Invalid details' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// const logout = asyncHandler(async (req, res) => {
//    isAuth.logout
// });


const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

module.exports = {registerUser, loginUser, currentUser, createUser}