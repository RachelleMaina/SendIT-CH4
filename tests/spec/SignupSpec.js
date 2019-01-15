describe("SignupSpec", function() {
     beforeEach(function() {



        });

const URL = fetch("http://rachel-sendit-api.herokuapp.com/api/v2/auth/signup", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                "username": "name",
                "password": "password1",
                "phone": "phone",
                "email": "email"
            })
})
function signup () {

   try {
    
     const resp =  URL
     console.log(resp)
     return resp
   } catch (err) {
   
        console.log(err)
     }
}
    

console.log(signup)
    

    describe("when user signs up", function(){
         
      
        it("should be able to signup", function() {

expect(signup).toBe("username, password or email  already exists");
        });
    });
 
       });



