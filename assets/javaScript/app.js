
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

  let newRec = $('#newRecipe');
  let recipeCard = $(`
  <div class="card text-center">
  <div class="card-header title">
  <!--Title-->
    <h1 class="display-4">
      ${recTitle}
    </h1>
  </div>
  <div class="card-body w-50 mx-auto">
  <!--Ingredients-->
    <h3 class="card-title ingredients font-weight-bold mb-1">Ingredients:</h3>
    <p class="mt-2 mb-3" id="ingredients-shown">${recIngred}</p>
  <!--Directions-->
  <div class="direction-container">
    <h3 class="card-title directions font-weight-bold mb-1 mt-4">Directions:</h3>
    <p class="mt-2 mb-3" id="directions-shown">${recDirec}</p>
  </div>
  <!--Notes-->
    <h3 class="card-title notes font-weight-bold mb-1 mt-4">Notes:</h3>
    <p class="mt-2 mb-3" id="notes-shown">${recNotes}</p>
  <!--Username-->
    <h3 class="card-title username font-weight-bold mb-1 mt-4">Posted by:</h3>
    <p class="mt-2 mb-3" id="username-shown">${recUser}</p>
    <!--Talking Button-->
    <a href="#" class="btn btn-primary mt-0 btn-voice" id="readText">Speak Directions</a>
  </div>
  <div class="card-footer text-muted mb-5">${rec_date}</div>
</div>
</div>
  `);

  newRec.prepend(recipeCard);
});

// Edamam Search
// on click listener for search button (index page)
$('#schEda').on('click', function () {
  var rand = Math.floor(Math.random() * 100) + 1;
  var randb = rand + 12;
  var schEdaIng = $('#searchEdamam-input')
    .val()
    .trim()
    .toLowerCase();

  $('#searchEdamam-input').val('');
  $('.schRes').empty();

  var queryURL =
    'https://api.edamam.com/search?q=' +
    schEdaIng +
    '&app_id=1049264d&app_key=ec17d36aa8ef8192fe452b8e3fa1ce52&from=' +
    rand +
    '&to=' +
    randb;


  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var results = response.hits;

    for (let j = 0; j < results.length; j++) {
      var recDiv = $('<div>');
      recDiv.addClass('col-lg col-lg-m-1');
      var p = $('<p>').text(results[j].recipe.label);
      recImage = $('<img>');
      recImage.attr('src', results[j].recipe.image);
      recImage.attr('data-link', results[j].recipe.shareAs);
      recImage.addClass('rounded');
      recDiv.append(recImage);
      recDiv.append(p);
      recDiv.append($('<br><br>'));
      $('.schRes').prepend(recDiv);
    }
  });
});

$('.schRes').on('click', 'img', function () {
  window.open($(this).attr('data-link'));
});

//carousel id= scrollingImages
// bootstrap says you can Call carousel manually with: $('.carousel').carousel()
