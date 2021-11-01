//Variable definitions
const myform = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const info = document.querySelector("#info");

//Define a class AuthHandler constructor that will handle the credentials
class AuthHandler {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  //Is called when we want to register an accountusing Post
  //All data is already in the object
  getDataRegister = async () => {
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
      .then((res) => res.json())
      .then((data) => {
        //If data is success store token in localstorage
        if (data.status === "success") {
          //localStorage.setItem("token", data.token);

          //Give some suitable information
          info.innerHTML = "You have successfully been registred";
          info.style.color = "green";
        } else {
          //If response not success from backend alert input credentials
          alert("Please input right credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Is called when we want to login to an existing account
  //Here we use async/await
  getDataLogin = async () => {
    try {
      const resolve = await fetch("api/user/login", {
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
      });

      let data = await resolve.json();

      if (data.status === "success") 
      {
        location.href = "api/secure/protected";
      }
    } catch (e) {
      console.log(e);
    }
  };
}

//Validate collection fields if we have empty string
const isValid = (fields) => {
  let status = true;
  fields.forEach((field) => {
    if (field === "") status = false;
  });
  return status;
};

//Event handler that is called when clicking submit
if (myform) {
  myform.addEventListener("submit", (event) => {
    event.preventDefault(); //Supress default handling page refresh on submit

    //Check which form we are using and validate the forms fields
    //If valid form instansiate a new Authhandler
    if ($(myform).attr("name") === "register") {
      if (isValid([name.value, email.value, password.value])) {
        new AuthHandler(
          name.value,
          email.value,
          password.value
        ).getDataRegister();
      } else {
        alert("You must fill in both Name, Email and Password");
      }
    } else {
      if ($(myform).attr("name") === "login") {
        if (isValid([email.value, password.value])) {
          new AuthHandler(" ", email.value, password.value).getDataLogin();
        } else {
          alert("You must fill in both Email and Password");
        }
      }
    }
  });
}
