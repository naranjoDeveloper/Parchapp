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

  const loggedOutLinks = document.querySelectorAll(".logged-out");
  const loggedInLinks = document.querySelectorAll(".logged-in");

  // const createButton = document.getElementById("create");

  // createButton.addEventListener("click", () => {
  //   let textTitle = document.getElementById("titulo").value;
  //   let textContent = document.getElementById("contenido").value;

  //   if (textContent.length <= 0 || textTitle.length <= 0) {
  //     Swal.fire({
  //       title: "Longitud Invalid",
  //       text: "Los campos no pueden ser vacios",
  //       icon: "error",
  //     });
  //   } else {
  //     createPost(textTitle, textContent);
  //   }
  // });

  const loginCheck = (user) => {
    if (user) {
      loggedInLinks.forEach((link) => (link.style.display = "block"));
      loggedOutLinks.forEach((link) => (link.style.display = "none"));
    } else {
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

  // Logout
  const logout = document.querySelector("#logout");

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signup out");
      });
  });

  // SingIn
  const signInForm = document.querySelector("#login-form");

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signInForm["login-email"].value;
    const password = signInForm["login-password"].value;

    // Authenticate the User
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // clear the form
        signInForm.reset();
        // close the modal
        $("#signinModal").modal("hide");
      });
  });

  // Posts
  const postList = document.getElementById("posts")


postList.innerHTML += 'daadada';

  const setupPosts = (data) => {
    if (data.length) {
      data.forEach((doc) => {
        const post = doc.data();

        postList.innerHTML += `
        <div class="card mx-2 my-2 col-3" c>
    <div class="card-header bg-danger text-white">
      ${post.Name}
    </div>
    <div class="card-body" style="height: 12rem;overflow-y: auto;" >

      <h4 class="font-weight-bold"> ${post.Content} </h4>
    </div>
  </div>
        `;
      });
    }
  };

  //mostrar resultados tabla sin logearse

  firebase
    .firestore()
    .collection("posts")
    .get()
    .then((snapshot) => {
      setupPosts(snapshot.docs);
    });

  // events
  // list for auth state changes
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("signin");
      loginCheck(user);
    } else {
      console.log("signout");
      setupPosts([]);
      loginCheck(user);
    }
  });

  // Login with Google
  const googleButton = document.querySelector("#googleLogin");

  googleButton.addEventListener("click", (e) => {
    e.preventDefault();
    signInForm.reset();
    $("#signinModal").modal("hide");

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log("google sign in");
      })
      .catch((err) => {
        console.log(err);
      });
  });

});
