//Variable definitions
const myform = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const info = document.querySelector("#info");
let authEngine;

//Define a class AuthHandler that will handle the credentials
class AuthHandler {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  //Is called when you click the submit button
  //Arguments:
  //All three name, email and password must be filled in
  getDataRegister = async () => {
    let res, response;

    //Both movie and year is given
    fetch("api/user/register", {
      method: "POST",
      headers: {
        //This parameter has to be set to send the request body in JSON format.
        "Content-Type": "application/json",
      },

      // Convert json object to a string with json pattern
      body: JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
      }),
    })
      .then((res) => res.json()) //convert to json
      .then((response) => {
        //If response success store token in localstorage
        if (response.status === "success") 
        {
          localStorage.setItem("token", response.token);
           info.innerHTML = "You have successfully been registred";
           info.style.color="green"
          //Redirect browser to a new page refered to by response.redirect which is admin
          //location.href = response.redirect;
        } 
        else 
        {
          //If response not success from backend alert input credentials
          alert("Please input right credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDataLogin = async () => {
    let res, response;

    //Both movie and year is given
    fetch("api/user/login", {
      method: "POST",
      headers: {
        //This parameter has to be set to send the request body in JSON format.
        "Content-Type": "application/json",
      },

      // Convert json object to a string with json pattern
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((res) => res.json()) //convert to json
      .then((response) => {
        //If response success store token in localstorage
        location.href = response.redirect;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

 const isValid = fields =>
  {
     fields.forEach(field => {
      if (fields ==="")
          return false;
   });

   return true;
  }

//Event handler that is called when clicking submit
myform.addEventListener("submit", (event) => {
  event.preventDefault();

  if ($(myform).attr('name') === "register")
  {
    if(isValid([name.value, email.value, password.value]))
        new AuthHandler(name.value, email.value, password.value).getDataRegister();
  }
  else if($(myform).attr('name') === "login")
  {
    if(isValid([email.value, password.value]))
      new AuthHandler(" ", email.value, password.value).getDataLogin();
  }
});