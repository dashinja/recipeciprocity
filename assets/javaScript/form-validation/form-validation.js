var config = {
  apiKey: 'AIzaSyDDO32RIhsljwPbk3zu5WSBN2WEmEkKNF8',
  authDomain: 'recipeciprocity.firebaseapp.com',
  databaseURL: 'https://recipeciprocity.firebaseio.com',
  projectId: 'recipeciprocity',
  storageBucket: 'recipeciprocity.appspot.com',
  messagingSenderId: '816681104299'
};
firebase.initializeApp(config);

var database = firebase.database();

// when a child is added to firebase, retrieve the info
database.ref().on('child_added', function (childSnap) {
  // Convenience variables
  var recTitle = childSnap.val().Title;
  var recIngred = childSnap.val().Ingredients;
  var recDirec = childSnap.val().Directions;
  var recNotes = childSnap.val().Notes;
  var rec_date = childSnap.val().SubDate;
  var recUser = childSnap.val().User;
  var recEmail = childSnap.val().Email;
  // var newRec
  // // Create the new Recipe card
  // // newRec = $("<tr>").append(
  // //     $("<td>").text(recTitle),
  // //     $("<td>").text(recIngred),
  // //     $("<td>").text(recDirec),
  // //     $("<td>").text(recNotes),
  // // );

  // $("#newRecipe").append(newRec);
});

$('#newRecipeBtn').on('click', function (event) {
  event.preventDefault();

  var rTitle = $('#title-input')
    .val()
    .trim();
  var ingred = $('#ingredients-input')
    .val()
    .trim();
  // var img = $("#newImage").val().trim();
  var dir = $('#directions-input')
    .val()
    .trim();
  var notes = $('#notes-input')
    .val()
    .trim();
  var recDate = moment().format('LLL');

  var user = $('#username-input')
    .val()
    .trim();

  var email = $('#email-input')
    .val()
    .trim();

  // Create local temp object
  var newRecipe = {
    Title: rTitle,
    Ingredients: ingred,
    Directions: dir,
    Notes: notes,
    SubDate: recDate,
    User: user,
    Email: email
  };

  // Uploads recipe data to firebase
  database.ref().push(newRecipe);

  // Clear all text-boxes
  $('#title-input').val('');
  $('#ingredients-input').val('');
  // $("#newImage").val("");
  $('#directions-input').val('');
  $('#notes-input').val('');
  $('#username-input').val('');
  $('#email-input').val('');
});

// on click listener for search button (index page)
$("#schEda").on("click", function () {
  var rand = Math.floor(Math.random() * 100) + 1;
  var randb = rand + 12;
  var schEdaIng = $("#searchEdamam-input").val().trim().toLowerCase();
  console.log(schEdaIng);
  $('#searchEdamam-input').val('');
  $(".schRes").empty();


  var queryURL = "https://api.edamam.com/search?q=" + schEdaIng + "&app_id=1049264d&app_key=ec17d36aa8ef8192fe452b8e3fa1ce52&from="
    + rand + "&to=" + randb;
  //  reserved for later use "&from=0&to=10"

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.hits;
      console.log(results);
      for (let j = 0; j < results.length; j++) {
        var recDiv = $("<div>");
        recDiv.addClass("col-lg col-lg-m-1");
        var p = $("<p>").text(results[j].recipe.label);
        recImage = $("<img>");
        recImage.attr("src", results[j].recipe.image);
        recImage.attr("data-link", results[j].recipe.shareAs);
        recDiv.append(recImage);
        recDiv.append(p);
        recDiv.append($("<br><br>"));
        $(".schRes").prepend(recDiv);
      }

    });
});


$(".schRes").on("click", "img", function () {
  window.open($(this).attr("data-link"));
});
// Form Validation Activator
// $.validate({
//   lang: 'en'
// });







        // for (let j = 0; j < results.length; j++) {
      //   var celebDiv = $("<div>");
      //   celebDiv.addClass("col-lg col-lg-m-1");
      //   var p = $("<p>").text("Rating: " + results[j].rating);
      //   celebImage = $("<img>");
      //   celebImage.attr("src", results[j].images.fixed_height_still.url);
      //   celebImage.attr("data-still", results[j].images.fixed_height_still.url);
      //   celebImage.attr("data-animate", results[j].images.fixed_height.url);
      //   celebImage.attr("data-state", "still");
      //   celebDiv.append(celebImage);
      //   celebDiv.append(p);
      //   $(".gif-tainer").prepend(celebDiv);
