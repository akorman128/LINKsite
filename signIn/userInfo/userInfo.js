var config = {
  apiKey: "AIzaSyAWn4DZReLNXDz9Zk7ruoG6SMs4_pIyqnI",
  authDomain: "link-e7102.firebaseapp.com",
  databaseURL: "https://link-e7102.firebaseio.com",
  projectId: "link-e7102",
  storageBucket: "link-e7102.appspot.com",
  messagingSenderId: "217444145148"
};

var rootRef
var oneRef

firebase.initializeApp(config);
console.log(firebase);

  var database = firebase.database();
  var folder = database.ref('users');
  folder.on('value', gotData, errData);

  function gotData(data){
    var value = data.val()
    console.log(value)
    // window.location.href="http://swipe.riverdale.edu/link/LINK/Profile/profile.html";
  }

  function errData(err){
    console.log(err)
  }


function submitUser(){
        var user = {
          // How to save an image on firebase???
          // cover: document.getElementById()
          email: document.getElementById("email").value,
          name: document.getElementById("name").value,
          school: document.getElementById("school").value,
          grade: document.getElementById("grade").value,
          description: document.getElementById("bio").value,
          connections: [''],
        }
          folder.push(user);
          window.location.href= "http://swipe.riverdale.edu/link/LINK/Explore/explore.html"
      };




  function validate(){
    // get email and password
     const txtEmail = $('#email');
     const email =  txtEmail.val();
     const txtPass = $('#pass');
     const pass = txtPass.val();
     validateName()
     validateGrade()
     validateSchool()
     validateBio()
     if(email.slice(-13) == 'riverdale.edu' && pass.length >= 7){
       console.log('valid organization')
       const auth = firebase.auth();
       // check to see if email is already in use
       rootRef = database.ref();
       // Am is setting it equal to email or searching within the system for an existing email address == email?
       oneRef = rootRef.child('users').orderByChild("email").equalTo(email).once("value", function(snapshot) {
         if(snapshot.val()){
         console.log(snapshot.val());
         return false;
        } else{
          // signup and sign in (only happens once)
          const promise = auth.createUserWithEmailAndPassword(email,pass);
          const promiseTwo = auth.signInWithEmailAndPassword(email,pass);
          promise.catch(e => console.log(e.message));
          //promiseTwo.catch(e => console.log(e.message));
          console.log(promise)
           $('#validate').addClass('hide');
           $('#next').removeClass('hide');}
      });
      } else{

          console.log('Invalid Email')
       }
  }

  function validateName() {
    var name = document.getElementById("name").value;
    if (name == "" || name == " ") {
        errorMessage()
        return false;
    }
}
 function validateGrade() {
  var grade = document.getElementById("grade").value;
  if (grade == "" || grade == " ") {
      errorMessage()
      return false;
  }
}

function validateSchool() {
 var school = document.getElementById("school").value;
 if (school == "" || school == " ") {
     errorMessage()
     return false;
 }
}

function validateBio(){
  var bio = document.getElementById('bio').value;
  if (bio == "" || bio == " ") {
      errorMessage()
      return false;
  }
}

function errorMessage(){
  console.log('yo')
  $('#head').after(
    '<p id="incomplete"> One or more of the above fields were not completed.</p>'
  );
}



    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser.email)
        console.log('firebase user is logged in')
      } else{
        console.log('not logged in')
      }
    });
