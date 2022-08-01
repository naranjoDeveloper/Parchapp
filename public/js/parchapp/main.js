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

  const createPost = (title, content) => {
    firebase
      .firestore()
      .collection("posts")
      .doc()
      .set({
        Content: content,
        Name: title,
      })
      .then(() => {
        Swal.fire({
          title: "Felicidades",
          text: "Texto Creado Correctamente",
          icon: "success",
        }),
          setTimeout(() => location.reload(), 1800);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  // SignUp

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

  // // Iniciar Sesion de la parchapp
  const signInForm = document.getElementById("login-form");
  const usernameNav = document.getElementById("nameNav");

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



  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      loginCheck(user);
      user.displayName ?  usernameNav.innerHTML = user.displayName : ''
      // ...
    } else {
      loginCheck(user);

    }
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
