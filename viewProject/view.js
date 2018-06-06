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
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

var rootRef
var oneRef
var twoRef
var threeRef
var fourRef
var userKey
var follows = 0
var myLink
var memberString = []
var popUp = true


  var database = firebase.database();
  var folder = database.ref('projects');
  var users = database.ref('users')



  // sets var url to the actual url
  var url = window.location.href
  // sets var key to the end of the url (which is the key)
  var key = url.slice(-20)
  // sets project to key
  var project = key

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
      const rootRef = database.ref('users').orderByChild("email").equalTo(firebaseUser.email).once("value", function(currentUser){
        currentUserValue = currentUser.val();
        userKey = Object.keys(currentUserValue)[0]
        console.log(userKey)
        oneRef = currentUserValue[userKey]['name']
        twoRef = currentUserValue[userKey]['follows']
        fourRef = currentUserValue[userKey]['email']
        // hideFollowButton()
        folder.child(project).once("value",getData);
        // folder.child(project).once("value",formButton);
        // folder.child(project).once("value", displayForm);
        folder.child(project).on("value", comments);
        folder.child(project).once("value",addMembers);

        });

      } else{
        window.location.href = ('http://swipe.riverdale.edu/link/LINK/signIn/signIn.html')
      }
    });




$('#body').append(
"<div id='commentSection'>"+
  '<textarea id="comment" placeholder="Comments..."></textarea>'+
  "<div id='pushComment'>"+
    '<button id="post" onClick="postComment()">Post</button>'+
  '</div>'+
  '<div id="commentContainer"></div>'+
"</div>"  );


  function comments(data){
  projectInfo = data.val();
  $('#commentContainer').empty();
  for (var x in projectInfo['comments']){
    var myLink = 'http://swipe.riverdale.edu/link/LINK/Profile/profile.html?key=' + projectInfo['comments'][x]['userkey']
      $('#commentContainer').prepend(
        "<div id='viewComments'>"+
          "<div id='commentMenu' onClick='commentMenu()'> ..."+
          "</div>"+
          "<div id='profileComment'>"+
          "</div>"+
          "<div id='displayComment'>"+
             projectInfo['comments'][x]['comment']+
          "</div>" +
          "<div id='user_time'>"+
            "<a class='commentLink' href=" + myLink + ">"+
            projectInfo['comments'][x]['name'] + ' | '+
            "</a>"+
            projectInfo['comments'][x]['timestamp']+
          "</div>"+
        "</div>"
      );
      // console.log(userKey)
      // console.log(projectInfo['comments'][x]['userkey'])
      //
      // if(userKey !== projectInfo['comments'][x]['userkey']){
      //   console.log('addclass')
      //   $('#commentMenu').addClass('hide')
      // } else{
      //   console.log('removeClass')
        // $('#commentMenu').removeClass('hide')
      // }

      $('#comment').val('');
  }
}

function commentMenu(){

}

function postComment(){
    if ( $('#comment').val() !==  ''){
    var name = firebase.auth().currentUser.email
    const rootRef = database.ref('users').orderByChild("email").equalTo(name).on("value", function(currentUser){
      currentUserValue = currentUser.val();
      var userKey = Object.keys(currentUserValue)[0]
      oneRef = currentUserValue[userKey]['name']
      console.log(oneRef)
    });
// push
      var comment = {comment: $('#comment').val(), timestamp: timeStamp(), name: oneRef, userkey: userKey}
      folder.child(key).child("comments").push(comment)
      users.child(userKey).child("comments").push(comment)
    }
  }

  function comments(data){
  projectInfo = data.val();
  $('#commentContainer').empty();
  for (var x in projectInfo['comments']){
    var myLink = 'http://swipe.riverdale.edu/link/LINK/Profile/profile.html?key=' + projectInfo['comments'][x]['userkey']
      $('#commentContainer').prepend(
        "<div id='viewComments'>"+
          // "<div id='commentMenu' onClick='commentMenu()'> ..."+
          // "</div>"+
          "<div id='profileComment'>"+
          "</div>"+
          "<div id='displayComment'>"+
             projectInfo['comments'][x]['comment']+
          "</div>" +
          "<div id='user_time'>"+
            "<a class='commentLink' href=" + myLink + ">"+
            projectInfo['comments'][x]['name'] + ' | '+
            "</a>"+
            projectInfo['comments'][x]['timestamp']+
          "</div>"+
        "</div>"
      );


      if(firebase.auth().currentUser.key == projectInfo['comments'][x]['userkey']){
        $('#viewComments').append(
          "<div id='commentMenu' onClick='commentMenu()'> ..."+
          "</div>");
      }

      $('#comment').val('');
  }
}

function followProject(){
        if (twoRef == undefined){
          console.log(twoRef)
          folder.child(key).child("followers").push(userKey)
          users.child(userKey).child("follows").push(key)
          $('.follow').addClass('hide');
          $('.followed').removeClass('hide');
        } else{
          for (var x in twoRef){
            if(key == twoRef[x]){
              console.log('User is already following this project.')
              $('.follow').addClass('hide');
              $('.followed').removeClass('hide');
              return false
              }
            }
          folder.child(key).child("followers").push(userKey)
          users.child(userKey).child("follows").push(key)
          $('.follow').addClass('hide');
          $('.followed').removeClass('hide');
          return false;
        }
}

    // passes data from firebase
    function getData(data){

      // makes projectInfo a global variable
      var projectInfo = data.val();
           $('#body').append(
             // Center panels
             "<table id='imgTitle'>"+
                  "<tr>"+
                    "<td>"+
                    // cover photo
                      "<img id='cover' src='book.jpg'></img>"+
                    "</td>" +
                    // title of project
                    "<td id='title'>"+
                      "<p>"+
                        projectInfo.title +
                      "</p>"+
                      "<div>"+
                        "<table>"+
                          "<tr>"+
                            "<td id='followButtonContainer'>"+

                            "</td>"+
                          "</tr>"+
                      "  </table>"+
                      "</div>"+
                    "</td>"+
                  "</tr>"+
                "</table>"+

                // description
                "<div id='description'>"+
                  "<h1>"+
                    "Description"+
                  "</h1>" +
                  "<div id='textBox'>" +
                    "<p>" +
                      projectInfo.description +
                    "</p>"+
                  "</div>"+
                "</div>"+

                // project stats
                "<div class='info'>"+
                  "<div id='profile'></div>"+
                      "<table class='infoContainer'>"+
                      "  <tr>"+
                          "<td class='link'>"+
                            "<p>"+
                              projectInfo.name+ ","+
                            "</p>"+
                            "<p>"+
                              projectInfo.school+
                            "</p>"+
                          "</td>"+
                          "<td class='linkB'>"+
                              "Members:"+
                            "<p>"+
                              memberCount+
                            "</p>"+
                           "</td>"+
                        "</tr>"+
                        "<tr>"+
                          "<td class='link'>"+
                         "Location: " +
                          projectInfo.location+
                         "</td>"+
                          "<td class='linkB'>"+
                                "Followers:"+
                              "<p>"+
                              threeRef +
                              "</p>"+
                            "</td>"+
                          "</tr>"+
                        "</table>"+
                      "<table id='infoTwo'>"+
                        "<td>"+
                        'Availability: '+
                        projectInfo.availability +
                        "</td>"+
                      "</table>"+
                  "<div id='blogContainer'>"+
                    "<div id='blog'>"+
                    "</div>"+
                  "</div>"+
                "</div>"
            );
            ifFollowed()
          }

  function addMembers(data){

    var projectInfo = data.val()

    $('#body').append(
      "<div id='membersContainer'>"+
      "</div>"
    );


    console.log(projectInfo['owner'])
    console.log(fourRef)
    if (projectInfo['owner'] == fourRef){
      $('#membersContainer').append(
      "<input id='searchMembers' placeholder = 'Add members...'/>");
    } else{
      folder.child(project).once("value",formButton)
      return false
    }



    $('#searchMembers').keyup(function(){
      var membersQueryUpper = $('#searchMembers').val()
      membersQueryUpper= membersQueryUpper.charAt(0).toUpperCase() + membersQueryUpper.slice(1);

      var membersQuery = $('#searchMembers').val();
      console.log(membersQuery)
      if (membersQuery !== '' && membersQuery !== ' '){




        $("#memberQueryContainer").remove()
        $(".queryMemberResults").remove()
        $("#selectQueryMember").remove()
        $('#pushMember').remove()

        $('#membersContainer').append(
          "<button id='pushMember' onClick='pushMember()'>Add</button>"
        )
        $('#searchMembers').after(
          "<div id='memberQueryContainer'>"+
            "<select id='selectQueryMember' multiple></select>"+
          "</div>"
        )

        const rootRefTwo = database.ref('users').orderByChild('name').startAt(membersQuery).endAt(membersQuery+'\uf8ff').limitToFirst(5).once("value", function(snapshot){
          var queryMemberResults = snapshot.val()

          for (var x in queryMemberResults){
            $("#selectQueryMember").append(
              "<option class='queryMemberResults'>"+ queryMemberResults[x]['name'] +", " + queryMemberResults[x]['email']+
              "</option>"
            )
          }
      });

      if(membersQuery.charAt(0) !== membersQuery.charAt(0).toUpperCase()){
        $("#memberQueryContainer").remove()
        $(".queryMemberResults").remove()
        $("#selectQueryMember").remove()
        $('#pushMember').remove()

        $('#membersContainer').append(
          "<button id='pushMember' onClick='pushMember()'>Add</button>"
        )

        $('#searchMembers').after(
          "<div id='memberQueryContainer'>"+
            "<select id='selectQueryMember' multiple></select>"+
          "</div>"
        )
        // $("#selectQueryMember").remove()
        const rootRefThree = database.ref('users').orderByChild('name').startAt(membersQueryUpper).endAt(membersQueryUpper+'\uf8ff').limitToFirst(5).once("value", function(snapshot){
          var queryMemberResultsUpper = snapshot.val()
          for (var x in queryMemberResultsUpper){
            $("#selectQueryMember").append(
              "<option class='queryMemberResults'>"+ queryMemberResultsUpper[x]['name']+
              "</option>")
          }
        });
      }

    } else{
      $(".queryMemberResults").remove()
    }
  });

    folder.child(project).once("value",formButton)
  }

function pushMember(){
    memberString = []
    $('#selectQueryMember :selected').each(function(){
      memberString.push($(this).val());
    });
    console.log(memberString[0])
    folder.child(project).once("value",validatePush);
}

// sees if user is already a member of the project
function validatePush(data){
  projectInfo = data.val()
  if (projectInfo['members'] == undefined){
    folder.child(key).child("members").push(memberString[0])
    return false
  }
  for (var x in projectInfo['members']){
    if (projectInfo['members'][x] == memberString[0]){
      console.log('this user is already a member')
      return false
    }else{
      folder.child(key).child("members").push(memberString[0])
    }
  }
}


    // button that allows the user to make a form

  function formButton(data){
    console.log('form Button')
    var projectInfo = data.val()
      $('#membersContainer').append(
        "<div id='formButtonContainer'>"+
          "<button id='formButton' onClick='formContainer()'>"+
            "<h1>Add Links</h1>"+
          "</button>"+
        "</div>");
    if (firebase.auth().currentUser.email == projectInfo['owner']){
      $('#formButton').removeClass('hide');
        } else{
      $('#formButton').addClass('hide');
      }
      folder.child(project).once("value", displayForm)
    }


function displayForm(data){
  console.log('display form')
  projectInfo = data.val()

  $('#formButtonContainer').append(
    "<div id='formContainer'></div>");

  $('#formContainer').empty()
  for (var x in projectInfo['links']){
    var displayLink = projectInfo['links'][x]['link']
    $('#formContainer').prepend(
      "<div>"+
        "<div id='displayForm'>"+
          "<p class='displayFormContent'>" + projectInfo['links'][x]['description'] + "</p>"+
          "<a class='displayFormContent' href='http://" + displayLink+ " '>" + displayLink + "</a>"+
        "</div>"+
      "</div>");
  }

  folder.child(project).once("value",getSkills);
}

function formContainer(){
    $('#nav').append(
      "<div id='form' class='hide'>"+
        "<div id='exit' onClick='exit()'><p>x</p></div>"+
        "Description: <br/> <input type='text' id='linkDescription' class='input'/>"+
        "<br/> <br/> Link: <br/> <input type='text' id='link' class='input'/>"+
        "<button id='submitForm' onClick='pushLink()'>Submit</button>"+
      "</div>"
    );

    if(popUp == true){
      popUp = false;
      $('#form').removeClass('hide'); }

}

// exit form popup
function exit(){
$('#form').addClass('hide');
popUp = true;
}

// push link directory to database
function pushLink(){
var linkDescription = $('#linkDescription').val();
var link = $('#link').val();
var form = {link: link, description: linkDescription}
if(linkDescription !== "" && link !== ""){
  folder.child(key).child("links").push(form)
  exit()
  }
}

  function getSkills(data){
    projectInfo = data.val()
    $('#formContainer').after(
      '<div id="skills">'+
        '<h1> Skill Openings </h1>'+
        '<div id="skillsContainer">'+
          '<ul id="skillsList">'+
          '<ul>'+
        '</div>'+
      '</div>'
    );
      for (var x in projectInfo['skills']){
      $('#skillsList').append(
          "<li class='listStyle'>"+ projectInfo['skills'][x] + "</li>"
      );
    }

  }

// if project has followers, pushes the amount to database.

  folder.child(project).once("value",followerCount);

  function followerCount(data){
    var projectInfo = data.val();

    threeRef = projectInfo['followers'];

    if(threeRef == undefined){
      threeRef = 0
      folder.child(project).child("followerCount").set(threeRef)
    } else{
      threeRef = Object.keys(projectInfo['followers']).length
      folder.child(project).update({followerCount: threeRef})
    }
  }

  folder.child(project).once("value",memberCount);

  function memberCount(data){
    var projectInfo = data.val();

    memberCount = projectInfo['members'];

    if(memberCount == undefined){
      memberCount = 0;
      folder.child(project).child("memberCount").set(memberCount)
    } else{
      memberCount = Object.keys(projectInfo['members']).length
      folder.child(project).update({memberCount: memberCount})
    }
  }


// checks to see if project followed then changes button accordingly
  function ifFollowed() {
      console.log("in if followed")
      console.log(twoRef)
      for (var x in twoRef){
        if(key == twoRef[x]){
          console.log($('#followButtonContainer'))
          $('#followButtonContainer').append(
          "<button class='button follow hide' id='follow' onClick='followProject()'>" +
            "Follow"+
          "</button>"+
          "<p class='button followed' id='followed'>" +
            "Followed"+
          "</p>");
          return false
          }
      }
        $('#followButtonContainer').append(
        "<button class='button follow' id='follow' onClick='followProject()'>" +
          "Follow"+
        "</button>"+
        "<p class='button followed hide'>" +
          "Followed"+
        "</p>");
    };


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
