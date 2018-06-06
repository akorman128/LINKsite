// Initialize Firebase.
var config = {
  apiKey: "AIzaSyAWn4DZReLNXDz9Zk7ruoG6SMs4_pIyqnI",
  authDomain: "link-e7102.firebaseapp.com",
  databaseURL: "https://link-e7102.firebaseio.com",
  projectId: "link-e7102",
  storageBucket: "link-e7102.appspot.com",
  messagingSenderId: "217444145148"
};
  firebase.initializeApp(config);
  console.log(firebase);

  var userKey
  var rootRef
  var zeroRef
  var oneRef
  var twoRef

  var database = firebase.database();
  var folder = database.ref('projects');
  var users = database.ref('users')
  folder.on('value', gotData, errData);

  function gotData(data){
    var value = data.val()
    console.log(value)
  }

  function errData(err){
    console.log(err)
  }

  var submit = true


  $(function(){
    $('#send').click(function(){
      submitProject()
      });
    });

  function submitProject(){

    var skills = multiSkill()
    var tag = multiTag()
    var availability = multiAvailability()
    validateTitle()
    submitFalse()
    validateLocation()
    validateTag()
    validateAvailability()
    validateSkills()

    var title = document.getElementById("title").value

    if (submit == true) {
      var project = {
        // How to save an image on firebase???
        // cover: document.getElementById()
        title: title,
        location: document.getElementById("location").value,
        tag: tag,
        availability: availability,
        skills: skills,
        description: document.getElementById("description").value,
        name: oneRef,
        owner: threeRef,
        school: twoRef,
        startDate: timeStamp(),
      }

        var name = firebase.auth().currentUser.email
        console.log(name)

        var projectKey = folder.push(project).key
        users.child(userKey).child("myProjects").push(projectKey)

        window.location.href = "http://swipe.riverdale.edu/link/LINK/Explore/explore.html"
      }
  }


  var name = firebase.auth().currentUser
  console.log(name)

// checks if multi-selected

// var options = $('#skills').options
function multiSkill(){
  var skillString = []
  $('#skills :selected').each(function(){
    skillString.push($(this).val());
  });
  console.log(skillString)
  return skillString
}

function multiTag(){
  var tagString = []
  $('#tag :selected').each(function(){
    tagString.push($(this).val());
  });
  console.log(tagString)
  return tagString
}

function multiAvailability(){
  var availString = []
  $('#availability :selected').each(function(){
    availString.push($(this).val());
  });
  console.log(availString)
  return availString
}

// checks to see if title filled
  function validateTitle() {
    var title = document.getElementById("title").value;
    if (title == "") {
        alert("Your project needs a name!");
        submit = false;
    } else {
      submit = true;
    }
}

function validateLocation() {
    var location = document.getElementById("location").value;
    if (location == "...") {
        alert("Where's your project located?");
        submit = false;
    } else {
      submit = true;
    }
}

function validateTag() {
    var tag = document.getElementById("tag").value;
    if (tag == "...") {
        alert("Tag your project!");
        submit = false;
    } else {
      submit = true;
    }
}

function validateAvailability() {
    var availability = document.getElementById("availability").value;
    if (availability == "...") {
        alert("When are you available to work on your project?");
        submit = false;
    } else {
      submit = true;
    }
}

function validateSkills() {
    var skills = document.getElementById("skills").value;
    if (skills == "...") {
        alert("What skills are you looking for in potential partners?");
        submit = false;
    } else {
      submit = true;
    }
}
// *** make so error message disappears if corrected!
// makes red error message
function submitFalse() {
  if (submit == false){
    $('#description').after(
      '<p id="incomplete"> One or more of the above options were not selected. Please unclick "..." before you submit.</p>'
    );
  } else{
    $('#description').after(
      '<p id="incomplete">  </p>'
    );
  }
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser){
    console.log(firebaseUser)
    const rootRef = database.ref('users').orderByChild("email").equalTo(firebaseUser.email).on("value", function(currentUser){
      currentUserValue = currentUser.val();
      userKey = Object.keys(currentUserValue)[0]
      zeroRef = currentUserValue[userKey]
      oneRef = currentUserValue[userKey]['name']
      twoRef = currentUserValue[userKey]['school']
      threeRef = firebaseUser.email
  });
} else{
  window.location.href = ('http://swipe.riverdale.edu/link/LINK/signIn/signIn.html')
  }
});

// https://gist.github.com/jlabresh1-code/4179576

function timeStamp() {
  // Create a date object with the current time
    var now = new Date();

  // Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

  // Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

  // Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

  // Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
    time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }
  // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
  }
