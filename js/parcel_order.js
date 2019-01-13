window.onload = function() {
    if (window.localStorage.getItem("username") == null) {
        document.getElementById("signin").innerHTML = "Login";
        document.getElementById("signin").setAttribute("href", "./signin.html");

    } else {
        document.getElementById("signin").innerHTML = "Logout";
        document.getElementById("signin").setAttribute("href", "./index.html");

    }
    document.getElementById("first_order").addEventListener("submit", createParcelOrder);
    document.getElementById("order_two").addEventListener("submit", createParcelOrder);
    document.getElementById("order_three").addEventListener("submit", createParcelOrder);

    document.getElementById("submit").disabled = true;

}


function getQuote(event) {
    let pickup_location = document.getElementById("pickup_location").value;
    let destination = document.getElementById("destination").value;
    let str_weight = document.getElementById("weight").value;
    let weight = Math.round(str_weight);
    let check_weight = /^\d*\.?\d+$/.test(weight);

    if (weight == 0 || weight === "" || check_weight === false) {
        document.getElementById("info").innerHTML = "Invalid weight";
    } else {
        document.getElementById("submit").disabled = true;
        document.getElementById("quotation_disabled").removeAttribute("class")
        let express = weight * 100;
        let priority = weight * 200;
        let value = weight * 100;
        document.getElementById("express").value = express;
        document.getElementById("priority").value = priority;
        document.getElementById("value").value = value;

        let quote = {
            "pickup_location": pickup_location,
            "destination": destination,
            "weight": weight
        };

        return quote

    }

}

function createParcelOrder(event) {
    event.preventDefault();
    let item = getQuote();
    let pickup_location = item["pickup_location"];
    let destination = item["destination"];
    let weight = item["weight"];

    fetch("http://rachel-sendit-api.herokuapp.com/api/v2/parcels", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            },
            body: JSON.stringify({
                "pickup_location": pickup_location,
                "destination": destination,
                "weight": weight
            })

        })

        .then(res => res.json())
        .then(data => {
            
            let message = `${data.Message}`;

            if (message === "Parcel Order Created") {
                document.getElementById("message").innerHTML = message;
                document.getElementById("quotation_disabled").setAttribute("class", "disabled")
                document.getElementById("weight").value = "";
                console.log(message);
            } else {
                document.getElementById("message").innerHTML = message;
                console.log(message);
            }
        })
        .catch(error => console.error(error))

}