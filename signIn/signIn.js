  var config = {
      apiKey: "AIzaSyAWn4DZReLNXDz9Zk7ruoG6SMs4_pIyqnI",
      authDomain: "link-e7102.firebaseapp.com",
      databaseURL: "https://link-e7102.firebaseio.com",
      projectId: "link-e7102",
      storageBucket: "link-e7102.appspot.com",
      messagingSenderId: "217444145148"
    };

    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

//
//     // new instance of google auth.
//     // var provider = new firebase.auth.GoogleAuthProvider();
//
//     // asks provider for additional info about user
//     // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//
// //
// //     firebase.auth().useDeviceLanguage();
// //     firebase.auth().signInWithRedirect(provider);
// //
// //     $('#signIn').click(function (){
// //     firebase.auth().signInWithPopup(provider).then(function(result) {
// //   // This gives you a Google Access Token. You can use it to access the Google API.
// //     var token = result.credential.accessToken;
// //     // The signed-in user info.
// //     var user = result.user;
// //     console.log(user);
// //     // catch is like an if else. The else is if there is an error
// //   }).catch(function(error) {
// //     // Handle Errors here.
// //     var errorCode = error.code;
// //     var errorMessage = error.message;
// //     // The email of the user's account used.
// //     var email = error.email;
// //     // The firebase.auth.AuthCredential type that was used.
// //     var credential = error.credential;
// //     // ...
// //   });
// // });
// //
// //     firebase.auth().signOut().then(function() {
// //       // Sign-out successful.
// //       console.log('signed out')
// //     }).catch(function(error) {
// //       // An error happened.
// //     });
// //
//
// // get elements

  const txtEmail = $('#txtEmail');
  const txtPassword = $('#txtPassword');
  const login = $('#login');
  const signUp = $('#signUp');
  const logout = $('#logout')


  $('#login').click(function(){

    // get email and password
    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();
    // signIn... Firebase authorizes email and passoword. If user is real, (ctd.)
    // logs them in. If not prints error to console.
    const promise = auth.signInWithEmailAndPassword(email,pass);
    // if errors, "catch" -> console.log error
    promise.catch(e => console.log(e.message));
    console.log(promise);

  });


function enroll(){
  // if(!firebaseUser){
  console.log('hey')
    window.location.href = "http://swipe.riverdale.edu/link/LINK/signIn/userInfo/userInfo.html"
  // }
};

  // $('#signUp').click(function(){
  //   // get email and password
  //   const txtEmail = $('#txtEmail');
  //   const email = txtEmail.val();
  //   const pass = txtPassword.val();
  //   console.log(email)
  //   console.log(email.slice(-13))
  //   if(email.slice(-13) == 'riverdale.edu' && pass.length >= 7){
  //     console.log('valid email')
  //     const auth = firebase.auth();
  //     // signup and sign in (only happens once)
  //     const promise = auth.createUserWithEmailAndPassword(email,pass);
  //     promise.catch(e => console.log(e.message));
  //     console.log(promise)
  //     console.log(promiseTwo)
  //     window.location.href= "http://swipe.riverdale.edu/link/LINK/signIn/userInfo/userInfo.html"
  //   } else{
  //     console.log('Invalid Email')
  //   }
  // });


  $('#logout').click(function(){
     firebase.auth().signOut();
   });
  //

  // real time authentication listener
  // everytime user logs in or out, triggers call back (what's in parentheses)
  // firebaseUser popoulated with user's current info. If logged out will be null.
    firebase.auth().onAuthStateChanged(firebaseUser => {
      console.log(logout)
      if(firebaseUser){
        console.log(firebaseUser)
        logout.removeClass('hide');
        signUp.addClass('hide');
        login.addClass('hide');
        $('#or').addClass('hide');

        window.location.href = ('http://swipe.riverdale.edu/link/LINK/Explore/explore.html')

      } else {
        console.log('not logged in')
        logout.addClass('hide');
        signUp.removeClass('hide');
        login.removeClass('hide');
        $('#or').removeClass('hide');
        }
      });
