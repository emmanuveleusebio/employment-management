const asyncHandler = require("express-async-handler");
const user = require("../model/empModel");
const { isAuth } = require("../middleWare/validateToken");
const services = require("../services/empServices");

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await services.getAllEmployees();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

const getSingelUsers = asyncHandler(async (req, res) => {
  const users = await user.findById(req.params.id);
  if (!users) {
    res.status(404);
    throw new Error("employee not found");
  }
  res.status(200).json({ users });
});

// !add user---------------------------------------------------------------------------------------
const postUsers = asyncHandler(async (req, res) => {
  try {
    const users = await services.postUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

// !edit-------------------------------------------------------------------------------------------
const putUsers = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id;
    const existingEmployee = await user.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const updatedData = {
      ...req.body,
    };
    const updatedEmployee = await services.putUser(employeeId, updatedData);
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// !delete---------------------------------------------------------------------------------------------
const delUsers = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await services.deleteUser(id);

    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// !post Avatar-----------------------------------------------------------------------------------------
const postAvatar = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;
    await services.postAvatar(id, file);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

// !search-----------------------------------------------------------------------------------
// const searchData = asyncHandler(async (req, res) => {
//     const searchQuery = req.query.search;

//     if (!searchQuery) {
//         res.status(400).json({ error: 'Search query is missing' });
//         return;
//     }
//     try {
//         const users = await user.aggregate([
//             {
//                 $match: {
//                     firstName: { $regex: new RegExp(searchQuery, 'i') }
//                 }
//             }
//         ]);

//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error searching data:', error);
//         res.status(500).json({ error: 'An error occurred while searching data' });
//     }
// });

// //! pagination------------------------------------------------------------------------------------
// const pagination = asyncHandler(async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 5;
//     try {
//         const totalUsersCount = await user.countDocuments();
//         const totalPage = Math.ceil(totalUsersCount / pageSize);
//         const skip = (page - 1) * pageSize;

//         const users = await user.aggregate([
//             { $skip: skip }, // Skip documents
//             { $limit: pageSize } // Limit the number of documents
//         ]);

//         res.json({
//             users: users,
//             pagination: {
//                 totalPage: totalPage,
//                 currentPage: page
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// })

const searchDataAndPagination = asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const skip = (page - 1) * pageSize;
  const matchCondition = searchQuery
    ? { firstName: { $regex: new RegExp(searchQuery, "i") } }
    : {};
  try {
    const results = await user.aggregate([
      { $match: matchCondition },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);
    const totalUsersCount = results[0].metadata[0]
      ? results[0].metadata[0].total
      : 0;
    const totalPage = Math.ceil(totalUsersCount / pageSize);
    let users = results[0].data;
    res.status(200).json({
      users: users,
      pagination: {
        totalPage: totalPage,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Error searching and paginating data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching and paginating data" });
  }
});

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  delUsers,
  getSingelUsers,
  postAvatar,
  searchDataAndPagination,
};
