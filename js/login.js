//document.getElementById("signup").addEventListener("submit", signup);
document.getElementById("signin").addEventListener("submit", signin);



function signin(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;


    fetch("http://rachel-sendit-api.herokuapp.com/api/v2/auth/login", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })

        })

        .then(res => res.json())
        .then(data => {
            let message =  data["Message"];
            if (message == "Invalid Password or username") {
                document.getElementById("message").innerHTML = message;
                console.log(message);
                
            }
            else { 
                if (message == "Signed in as Admin"){
                 window.localStorage.setItem('token', data["access_token"])
                redirect: window.location.replace("./all_orders_admin.html")
                console.log(message);   
                }
                else{
                window.localStorage.setItem('token', data["access_token"])
                redirect: window.location.replace("./index.html")
                console.log(message);

                }
            }

        })
        .catch(error => console.error(error))

}

