

function login(){
    document.getElementById('otp').style.display = "block"
    document.getElementById('otpLabel').style.display = "block"
    document.getElementById('otpButton').style.display = "block"
    document.getElementById('submit').style.display = "none"
    
    let email = document.getElementById('email').value
    let userName = document.getElementById('userName').value
    let password = document.getElementById('password').value
    
    let loginDetails = {
        email,
        userName,
        password
    }
    console.log(loginDetails);

    fetch('http://localhost:5001/api/log/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
    })
}


function otpVerify(){
   let otp = document.getElementById('otp').value;
   let email = document.getElementById('email').value
   let userName = document.getElementById('userName').value
   let password = document.getElementById('password').value
   
   let loginDetails = {
       email,
       userName,
       password,
       otp
   }
console.log(loginDetails, "this is the login details")


   fetch('http://localhost:5001/api/log/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
    })
}