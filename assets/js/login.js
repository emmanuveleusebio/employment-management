

function login(){
    let email = document.getElementById('email').value
    // let userName = document.getElementById('userName').value
    let password = document.getElementById('password').value
    
    let loginDetails = {
        email,
       
        password
    }
    console.log(loginDetails);

    fetch('http://localhost:5001/api/log/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
    })
    .then(res =>{
        if (res.ok){
            window.location.href = res.url;
        }
    })
}