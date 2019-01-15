window.onload = function() {
	window.localStorage.clear();

    if (window.localStorage.getItem("username") == null) {
        document.getElementById("signin").innerHTML = "Login";
        document.getElementById("signin").setAttribute("href", "./signin.html");


    } else {
        document.getElementById("signin").innerHTML = "Logout";
        document.getElementById("signin").setAttribute("href", "./index.html");
    }
}