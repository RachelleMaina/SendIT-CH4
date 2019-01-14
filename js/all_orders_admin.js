window.onload = function() {

    if (window.localStorage.getItem("username") == null) {
        document.getElementById("signin").innerHTML = "Login";
        document.getElementById("signin").setAttribute("href", "./signin.html");


    } else {
        document.getElementById("signin").innerHTML = "Logout";
        document.getElementById("signin").setAttribute("href", "./index.html");


        fetch("http://rachel-sendit-api.herokuapp.com/api/v2/parcels", {
                mode: "cors",
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                }

            })

            .then(res => res.json())
            .then(data => {

                if (data["Order"]) {

                    let table_pending = `
            <table>
      <tr><th>Parcel ID</th>
        <th>Pickup Location</th>
        <th>Destination</th>
        <th>Weight(Kg)</th>
        <th>Quotation (Ksh)</th>
        <th>Current Location</th>
        <th>Status</th>
        <th>Edit Order</th>
              </tr>`;


                    let table_delivered = `
           <table>
      <tr><th>Parcel ID</th>
        <th>Pickup Location</th>
        <th>Destination</th>
        <th>Weight(Kg)</th>
        <th>Quotation (Ksh)</th>
        <th>Current Location</th>
        <th>Status</th>
        <th>Edit Order</th>
              </tr>`;
                    let table_transit = table_delivered;


                    data["Order"].forEach(res => {
                        if (`${res["status"]}` === "Pending Delivery") {

                            table_pending += `

<tr><td>${res["order_id"]}</td>
      <td>${res["pickup_location"]}</td>
      <td>${res["destination"]}</td>
      <td>${res["weight"]}</td>
      <td>${res["price"]}</td>
      <td>${res["current_location"]}</td>
      <td>${res["status"]}</td>
      <td><a href="edit_admin.html?parcelId=${res["order_id"]}"><i class="fa fa-pencil"></i></a></td>
      <td><i class="fa fa-trash"></i></td>
  </tr>
`;
                        }


                    })
                    table_pending +=

                        `</table>`

                    document.getElementById("All").innerHTML = table_pending;


                    data["Order"].forEach(res => {
                        if (`${res["status"]}` === "Delivered") {

                            table_delivered += `

<tr><td>${res["order_id"]}</td>
      <td>${res["pickup_location"]}</td>
      <td>${res["destination"]}</td>
      <td>${res["weight"]}</td>
      <td>${res["price"]}</td>
      <td>${res["current_location"]}</td>
      <td>${res["status"]}</td>
      <td><a href="edit_admin.html?parcelId=${res["order_id"]}"><i class="fa fa-pencil"></i></a></td>
      <td><i class="fa fa-trash"></i></td>
  </tr>
`;
                        }


                    })
                    table_delivered +=

                        `</table>`
                    document.getElementById("Delivered").innerHTML = table_delivered;

                    data["Order"].forEach(res => {
                        if (`${res["status"]}` === "In Transit") {

                            table_transit += `

<tr><td>${res["order_id"]}</td>
      <td>${res["pickup_location"]}</td>
      <td>${res["destination"]}</td>
      <td>${res["weight"]}</td>
      <td>${res["price"]}</td>
      <td>${res["current_location"]}</td>
      <td>${res["status"]}</td>
      <td><a href="edit_admin.html?parcelId=${res["order_id"]}"><i class="fa fa-pencil"></i></a></td>
      <td><i class="fa fa-trash"></i></td>
  </tr>
`;
                        }


                    })
                    table_transit +=

                        `</table>`
                    document.getElementById("Transit").innerHTML = table_transit;
                } else {

                    document.getElementById("Transit").innerHTML = "No orders found";
                    document.getElementById("Delivered").innerHTML = "No orders found";
                    document.getElementById("All").innerHTML = "No orders found";

                    console.log(data);
                }


            })
            .catch(error => console.error(error))

    }
}