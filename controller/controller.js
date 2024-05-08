const asyncHandler = require('express-async-handler');
const user = require('../model/empModel')




//@ description get all users
//@ route get/api/user
//@ access public

const getUsers = asyncHandler(async (req,res) => {
    const users = await user.find();
    res.status(200).json({ users });
}); 



const getSingelUsers = asyncHandler(async (req,res) => {
    const users = await user.findById(req.params.id);
    if(!users){
        res.status(404);
        throw new Error("employee not found");
    }
    res.status(200).json({ users });
}); 



//@ description post users
//@ route post/api/user
//@ access public
const postUsers = asyncHandler(async (req,res) => {
    console.log("Received body:", req.body);
    const {salutation, 
        firstName, 
        lastName, 
        email, 
        phone,
        dob, 
        address,
        city,
        state,
        country,
        gender,
        qualifications,
        password,
       
            } = req.body;

    if(!firstName || !lastName || !email || !phone || !dob || !salutation || !address || !city || !state || !country || !gender || !qualifications || !password){
        res.status(400)
        throw new Error("all feilds are mandatory")
    }
   const emp = await user.create({
    salutation, 
        firstName, 
        lastName, 
        email, 
        phone,
        dob, 
        address,
        city,
        state,
        country,
        gender,
        qualifications,
        password,
      
   })
  
    res.status(200).json(emp);
})

//@ description put user
//@ route get/api/user/id
//@ access public
const putUsers = asyncHandler(async (req,res) => {
    const emp = await user.findById(req.params.id)
    if(!emp){
        res.status(404)
        throw new error("emp not found")
    }
    const updatedEmp = await user.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
   
    res.status(200).json(updatedEmp);
})

//@ description delete user
//@ route get/api/user/id
//@ access public
const delUsers = asyncHandler(async (req,res) => {
    const emp = await user.findById(req.params.id)
    if(!emp){
        res.status(404)
        throw new error("emp not found")
    }
   await emp.deleteOne();
//    res.redirect('/api/user/home');
     res.status(200)
})


const postAvatar = asyncHandler(async (req, res) => {
  

    const filePath = `assets/img/public/${req.file.filename}`;
    // console.log(filePath,"this is the file path")
    
       const emp = await user.findByIdAndUpdate(
        req.params.id,
        { avatar:filePath }, // Set the path of the uploaded file as the avatar field in the user document
        { new: true } // This option returns the updated document
    );
   
    if (!emp) {
        res.status(404);
        throw new Error("User not found");
    }

})


const searchData = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        res.status(400).json({ error: 'Search query is missing' });
        return;
    }
    try {
        const users = await user.aggregate([
            {
                $match: {
                    firstName: { $regex: new RegExp(searchQuery, 'i') }
                }
            }
        ]);
        console.log(users,"this is the user of search")
        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching data:', error);
        res.status(500).json({ error: 'An error occurred while searching data' });
    }
});

const pagination = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 2;

    try {
        const totalUsersCount = await user.countDocuments();
        const totalPage = Math.ceil(totalUsersCount / pageSize);
        const skip = (page - 1) * pageSize;

        const users = await user.aggregate([
            { $skip: skip }, // Skip documents
            { $limit: pageSize } // Limit the number of documents
        ]);

        res.json({
            users: users,
            pagination: {
                totalPage: totalPage,
                currentPage: page
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

// const putAvatar =  asyncHandler(async (req, res) => {
  

//     const filePath = `assets/img/public/${req.file.filename}`;
//     console.log(filePath,"this is the file path")
    
//        const emp = await user.findByIdAndUpdate(
//         req.params.id,
//         { avatar:filePath }, // Set the path of the uploaded file as the avatar field in the user document
//         { new: true } // This option returns the updated document
//     );
   
//     if (!emp) {
//         res.status(404);
//         throw new Error("User not found");
//     }

// })

module.exports = 
    {
    getUsers,
    postUsers,
    putUsers,
     delUsers,
     getSingelUsers,
     postAvatar,
     searchData,
     pagination,
    //  putAvatar
    };

    