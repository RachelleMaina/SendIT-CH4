window.onload = function() {

    if (window.localStorage.getItem("username") == null) {
        document.getElementById("signin").innerHTML = "Login";
        document.getElementById("signin").setAttribute("href", "./signin.html");


    } else {
        document.getElementById("signin").innerHTML = "Logout";
        document.getElementById("signin").setAttribute("href", "./index.html");
        let strId = location.search.split('parcelId=')[1];
        let Id = Number(strId);
        document.getElementById("parcelId").value = Id;
        document.getElementById("changeLocation").addEventListener("submit", changeLocation);
        document.getElementById("changeStatus").addEventListener("submit", changeStatus);

    }
}

 function changeLocation(event) {
        event.preventDefault();


        let strOrderId = location.search.split('parcelId=')[1];
        let OrderId = Number(strOrderId);
        let current_location = document.getElementById("location").value;

        fetch("http://rachel-sendit-api.herokuapp.com/api/v2/parcels/" + parcelId + "/presentLocation", {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },

                body: JSON.stringify({
                    "location": current_location
                })

            })

            .then(res => res.json())
            .then(data => {

                redirect: window.location.replace("./all_orders_admin.html")
                document.getElementById("message").innerHTML = message;
                console.log(data);
            })
            .catch(error => console.error(error))

    }


 function changeStatus(event) {
        event.preventDefault();


        let strParcelId = location.search.split('parcelId=')[1];
        let parcelId = Number(strParcelId);
        let status = document.getElementById("status").value;

        fetch("http://rachel-sendit-api.herokuapp.com/api/v2/parcels/" + parcelId + "/status", {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },

                body: JSON.stringify({
                    "status": status
                })

            })

            .then(res => res.json())
            .then(data => {

                redirect: window.location.replace("./all_orders_admin.html")

                console.log(status);
            })
            .catch(error => console.error(error))

    }
