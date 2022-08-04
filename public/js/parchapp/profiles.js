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

  //seleccion bloques html para agregarles la informacion
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
  const telefonoName = document.getElementById("telefonoName");
  const formChangePass = document.getElementById("cambiarPass");
  const fotoURL = document.getElementById("fotoURL");
  const divInfo3 = document.getElementById("info3");
  const editarInfo = document.getElementById("editarInfo");
  const contenedor = document.getElementById("contenedor");
  const actualizarInfo = document.getElementById("actualizarInfo");

  //inputs div actualizar info3

  const userN = document.getElementById("userN");
  const emailN = document.getElementById("emailN");
  const fotoN = document.getElementById("fotoN");

  //boton actualizar informacion

  //inputs cambio contraseña

  const passName = document.getElementById("passName");
  const passName2 = document.getElementById("passName2");

  cambiarClave.addEventListener("click", () => {
    divInfo1.style.display = "none";
    divInfo2.style.display = "block";
    editarInfo.style.display = "none";
  });

  editarInfo.addEventListener("click", () => {
    //se ocultan los divs y se hace el append del div 3 que no funciona con style display block
    divInfo1.style.display = "none";
    cambiarClave.style.display = "none";
    divInfo3.style.display = "block";
    contenedor.append(divInfo3);

    const user = firebase.auth().currentUser;

    userN.value = user.displayName;
    emailN.value = user.email;
    fotoN.value = user.photoURL;
  });

  formChangePass.addEventListener("submit", (e) => {
    e.preventDefault();

    changePassword(passName.value, passName2.value);
  });

  actualizarInfo.addEventListener("submit", (e) => {
    e.preventDefault();

    // console.log(userN.value , emailN.value , numeroN.value , fotoN.value);
    const user = firebase.auth().currentUser;

    if (user.displayName === userN.value && user.photoURL === fotoN.value) {
      updateEmail(emailN.value)
    } else {
      updateInfo(userN.value , fotoN.value)
    }

    if(user.displayName != userN.value && user.photoURL != fotoN.value && user.email != emailN.value) {
      alert('pasa')
      updateEmail(emailN.value)
      updateInfo(userN.value , fotoN.value)
    }

    // console.log(emailN.value)
  });

  const updateEmail = (email) => {
    const user = firebase.auth().currentUser;
    console.log(user.email, emailN.value);
    user
      .updateEmail(email)
      .then(() => {
        Swal.fire({
          text: "Correo Actualizado Correctamente",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const updateInfo = (nUser, nURL) => {
    nUser = userN.value;
    nURL = fotoN.value;

    const user = firebase.auth().currentUser;

    console.log(user);

    user
      .updateProfile({
        displayName: nUser,
        photoURL: nURL,
      })
      .then(() => {
        Swal.fire({
          text: "Datos Actualizados Correctamente",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1300);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePassword = (pass1, pass2) => {
    //comprobacion de la igualdad de los campos
    if (pass1 === pass2) {
      passName2.classList.remove("is-invalid");

      const user = firebase.auth().currentUser;

      user
        .updatePassword(pass1)
        .then(() => {
          // Update successful.
          Swal.fire({
            text: "Contraseña actualizada correctamente",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          formChangePass.reset();
          divInfo1.style.display = "block";
          divInfo2.style.display = "none";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      passName2.classList.add("is-invalid");
      console.log("nada");
    }
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const { displayName, photoURL, uid, email, providerId, phoneNumber } =
        user;
      profileN.innerHTML += displayName;
      profileName.innerHTML += displayName;
      emailName.innerHTML += email;
      imgName.src = photoURL;
      fotoURL.innerHTML += photoURL;
      provedorName.innerHTML += providerId;
      telefonoName.innerHTML += phoneNumber;

      loginCheck(user);
      user.displayName ? (usernameNav.innerHTML = displayName) : "";
      // ...
    } else {
      window.location = "./index.html";
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
      })
      .catch((error) => {
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
        const { user } = result.user.multiFactor;
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
