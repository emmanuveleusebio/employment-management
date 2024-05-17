let hom = document.getElementById("first-page");

function closeEdit() {
  let editing = document.querySelector(".edit-employee");
  editing.style.display = "none";
  hom.style.filter = "brightness(" + 1 + ")";
}

// ! read ----------------------------------------------------------------------------------------------

function showData(data, current) {
  var temp = "";

  var count = (current - 1) * 5;

  data.forEach((emp) => {
    count++;
    temp += ` 
   
           <tr>
           <td><span>${count}</span></td>
                     <td><span ><img id="showImage" src="http://localhost:5001/img/public/${emp._id}.jpg" alt="" height="30px" width="30px" ><p>${emp.salutation} ${emp.firstName}${emp.lastName} </p></span></td>
                      <td><span>${emp.email}</span></td>
                     <td><span>${emp.phone}</span></td>
                      <td><span>${emp.gender}</span></td>
                      <td><span>${emp.dob}</span></td>
                      <td><span>${emp.country}</span></td>
                      <td><div class="dropdown">
                        <button class="btn btn-light droup-btn" type="button" data-bs-toggle="dropdown" >
                          <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu rounded-4 droup-option">
                          <li><a class="dropdown-item" href="/api/user/${emp._id}/view?id=${emp._id}"><i class="fa-solid fa-eye"></i> View details</a></li>
                          <li onclick="editPage('${emp._id}')"><a class="dropdown-item" href=""><i class="fa-solid fa-pen" ></i> Edit</a></li>
                          <li onclick="deletePage('${emp._id}')"><a class="delete dropdown-item" href="#"  data_id =><i class="fa-solid fa-trash"></i> Delete</a></li>
                         
                        </ul>
                      </div></td>
                    </tr>`;

    let tBody = document.getElementById("empTbody");
  });

  let tBody = document.getElementById("empTbody");
  tBody.innerHTML = temp;
}

// ! add employeee-----------------------------------------------------------------------------------
function showAddPage() {
  let hom = document.getElementById("first-page");
  var details = document.getElementById("details");
  details.style.display = "block";
  hom.style.filter = "brightness(" + 0.3 + ")";
}

function closeAddPage() {
  let hom = document.getElementById("first-page");
  var details = document.getElementById("details");
  details.style.display = "none";
  hom.style.filter = "brightness(" + 1 + ")";
}

var addMember = document.getElementById("addMember");
addMember.addEventListener("click", async function (e) {
  e.preventDefault();

  var salutation = document.getElementById("salutation");
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var dob = document.getElementById("dob").value;
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var state = document.getElementById("state");
  var country = document.getElementById("country");
  var qualifications = document.getElementById("qualifications");
  var password = document.getElementById("password");
  var pin = document.getElementById("pin");

  var gender = document.querySelector('input[name="gender"]:checked');

  var username = String(firstName.value) + " " + String(lastName.value);

  //* form validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  var errorMsg = document.getElementsByClassName("errorMsg");
  if (salutation.value === "") {
    errorMsg[0].style.display = "block";
  } else {
    errorMsg[0].style.display = "none";
  }

  if (firstName.value === "") {
    errorMsg[1].style.display = "block";
  } else {
    errorMsg[1].style.display = "none";
  }

  if (lastName.value === "") {
    errorMsg[2].style.display = "block";
  } else {
    errorMsg[2].style.display = "none";
  }

  if (email.value === "") {
    errorMsg[3].style.display = "block";
  } else {
    errorMsg[3].style.display = "none";
  }

  if (phone.value.length === 10) {
    errorMsg[4].style.display = "none";
  } else {
    errorMsg[4].style.display = "block";
  }

  if (dob === "") {
    errorMsg[5].style.display = "block";
  } else {
    errorMsg[5].style.display = "none";
  }

  if (qualifications.value === "") {
    errorMsg[6].style.display = "block";
  } else {
    errorMsg[6].style.display = "none";
  }

  if (address.value === "") {
    errorMsg[8].style.display = "block";
  } else {
    errorMsg[8].style.display = "none";
  }

  if (country.value === "") {
    errorMsg[9].style.display = "block";
  } else {
    errorMsg[9].style.display = "none";
  }

  if (state.value === "") {
    errorMsg[10].style.display = "block";
  } else {
    errorMsg[10].style.display = "none";
  }

  if (city.value === "") {
    errorMsg[11].style.display = "block";
  } else {
    errorMsg[11].style.display = "none";
  }

  if (pin.value === "") {
    errorMsg[12].style.display = "block";
  } else {
    errorMsg[12].style.display = "none";
  }
  var checkMale = document.getElementById("check-male").checked;
  var checkFemale = document.getElementById("check-female").checked;
  var genderNull = document.querySelector(".genderNull");

  if (!checkMale && !checkFemale) {
    genderNull.style.display = "block";
  } else {
    genderNull.style.display = "none";
  }

  function validatePassword(password) {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const numbers = /[0-9]/;

    if (!specialChars.test(password) || !numbers.test(password)) {
      return false;
    }
    return true;
  }
  if (password.value == "") {
    errorMsg[7].innerText = "Enter password";
    errorMsg[7].style.display = "block";
  } else if (!validatePassword(password.value)) {
    errorMsg[7].innerText =
      "Password must include special character and number";
    errorMsg[7].style.display = "block";
    return;
  } else {
    errorMsg[7].style.display = "none";
  }

  //* form validation ends here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  var formatedDate = changeformat(dob);

  function changeformat(dob) {
    dateArr = dob.split("-");
    let date = dateArr[2];
    let month = dateArr[1];
    let year = dateArr[0];
    const showFormat = date + "-" + month + "-" + year;
    console.log("updated format is", showFormat);
    return showFormat;
  }

  var newUserDetails = {
    salutation: salutation.value,
    firstName: firstName.value,
    lastName: lastName.value,
    username: username,
    email: email.value,
    phone: phone.value,
    dob: formatedDate,
    address: address.value,
    city: city.value,
    state: state.value,
    country: country.value,
    gender: gender.value,
    qualifications: qualifications.value,
    password: password.value,
  };

  console.log(newUserDetails);
  fetch("http://localhost:5001/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserDetails),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add member");
      } else {
        closeAddPage();
      }
      return response.json();
    })
    .then((data) => {
      const uploadImage = document.getElementById("uploadx");
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);

      fetch(`http://localhost:5001/api/user/${data._id}/avatar`, {
        method: "POST",
        body: formData,
      }).then((res) => {});
    })

    .then(() => {
        Swal.fire({
            icon: "success",
            title: "Employee Added Successfully!",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            location.reload();
        });
    })

    .catch((error) => {
      console.error("Error:", error);
    });
});

function addImageCall() {
  var preview = document.getElementById("imagePreview");
  preview.src = URL.createObjectURL(event.target.files[0]);
}

// ! edit page $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
function editPage(id, event) {
  event = event || window.event;
  if (event) {
    event.preventDefault();
  }

  let hom = document.getElementById("first-page");
  let editing = document.querySelector(".edit-employee");
  editing.style.display = "block";
  hom.style.filter = "brightness(" + 0.3 + ")";
  console.log("this is the id", id);

  let editId = id;

  fetch(`http://localhost:5001/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })

    .then((data) => {
      console.log("this is the data", data);
      console.log("Retriefed data: ", data.password);
      document.getElementById("edit-salutation").value = data.users.salutation;
      document.getElementById("editfirstName").value = data.users.firstName;
      document.getElementById("editlastName").value = data.users.lastName;
      document.getElementById("editemail").value = data.users.email;
      document.getElementById("edit-phone").value = data.users.phone;
      document.getElementById("edit-dob").value = formatDate(data.users.dob);
      document.getElementById("editqualifications").value =
        data.users.qualifications;
      document.getElementById("editaddress").value = data.users.address;
      document.getElementById("edit-country").value = data.users.country;
      document.getElementById("edit-state").value = data.users.state;
      document.getElementById("editcity").value = data.users.city;
      const checkMale = document.getElementById("edit-male");
      const checkFemale = document.getElementById("edit-female");
      console.log(data.lastName);
      gender = data.users.gender;
      if (gender === "Male") {
        checkMale.checked = true;
      } else if (gender === "Female") {
        checkFemale.checked = true;
      }

      function formatDate(date) {
        const parts = date.split("-");

        if (parts.length === 3) {
          const day = parseInt(parts[0]);
          const month = parseInt(parts[1]);
          const year = parseInt(parts[2]);

          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            const date = new Date(year, month - 1, day);

            if (!isNaN(date)) {
              const formattedDate = `${date.getFullYear()}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`;
              return formattedDate;
            }
          }
        }
        return "Invalid Date";
      }

      const imagePreview = document.getElementById("edit-imagePreview");
      imagePreview.src = `http://localhost:5001/img/public/${id}.jpg`;

      let saveEdits = document.getElementById("addEdits");
      saveEdits.addEventListener("click", async () => {
        var salutation = document.getElementById("edit-salutation");
        var firstName = document.getElementById("editfirstName");
        var lastName = document.getElementById("editlastName");
        var email = document.getElementById("editemail");
        var phone = document.getElementById("edit-phone");
        var dob = document.getElementById("edit-dob").value;
        var address = document.getElementById("editaddress");
        var city = document.getElementById("editcity");
        var state = document.getElementById("edit-state");
        var country = document.getElementById("edit-country");
        var qualifications = document.getElementById("editqualifications");
        var password = document.getElementById("editpassword");

        var gender = document.querySelector(
          'input[name="editedGender"]:checked'
        );

        var username = firstName.value + " " + lastName.value;

        console.log("aaaaaaa", address.value);
        const errorMsge = document.getElementsByClassName("editErrorMessage");

        const validateInput = (input, serial, msg) => {
          if (input.value === "") {
            errorMsge[serial].innerHTML = msg;
          } else {
            errorMsge[serial].innerHTML = "";
          }
          if (input === phone) {
            const mobileNumberValue = input.value.trim();
            if (mobileNumberValue.length == "") {
              errorMsge[serial].innerHTML = "mobile No. cannot be blank";
            } else if (mobileNumberValue.length !== 10) {
              errorMsge[serial].innerHTML = "Mobile number must be 10 digits";
            } else {
              errorMsge[serial].innerHTML = "";
            }
          }
        };
        validateInput(salutation, 0, "Select Salutation");
        validateInput(firstName, 1, "Enter first name");
        validateInput(lastName, 2, "Enter last name");
        validateInput(email, 3, "Enter Email");
        validateInput(phone, 4, "Enter mobile Number");
        validateInput(qualifications, 6, "Enter Qualification");
        validateInput(address, 7, "Enter Address");
        validateInput(country, 8, "Select country");
        validateInput(state, 9, "Select State");
        validateInput(city, 10, "Enter City");

        salutation.addEventListener("input", () => removeValidationError(0));
        firstName.addEventListener("input", () => removeValidationError(1));
        lastName.addEventListener("input", () => removeValidationError(2));
        email.addEventListener("input", () => removeValidationError(3));
        phone.addEventListener("input", () => removeValidationError(4));
        qualifications.addEventListener("input", () =>
          removeValidationError(6)
        );
        address.addEventListener("input", () => removeValidationError(7));
        country.addEventListener("input", () => removeValidationError(8));
        state.addEventListener("input", () => removeValidationError(9));
        city.addEventListener("input", () => removeValidationError(10));

        const removeValidationError = (serial) => {
          errorMsge[serial].innerHTML = "";
        };
        var editedDob = changeformat(dob);
        function changeformat(dob) {
          console.log(dob, "dddddddd");
          dateArr = dob.split("-");
          let date = dateArr[2];
          let mont = dateArr[1];
          let year = dateArr[0];
          const showFormat = date + "-" + mont + "-" + year;
          console.log("updated format is", showFormat);
          return showFormat;
        }
        var editedDetails = {
          salutation: salutation.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
          dob: editedDob,
          address: address.value,
          city: city.value,
          state: state.value,
          country: country.value,
          gender: gender.value,
          qualifications: qualifications.value,
          password: "password",
        };

        fetch(`http://localhost:5001/api/user/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDetails),
        }).then((result) => {
          const uploadImage = document.getElementById("edit-uploadx");
          const formData = new FormData();
          formData.append("avatar", uploadImage.files[0]);
          fetch(`http://localhost:5001/api/user/${editId}/avatar`, {
            method: "POST",
            body: formData,
          });
          if (result.ok) {
            location.href = "/";
          }
        });
      });
    });
}

document
  .getElementById("edit-uploadx")
  .addEventListener("change", function (event) {
    const input = event.target;
    const preview = document.getElementById("edit-imagePreview");
    const container = document.getElementById("edit-imageContainer");

    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      container.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  });

// ! delete page   &&&&&&&&&&&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&&&&&&
function delPage() {
  var deletePage = document.getElementById("delete-page");
  deletePage.style.display = "flex";
  hom.style.filter = "brightness(" + 0.3 + ")";
}

function closeDelPage() {
  var deletePage = document.getElementById("delete-page");
  deletePage.style.display = "none";
  hom.style.filter = "brightness(" + 1 + ")";
}

async function deletePage(id) {
  console.log(id, "this si thei");
  delPage();

  var con = document.getElementById("delete-conformation");
  con.addEventListener("click", function conformDelete() {
    closeDelPage();
    fetch(`http://localhost:5001/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("somthing wrong");

        location.reload();
      }
    });
  });
}

let searchQuery = document.getElementById("searchBar").value;
fetchSearchResults(searchQuery, 1);
function fetchSearchResults(searchQuery, page) {
  const pageSize = 5;
  const url = `http://localhost:5001/api/user/searchAndPaginate?search=${searchQuery}&page=${page}&pageSize=${pageSize}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let totalPage = data.pagination.totalPage;
      let currentPage = data.pagination.currentPage;

      showData(data.users, currentPage);
      renderPaginationButtons(totalPage, currentPage);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", async () => {
  console.log("its working");
  let searchQuery = document.getElementById("searchBar").value;
  fetchSearchResults(searchQuery, 1);
});

function renderPaginationButtons(totalPage, currentPage) {
  const paginationContainer = document.getElementById("pagination-numbers");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPage; i++) {
    const pageLi = document.createElement("li");
    pageLi.textContent = i;

    pageLi.addEventListener("click", () => {
      let searchQuery = document.getElementById("searchBar").value;
      let page = parseInt(i);
      fetchSearchResults(searchQuery, page);
    });
    paginationContainer.appendChild(pageLi);
  }
}

// !logout------------------------------------------------------------------------------------
var logout = document.getElementById("Logout");
logout.addEventListener("click", () => {
  fetch("http://localhost:5001/api/log/logout", {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      window.location.href = res.url;
    }
  });
});
