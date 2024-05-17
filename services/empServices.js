const user = require("../model/empModel");

async function getAllEmployees() {
  const users = await user.find().sort({ createdAt: 1 });
  return users;
}

async function postUser(req, res) {
  console.log("Received body:", req.body);
  const {
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
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !salutation ||
    !address ||
    !city ||
    !state ||
    !country ||
    !gender ||
    !qualifications ||
    !password
  ) {
    res.status(400);
    throw new Error("all feilds are mandatory");
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
  });

  res.status(200).json(emp);
}

async function putUser(employeeId, updatedData) {
  try {
    const updateEmployee = await user.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );
    if (!updateEmployee) {
      throw new Error("Employee Not Found");
    }

    return updateEmployee;
  } catch (error) {
    throw new Error("Error updating employee");
  }
}

async function deleteUser(id) {
  // const emp = await user.findByIdAndDelete(id)
  try {
    const deleteEmployee = await user.findByIdAndDelete(id);

    if (!deleteEmployee) {
      throw new Error("Employee Not found");
    }
    return deleteEmployee;
  } catch {
    throw new Error("Error in deleting Employee");
  }
}

async function postAvatar(id, file) {
  const filePath = `assets/img/public/${file.filename}`;
  // console.log(filePath,"this is the file path")

  const emp = await user.findByIdAndUpdate(
    id,
    { avatar: filePath }, // Set the path of the uploaded file as the avatar field in the user document
    { new: true } // This option returns the updated document
  );

  if (!emp) {
    res.status(404);
    throw new Error("User not found");
  }
}

module.exports = {
  getAllEmployees,
  postUser,
  putUser,
  deleteUser,
  postAvatar,
};
