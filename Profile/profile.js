var config = {
  apiKey: "AIzaSyAWn4DZReLNXDz9Zk7ruoG6SMs4_pIyqnI",
  authDomain: "link-e7102.firebaseapp.com",
  databaseURL: "https://link-e7102.firebaseio.com",
  projectId: "link-e7102",
  storageBucket: "link-e7102.appspot.com",
  messagingSenderId: "217444145148"
};

  firebase.initializeApp(config);

  var database = firebase.database();

  var folder = database.ref('projects');

  var oneRef
  var twoRef
  var threeRef
  var fourRef
      var sixRef
  var fiveRef
      var sevenRef

// sets var url to the actual url
var url = window.location.href
console.log(url)
// sets var key to the end of the url (which is the key)
var urlKey = url.slice(-20)
console.log(urlKey)


firebase.auth().onAuthStateChanged(firebaseUser => {
  $('#myProjects').empty()
  $('#followedProjects').empty()
  if (firebaseUser){
    const rootRef = database.ref('users').child(urlKey).on("value", function(snapshot){
      userInfo = snapshot.val();
      console.log(userInfo)
      oneRef = userInfo['name']
      twoRef = userInfo['follows']
      threeRef = userInfo['school']
      fourRef = userInfo['myProjects']
      fiveRef = userInfo['follows']

      // sets follows/projects number w/o error
      if (fourRef == undefined){
        sixRef = 0;
      } else{
        sixRef = Object.keys(userInfo['myProjects']).length;
        console.log(sixRef)
      }

      if (fiveRef == undefined){
        sevenRef = 0;
      } else{
        sevenRef = Object.keys(userInfo['follows']).length;
        console.log(sevenRef)
      }

      folder.once("value",getProject);
      function getProject(data){
        for (var x in fourRef){
          projectInfo = data.val();
          $('#myProjects').append(
            "<td class='project'>"+
              "<a href="+"http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key="+ fourRef[x] + "> <p> <b>" + projectInfo[fourRef[x]]['title'] + "</b> </p> </a> <hr/>" +
              "<p> Owner: " + projectInfo[fourRef[x]]['name'] + "</p> <br/>"+
              "<p> Availability: " + projectInfo[fourRef[x]]['availability'] + "</p> <br/>"+
              "<p> Location: " + projectInfo[fourRef[x]]['location'] + "</p> <br/>"+
              "<p>" + projectInfo[fourRef[x]]['tag'] + "</p>"+
            "</td>"
          );
        }

        for (var y in fiveRef){
          console.log(projectInfo[fiveRef[y]]['title'])
          $('#followedProjects').append(
            "<td class='project'>"+
              "<a href="+"http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key="+ fiveRef[y] + "> <p> <b>" + projectInfo[fiveRef[y]]['title'] + "</b> </p> </a> <hr/>" +
              "<p> Owner: " + projectInfo[fiveRef[y]]['name'] + "</p> <br/>"+
              "<p> Availability: " + projectInfo[fiveRef[y]]['availability'] + "</p> <br/>"+
              "<p> Location: " + projectInfo[fiveRef[y]]['location'] + "</p> <br/>"+
              "<p>" + projectInfo[fiveRef[y]]['tag'] + "</p>"+
            "</td>"
          );
        }
      } //end of function

      console.log(oneRef, twoRef, threeRef)
       $('#body').append(
        // <!--Top box container-->
        "<div class='info'>"+
          "<div id='profile'>"+
            // <!--Table containing info-->
            "<table id='infoContainer'>"+
              "<tr>"+
                "<td class='cellOne'>"+
                  oneRef+
                "</td>"+
                "<td class='cellTwo'>"+
                  'Following:'+ '</br>'+ sevenRef+
                "</td>"+
              "</tr>"+
              "<tr>"+
                "<td class='cellOne'>"+
                  threeRef+
                "</td>"+
                "<td class='cellTwo'>"+
                  "Projects: </br>" + sixRef +
              "  </td>"+
              "</tr>"+
            "</table>"+
          "</div>"+
        "</div>"+

        // <!--Headers-->
        "<p class='title'>"+
          "My Projects"+
        "</p>"+

        // <!--Where project scrolled through-->
        "<div class='projectHolder'>"+
          "<table>"+
            "<tr id='myProjects'>"+
            "</tr>"+
          "</table>"+
        "</div>" +

        "<p class='title'>"+
          "Followed Projects"+
        "</p>"+

        "<div class='projectHolder'>"+
        "<table>"+
          "<tr id='followedProjects'>"+
          "</tr>"+
        "</table>"+
        "</div>"
      );

    });
  } else{
    window.location.href = ('http://swipe.riverdale.edu/link/LINK/signIn/signIn.html')
  }
});
