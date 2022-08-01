document.addEventListener("DOMContentLoaded", function () {
    const loadEl = document.querySelector("#load");
    //
    //   firebase.auth().onAuthStateChanged((user) => {});
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
  
    //seleccion de los elementos html para los logeados y sin logear
    const loggedOutLinks = document.querySelectorAll(".logged-out");
    const loggedInLinks = document.querySelectorAll(".logged-in");
  
    const loginCheck = (user) => {
      if (user) {
        // alert("si");
        loggedInLinks.forEach((link) => (link.style.display = "block"));
        loggedOutLinks.forEach((link) => (link.style.display = "none"));
      } else {
        // alert("no");
        loggedInLinks.forEach((link) => (link.style.display = "none"));
        loggedOutLinks.forEach((link) => (link.style.display = "block"));
      }
    };
  
    // SignUp

  
    // // Iniciar Sesion de la parchapp
    const signInForm = document.getElementById("login-form");
    const usernameNav = document.getElementById("nameNav");
    const profileName = document.getElementById("userName");
    const profileN = document.getElementById("userName2");
    const emailName = document.getElementById("emailName");
    const imgName = document.getElementById("imgName");
    const provedorName = document.getElementById("provedorName");
    const cambiarClave = document.getElementById("cambiarClave");
    const divInfo1 = document.getElementById("info1");
    const divInfo2 = document.getElementById("info2");

    cambiarClave.addEventListener("click", () => { 

        divInfo1.style.display = "none";
        divInfo2.style.display = "block";
    });
  
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const {displayName , photoURL , uid , email,providerId} = user;
        profileN.innerHTML += displayName
        profileName.innerHTML += displayName
        emailName.innerHTML += email;
        imgName.src = photoURL;
        provedorName.innerHTML += providerId;

        console.log(user)
        loginCheck(user);
        user.displayName ?  usernameNav.innerHTML = displayName : ''
        // ...
      } else {
        loginCheck(user);
  
      }
    });



    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = signInForm["emailLogin"].value;
        const password = signInForm["passLogin"].value;
    
        // Authenticate the User
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // clear the form
              signInForm.reset();
              // close the modal
              $("#iniciarSesion").modal("hide");
            }) .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
    
    
              console.log(errorCode);
            });
      });
  
    // Login with Google
    const googleButton = document.querySelector("#googleLogin");
  
    googleButton.addEventListener("click", (e) => {
      e.preventDefault();
      signInForm.reset();
      $("#iniciarSesion").modal("hide");
  
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const {user} = result.user.multiFactor;
          console.log(user);
          Swal.fire({
            title: "Felicidades",
            text: "Sesion Con Google Iniciada Correctamente",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });


      
    // Cerrar sesion
    const logout = document.getElementById("logout");
  
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      firebase
        .auth()
        .signOut()
        .then(() => {
          Swal.fire({
            title: "Felicidades",
            text: "Sesion Cerrada Correctamente",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        });
    });
  
  
    // // Login with Facebook
    // const facebookButton = document.querySelector("#facebookLogin");
  
    // facebookButton.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   signInForm.reset();
    //   $("#signinModal").modal("hide");
  
    //   const provider = new firebase.auth.FacebookAuthProvider();
    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then((result) => {
    //       console.log(result);
    //       console.log("facebook sign in");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
  });
  