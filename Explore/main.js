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


var rootRef
var oneRef
var twoRef
var threeRef
var fourRef
var userKey
var myLink



// Settings dropdown menu
$(function(){
  $('.settings').slideUp("fast");
  $('.drop').hover(
    function(){
      $('.settings').removeClass('hide');
      $('.settings').slideDown("medium");
    },  function(){
        $('.settings').slideUp("fast");
    }
  );

})

// sign out
function logout(){
    firebase.auth().signOut();
    console.log('signed out')
  };


  var database = firebase.database();
  var folder = database.ref('projects');

  folder.on('value', gotData, errData);

  var project

  function gotData(data){
    project = data.val()

  }

  function errData(err){
    console.log(err)
  }



// var all =
// array of objects with characteristics: owner, tag...
  // {'key1':{'Owner': 'Alex Korman','Tag': 'Art', 'Project':'Design a Short Story', 'Location':'Manhattan', 'Availability':'Weekends', 'Members':'3', 'Description':"Artists! Help Design a Children's book with me"},
  //  'key2':{'Owner': 'Master Kuntz','Tag': 'Art', 'Project':'Take Over the World With Me, Please', 'Location':'El Mundo', 'Availability':'Monday - Sunday', 'Members':'90000', 'Description':"Just looking for some peeps to destroy all of civilization with! NBD."}};


// empties project container. appends table, tagContainer.


$(function(){

  $('#arts').click(function(){
    $('#projectsContainer').empty();
    $('#projectsContainer').append(
    '<table class="tagContainer"></table>');

// tracks number of projects
    var allNumber = 0;
    var artNumber = 0;
    var entrepreneurshipNumber = 0;
    var organizationalNumber = 0;
    var philanthropyNumber = 0;
    var techNumber = 0;

// if tag is art and total art projects are divisible by 2...
    for (var x in project){

      if(project[x]['tag'].includes('Art')){
        if (artNumber%2 == 0){

// appends imageContainer to table tagContainer
          console.log(x);
          $('.tagContainer').append(
            '<tr class="last">'+
              '<td class= "projectContainer">'+
                '<div class= "imageContainer">'+
                  '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                    '<img src="Icons/book.jpg" class= "projectImage">' +
                    '</img>' +
                  '</a>'+
                '</div>'+

// displays project's projectContent...
                  '<div class="projectContent">' +
                    '<p class="Title">' +
                      '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                       project[x]['title'] +
                       '</a>'+
                     '</p>'+
                    '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                    '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                    '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                    '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                    '<p class="Tag">' + project[x]['tag'] + '</p>'+
                  '</div>'+
              '</td>'
            );
           }

// same as above. Allows cpu to add one cell at a time
           else{
             $('.last:last-child').append(
               '<td class= "projectContainer">'+
                 '<div class= "imageContainer">'+
                     '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                       '<img src="Icons/book.jpg" class= "projectImage">' +
                       '</img>' +
                     '</a>'+
                   '</div>'+

                   '<div class="projectContent">' +
                     '<p class="Title">' +
                       '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                        project[x]['title'] +
                        '</a>'+
                      '</p>'+
                       '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                       '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                       '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                       '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                       '<p class="Tag">' + project[x]['tag'] + '</p>'+
                   '</div>'+
               '</td>'+
              '</tr>'

             );
           }
           artNumber++;
         }
      }
    });
  });

// entrepreneurship
  $(function(){
    $('#entrepreneurship').click(function(){
      $('#projectsContainer').empty();
      $('#projectsContainer').append(
      '<table class="tagContainer"></table>');

  // tracks number of projects
      var entrepreneurshipNumber = 0;

  // if tag is art and total art projects are divisible by 2...
      for (var x in project){
        if(project[x]['tag'].includes('Entrepreneurship')){
          if (entrepreneurshipNumber%2 == 0){

  // appends imageContainer to table tagContainer
            console.log(x);
            $('.tagContainer').append(
              '<tr class="last">'+
                '<td class= "projectContainer">'+
                  '<div class= "imageContainer">'+
                      '<img src="Icons/book.jpg" class= "projectImage">' +
                      '</img>' +
                  '</div>'+

  // displays project's projectContent...
                    '<div class="projectContent">' +
                      '<p class="Title">' +
                        '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                         project[x]['title'] +
                         '</a>'+
                       '</p>'+
                      '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                      '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                      '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                      '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                      '<p class="Tag">' + project[x]['tag'] + '</p>'+
                    '</div>'+
                '</td>'
              );
             }

  // same as above. Allows cpu to add one cell at a time
             else{
               $('.last:last-child').append(
                 '<td class= "projectContainer">'+
                   '<div class= "imageContainer">'+
                       '<img src="Icons/book.jpg" class= "projectImage">' +
                       '</img>' +
                     '</div>'+
                     '<div class="projectContent">' +
                       '<p class="Title">' +
                         '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                          project[x]['title'] +
                          '</a>'+
                        '</p>'+
                         '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                         '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                         '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                         '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                         '<p class="Tag">' + project[x]['tag'] + '</p>'+
                     '</div>'+
                 '</td>'+
                '</tr>'

               );
             }
             entrepreneurshipNumber++;
           }
        }
      });
    });

// organizational
    $(function(){
      $('#organizational').click(function(){
        $('#projectsContainer').empty();
        $('#projectsContainer').append(
        '<table class="tagContainer"></table>');

    // tracks number of projects
        var organizationalNumber = 0;

    // if tag is art and total art projects are divisible by 2...
        for (var x in project){
          if(project[x]['tag'].includes('Organizational')){
            if (organizationalNumber%2 == 0){

    // appends imageContainer to table tagContainer
              console.log(x);
              $('.tagContainer').append(
                '<tr class="last">'+
                  '<td class= "projectContainer">'+
                    '<div class= "imageContainer">'+
                        '<img src="Icons/book.jpg" class= "projectImage">' +
                        '</img>' +
                    '</div>'+

    // displays project's projectContent...
                      '<div class="projectContent">' +
                        '<p class="Title">' +
                          '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                           project[x]['title'] +
                           '</a>'+
                         '</p>'+
                        '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                        '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                        '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                        '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                        '<p class="Tag">' + project[x]['tag'] + '</p>'+
                      '</div>'+
                  '</td>'
                );
               }

    // same as above. Allows cpu to add one cell at a time
               else{
                 $('.last:last-child').append(
                   '<td class= "projectContainer">'+
                     '<div class= "imageContainer">'+
                         '<img src="Icons/book.jpg" class= "projectImage">' +
                         '</img>' +
                       '</div>'+
                       '<div class="projectContent">' +
                         '<p class="Title">' +
                           '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                            project[x]['title'] +
                            '</a>'+
                          '</p>'+
                           '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                           '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                           '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                           '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                           '<p class="Tag">' + project[x]['tag'] + '</p>'+
                       '</div>'+
                   '</td>'+
                  '</tr>'

                 );
               }
               organizationalNumber++;
             }
          }
        });
      });

      $(function(){
        $('#philanthropy').click(function(){
          $('#projectsContainer').empty();
          $('#projectsContainer').append(
          '<table class="tagContainer"></table>');

      // tracks number of projects
          var philanthropyNumber = 0;

      // if tag is art and total art projects are divisible by 2...
          for (var x in project){
            if(project[x]['tag'].includes('Philanthropy')){
              console.log(x);
              if (philanthropyNumber%2 == 0){

      // appends imageContainer to table tagContainer
                $('.tagContainer').append(
                  '<tr class="last">'+
                    '<td class= "projectContainer">'+
                      '<div class= "imageContainer">'+
                          '<img src="Icons/book.jpg" class= "projectImage">' +
                          '</img>' +
                      '</div>'+

      // displays project's projectContent...
                        '<div class="projectContent">' +
                          '<p class="Title">' +
                            '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                             project[x]['title'] +
                             '</a>'+
                           '</p>'+
                          '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                          '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                          '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                          '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                          '<p class="Tag">' + project[x]['tag'] + '</p>'+
                        '</div>'+
                    '</td>'
                  );
                 }

      // same as above. Allows cpu to add one cell at a time
                 else{
                   $('.last:last-child').append(
                     '<td class= "projectContainer">'+
                       '<div class= "imageContainer">'+
                           '<img src="Icons/book.jpg" class= "projectImage">' +
                           '</img>' +
                         '</div>'+
                         '<div class="projectContent">' +
                           '<p class="Title">' +
                             '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                              project[x]['title'] +
                              '</a>'+
                            '</p>'+
                             '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                             '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                             '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                             '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                             '<p class="Tag">' + project[x]['tag'] + '</p>'+
                         '</div>'+
                     '</td>'+
                    '</tr>'

                   );
                 }
                 philanthropyNumber++;
               }
            }
          });
        });

// technology

        $(function(){
          $('#tech').click(function(){
            $('#projectsContainer').empty();
            $('#projectsContainer').append(
            '<table class="tagContainer"></table>');

        // tracks number of projects
            var techNumber = 0;

        // if tag is art and total art projects are divisible by 2...
            for (var x in project){
              if(project[x]['tag'].includes('Technology')){
                if (techNumber%2 == 0){

        // appends imageContainer to table tagContainer
                  console.log(x);
                  $('.tagContainer').append(
                    '<tr class="last">'+
                      '<td class= "projectContainer">'+
                        '<div class= "imageContainer">'+
                            '<img src="Icons/book.jpg" class= "projectImage">' +
                            '</img>' +
                        '</div>'+

        // displays project's projectContent...
                          '<div class="projectContent">' +
                            '<p class="Title">' +
                              '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                               project[x]['title'] +
                               '</a>'+
                             '</p>'+
                            '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                            '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                            '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                            '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                            '<p class="Tag">' + project[x]['tag'] + '</p>'+
                          '</div>'+
                      '</td>'
                    );
                   }

        // same as above. Allows cpu to add one cell at a time
                   else{
                     $('.last:last-child').append(
                       '<td class= "projectContainer">'+
                         '<div class= "imageContainer">'+
                             '<img src="Icons/book.jpg" class= "projectImage">' +
                             '</img>' +
                           '</div>'+
                           '<div class="projectContent">' +
                             '<p class="Title">' +
                               '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                                project[x]['title'] +
                                '</a>'+
                              '</p>'+
                               '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                               '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                               '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                               '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                               '<p class="Tag">' + project[x]['tag'] + '</p>'+
                           '</div>'+
                       '</td>'+
                      '</tr>'

                     );
                   }
                   techNumber++;
                 }
              }
            });
          });

// all

  $(function(){
    $('#all').click(function(){
      $('#projectsContainer').empty();
      $('#projectsContainer').append(
      '<table class="tagContainer"></table>');

  // tracks number of projects
      var allNumber = 0;

  // if tag is art and total art projects are divisible by 2...
      for (var x in project){
        if(project[x]['tag'].includes('Art') || project[x]['tag'].includes('Entrepreneurship') || project[x]['tag'].includes('Organizational') || project[x]['tag'].includes('Philanthropy') || project[x]['tag'].includes('Technology') ){
          if (allNumber%2 == 0){

  // appends imageContainer to table tagContainer
            console.log(x);
            $('.tagContainer').append(
              '<tr class="last">'+
                '<td class= "projectContainer">'+
                  '<div class= "imageContainer">'+
                      '<img src="Icons/book.jpg" class= "projectImage">' +
                      '</img>' +
                  '</div>'+

  // displays project's projectContent...
                    '<div class="projectContent">' +
                      '<p class="Title">' +
                        '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                         project[x]['title'] +
                         '</a>'+
                       '</p>'+
                      '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                      '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                      '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                      '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                      '<p class="Tag">' + project[x]['tag'] + '</p>'+
                    '</div>'+
                '</td>'
              );
             }

  // same as above. Allows cpu to add one cell at a time
             else{
               $('.last:last-child').append(
                 '<td class= "projectContainer">'+
                   '<div class= "imageContainer">'+
                       '<img src="Icons/book.jpg" class= "projectImage">' +
                       '</img>' +
                     '</div>'+
                     '<div class="projectContent">' +
                       '<p class="Title">' +
                         '<a href='+ "http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=" + x + ">" +
                          project[x]['title'] +
                          '</a>'+
                        '</p>'+
                         '<p class="Owner">' + 'By  ' + project[x]['name'] + '</p>'+
                         '<p class="Members">' + 'Members:  ' + '0' + '</p>'+
                         '<p class="Location">' + 'Location:  ' + project[x]['location'] + '</p>'+
                         '<p class="Availability">' + 'Availability: ' + project[x]['availability'] + '</p>'+
                         '<p class="Tag">' + project[x]['tag'] + '</p>'+
                     '</div>'+
                 '</td>'+
                '</tr>'

               );
             }
             allNumber++;
           }
        }
      });
    });


    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser.email)
        console.log('firebase user is logged in')
        //console.log(database.ref('users').orderByChild("email").equalTo(firebaseUser.email).child('1'))
        const rootRef = database.ref('users').orderByChild("email").equalTo(firebaseUser.email).once("value", function(currentUser){
          currentUserValue = currentUser.val();
          userKey = Object.keys(currentUserValue)[0]
          oneRef = currentUserValue[userKey]['name']
          twoRef = currentUserValue[userKey]['connections'].length-1
          threeRef = currentUserValue[userKey]['follows']
          followedProjectNum()
          leftPanel()
        });

          trendingProjects()

      } else{
        console.log('not logged in')
        window.location.href = ('http://swipe.riverdale.edu/link/LINK/signIn/signIn.html')
      }
    });

    // function searchBar(){
      // $(function(){
      //   $('#search').on('change', function(){
      //     console.log($('#search').val())
      //     // if ($('#search').val() !== null)
      //     $('#search').append(
      //       "<div id='searchContainer'></div>"
      //       );
      //     });
      //
      // });

    // }

      function trendingProjects(){
        // draws trending projects
        $('#body').append(
        "<div id='rightPanel'>"+
          "<h3> Trending... </h3>"+
          "<div id='trendingContainer'>"+
            "<table id='trendingTable'>"+
            "</table>"+
          "</div>"+
        "</div>" );

        // this makes the trending project panel
        // queries the database to find 5 projects with largest follower counts
        const rootRefTwo = database.ref('projects').orderByChild("followerCount").limitToLast(5).once("value", function(snapshot){
          var trendingProjects = snapshot.val()
          var numProjectResults = 0;
          var numProjectResultsString;
          var id
          console.log(trendingProjects)
          for (var x in trendingProjects){

              $('#trendingTable').append(
                "<div class='trendingList'>"+
                  "<a href = "+ 'http://swipe.riverdale.edu/link/LINK/viewProject/viewProject.html?key=' + x +">"+
                    "<li>"+trendingProjects[x]['title']+ "</li>"+
                  "</a>"+
                  "<p id='trendingOwner'> By "+ trendingProjects[x]['name']+ "</p>"+
                  "<p>" + trendingProjects[x]['description'] + "</p>"+
                "</div>"
              );
            }

        });

      }

    function followedProjectNum(){
      if (threeRef == undefined){
        threeRef = 0;
      } else{
        // threeRef is a dictionary, so getting length of dictionary
        threeRef = Object.keys(currentUserValue[userKey]['follows']).length;
      }
    }

    function leftPanel(){
      myLink = "http://swipe.riverdale.edu/link/LINK/Profile/profile.html?key=" +userKey
            $("#body").append(
            "<div id='leftPanel'>"+
                "<div id= 'profilePic'>"+
                "</div>"+

              "<div id='info'>"+
                "<p id='name'> <b>"+
                    oneRef +
                 "</b></p>" +
                "<p>"+
                "</p> <br/> <hr/>" +

                "<div id='connects' class='infoStyle'>"+
                  "<p> <b>Connections</b></p>"+
                  "<p>"+
                   twoRef+
                   "</p>"+
                "</div>"+

                "<div id='followed' class='infoStyle'>"+
                  "<p><b>Followed Projects</b></p>"+
                  "  <p>"+
                    threeRef+
                   "</p>"+
              "  </div>"+

                "<div id='History' class='infoStyle'>"+
                  "<p> <b> History </b> </p>"+
                "</div>"+
              "</div>"+
            "</div>");
            // adding link later because timing was funky
            $('#profilePic').wrap("<a href="+myLink+"></a>");
            $('#name').wrap("<a class='link' href="+myLink+"></a>");
    }
