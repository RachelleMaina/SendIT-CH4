document.getElementById("signup").addEventListener("submit", signup);

function signup(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;

    if(password1!==password2){
        let message = "Password mismatch!";
        document.getElementById("message").innerHTML = message;
                console.log(message);

    }
    else {

    fetch("https://rachel-sendit-api.herokuapp.com/api/v2/auth/signup", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "username": name,
                "password": password1,
                "phone": phone,
                "email": email
            })

        })

        .then(res => res.json())
        .then(data => {
            let message = `${data.Message}`;
            if (message === "Signup successiful") {
                redirect: window.location.replace("./signin.html");

                console.log(message);
            }
            else {

                document.getElementById("message").innerHTML = message;
                console.log(message);
            }

        })
        .catch(error => console.error(error))


}

}

