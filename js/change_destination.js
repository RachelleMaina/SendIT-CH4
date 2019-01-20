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
        document.getElementById("changeDestination").addEventListener("submit", changeDestination);

    }

    function changeDestination(event) {
        event.preventDefault();


        let strParcelId = location.search.split('parcelId=')[1];
        let parcelId = Number(strParcelId);
        let destination = document.getElementById("destination").value;

        fetch("https://rachel-sendit-api.herokuapp.com/api/v2/parcels/" + parcelId + "/destination", {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },

                body: JSON.stringify({
                    "destination": destination
                })

            })

            .then(res => res.json())
            .then(data => {

                redirect: window.location.replace("./profile.html")
                document.getElementById("message").innerHTML = message;
                console.log(data);
            })
            .catch(error => console.error(error))

    }
}