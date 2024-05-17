var viewPage = new URLSearchParams(document.location.search);
var id =  viewPage.get("id");
// const myFunction = require('./script.js');

console.log('rhtis fisf thie fouscjkking id', id)

showDetails(id)
function showDetails(id) {
   
    
    var showDetails = id;

   
   

    fetch(`http://localhost:5001/api/user/${showDetails}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(result => result.json())

        .then(data => {
            console.log(data,"this is what we looking for")

            const profileName = data.users.salutation + " " + data.users.firstName + " " + data.users.lastName;
            const userName = data.users.firstName + " " + data.users.lastName;
            function calculateAge(dob) {
                console.log(dob)
                const today = new Date();
                const birthDate = new Date(formatDat(dob));

                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (birthDate.getFullYear() === today.getFullYear()) {

                    age = 0;

                }

               
                return age;
            }



            function formatDat(inputDate) {

                const parts = inputDate.split('-');


                if (parts.length === 3) {
                    const day = parseInt(parts[0]);
                    const month = parseInt(parts[1]);  //converting day,month and year from string to integer
                    const year = parseInt(parts[2]);


                    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                        const date = new Date(year, month - 1, day);        //NaN aanaanu check chyth


                        if (!isNaN(date.getTime())) {
                            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                            console.log(formattedDate)

                            return formattedDate;

                        }
                    }
                }


            }


            document.getElementById("profileEmail").innerHTML = data.users.email;
            document.getElementById("profileGender").innerHTML = data.users.gender;
            document.getElementById("profileAge").innerHTML = calculateAge(data.users.dob);
            document.getElementById("profileDob").innerHTML = data.users.dob;
            document.getElementById("profilePhone").innerHTML = data.users.phone;
            document.getElementById("profileQualification").innerHTML = data.users.qualifications;
            document.getElementById("profileAddress").innerHTML = data.users.address;
            document.getElementById("profileUser").innerHTML = userName;
            document.getElementById("profileHolder").innerHTML = profileName;
            document.getElementById('profileCity').innerHTML = data.users.city;
            document.getElementById('profileCountry').innerHTML = data.users.country;
            document.getElementById('profileState').innerHTML = data.users.state;

            const viewImage = document.getElementById("view-img");
            viewImage.src = `http://localhost:5001/img/public/${id}.jpg`

        })
 

}



// ! edit proprties-----------------------------------------------------------------------------


var addEdits = document.getElementById("show-details-edit");
addEdits.addEventListener('click', function() {
    // console.log(id)
    editPage(id)
    closeOverlay()
   
})

var cancelChange = document.getElementById("no-add");
cancelChange.addEventListener('click', function() {
   
    closeEditPage()
})

var detailDel = document.getElementById("show-details-delet");
detailDel.addEventListener('click', function() {
   let lastPage = document.getElementById("last-page")
   lastPage.style.filter = 'brightness(' + 0.3 + ')';
    deletePage(id)
    closeOverlay()
   
})
var cancelDelete = document.getElementById("no-del");
cancelDelete.addEventListener('click', function() {
    let lastPage = document.getElementById("last-page")
    lastPage.style.filter = 'brightness(' + 1 + ')';
    
}) 
var cancelDelete = document.getElementById("del-close");
cancelDelete.addEventListener('click', function() {
    let lastPage = document.getElementById("last-page")
    lastPage.style.filter = 'brightness(' + 1 + ')';
    
})





function closeEditPage() {
    let editing = document.getElementById("edit-employee");
    editing.style.display = "none";
}


let = viewEditButton = document.getElementById("show-details-edit")
viewEditButton.addEventListener("click", ()=> {
    editPage(id)
})

function editPage(id) {
    console.log("this is working then what", id)
    let editing = document.getElementById("edit-employee");
    editing.style.display = "block";


    let editId = id;
    


    fetch(`http://localhost:5001/api/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json();
        })

       
        .then(data => {
            console.log('Retriefed data: ', data.users.password)           
            document.getElementById("edit-salutation").value = data.users.salutation;
            document.getElementById("editfirstName").value = data.users.firstName;
            document.getElementById("editlastName").value = data.users.lastName;
            document.getElementById("editemail").value = data.users.email;
            document.getElementById("edit-phone").value = data.users.phone;
            document.getElementById("edit-dob").value = formatDate(data.users.dob);
            document.getElementById("editqualifications").value = data.users.qualifications;
            // document.getElementById("editpassword").value = data.password;
            document.getElementById("editaddress").value = data.users.address;
            document.getElementById("edit-country").value = data.users.country;
            document.getElementById("edit-state").value = data.users.state;
            document.getElementById("editcity").value = data.users.city;
            const checkMale = document.getElementById("edit-male");
            const checkFemale = document.getElementById("edit-female");
           console.log(data.lastName)
            gender = data.users.gender;
            if (gender === "Male") {
                checkMale.checked = true;
            } else if (gender === "Female") {
                checkFemale.checked = true;
            }

            function formatDate(date) {
                const parts = date.split('-');

                if (parts.length === 3) {
                    const day = parseInt(parts[0]);
                    const month = parseInt(parts[1]);
                    const year = parseInt(parts[2]);

                    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                        const date = new Date(year, month - 1, day);

                        if (!isNaN(date)) {
                            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                            return formattedDate;
                        }
                    }
                }
                return 'Invalid Date';
            }

            const imagePreview = document.getElementById('edit-imagePreview');
            imagePreview.src = `http://localhost:5001/img/public/${id}.jpg`;




            let saveEdits = document.getElementById("addEdits");
            saveEdits.addEventListener("click", async () => {

// let id = (id) => document.getElementById("id")
// let salutationField = id("edit-salutation")
// firstNameField = id("editfirstName")
// lastNameField = id("editlastName")
// emailField = id("editemail")
// telephoneField = id("edit-phone")
// dobField = id("edit-dob")
// qualiField = id("editqualifications")
// addrField = id("editaddress")
// countryField = id("edit-country")
// stateField = id("edit-state")
// cityField = id("editcity")
//      // salutationField = id("edit-salutation")




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

                var gender = document.querySelector('input[name="editedGender"]:checked');

                var username = firstName.value + " " + lastName.value;
                password = data.password;
                var editedDob = changeformat(dob);
                function changeformat(dob) {
                    dateArr = dob.split("-");
                    let date = dateArr[2];
                    let mont = dateArr[1];
                    let year = dateArr[0];
                    const showFormat = date + "-" + mont + "-" + year;
                    console.log("updated format is", showFormat)
                    return showFormat;

                }


               
                const errorMsge = document.getElementsByClassName("editErrorMessage");
// const submitButton = document.getElementById("addEdits");
// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();


const validateInput = (input, serial, msg) => {
    if(input.value === ""){
      errorMsge[serial].innerHTML = msg;
    } else {
      errorMsge[serial].innerHTML = "";
    }
    if (input === phone) {
      const mobileNumberValue = input.value.trim();
      if (mobileNumberValue.length == "") {
          errorMsge[serial].innerHTML = "mobile No. cannot be blank";
      } else if (mobileNumberValue.length !== 10){
        errorMsge[serial].innerHTML = "Mobile number must be 10 digits";
      }
      else {
          errorMsge[serial].innerHTML = "";
      }
   }
    
  }


  validateInput(salutation, 0, "Select Salutation");
  validateInput(firstName, 1, "Enter first name");
  validateInput(lastName, 2, "Enter last name");
  validateInput(email, 3, "Enter Email");
  validateInput(phone, 4, "Enter mobile Number");
//   validateInput(dob, 5, "Enter Date of Birth");
   
  validateInput(qualifications, 6, "Enter Qualification");
  validateInput(address, 7, "Enter Address");
  validateInput(country, 8, "Select country");
  validateInput(state, 9, "Select State");
  validateInput(city, 10, "Enter City");
 
// })







salutation.addEventListener("input", () => removeValidationError(0));
firstName.addEventListener("input", () => removeValidationError(1));
lastName.addEventListener("input", () => removeValidationError(2));
email.addEventListener("input", () => removeValidationError(3));
phone.addEventListener("input", () => removeValidationError(4));
// dob.addEventListener("input", () => removeValidationError(5));
qualifications.addEventListener("input", () => removeValidationError(6));
address.addEventListener("input", () => removeValidationError(7));
country.addEventListener("input", () => removeValidationError(8));
state.addEventListener("input", () => removeValidationError(9));
city.addEventListener("input", () => removeValidationError(10));

const removeValidationError = (serial) => {
   errorMsge[serial].innerHTML = ""; 
};

               

               
                var editedDetails = {
                    salutation: salutation.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    username: username,
                    email: email.value,
                    phone: phone.value,
                    dob: editedDob,
                    address: address.value,
                    city: city.value,
                    state: state.value,
                    country: country.value,
                    gender: gender.value,
                    qualifications: qualifications.value,
                     password: password

                };
                





               await fetch(`http://localhost:5001/api/user/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedDetails)

                })
                .then((result) => {

              

                

                    const uploadImage = document.getElementById("edit-uploadx");
                    const formData = new FormData();
                    formData.append("avatar", uploadImage.files[0]);
                    fetch(`http://localhost:5001/api/user/${editId}/avatar`, {
                       method: 'POST',
                       body: formData
                    })
                 
                   
                
               if(result.ok){
                location.reload();
               }
                
                })

            })




        })



}

document.getElementById('edit-uploadx').addEventListener('change', function(event) {
    const input = event.target;
    const preview = document.getElementById('edit-imagePreview');
    const container = document.getElementById('edit-imageContainer');
   
        const reader = new FileReader();
        reader.onload = function(e)  {
            preview.src = e.target.result;
            container.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
   
});  




// ! delete page   &&&&&&&&&&&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&&&&&&


function delPage() {

    var deletePage = document.getElementById("delete-page");
    deletePage.style.display = "flex";
    // hom.style.filter = 'brightness(' + 0.3 + ')';
    let lastPage = document.getElementById("last-page")
        lastPage.style.filter = 'brightness(' + 0.3 + ')';
}

function closeDelPage() {

    var deletePage = document.getElementById("delete-page");
    deletePage.style.display = "none";
    let lastPage = document.getElementById("last-page")
    lastPage.style.filter = 'brightness(' + 1 + ')';
}
// ? display IOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOIOI

   
    const personalId = id;
    var con = document.getElementById('delete-conformation')
    con.addEventListener('click', function conformDelete() {
        closeDelPage()
        fetch(`http://localhost:5001/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res =>{
            if(res.ok){
                console.log('deleted user')
                
                window.location.href ='/';
                
            }
        })
      
       
        
    })
    



