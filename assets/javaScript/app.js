// ID’s
// Home Page ID’s:
// - Recipe page button: (links in nav bar)
// - Recipe submission button: (links in nav bar)
// - Scrolling image box: scrollingImages
// - Search field:  searchIngredients
// - Search button: searchBtn

// Submit Form Page:
// - Title: title-input
// - Ingredients: ingredients-input
// - Directions: directions-input
// - Notes: notes-input
// - ***Image Upload: newImage
// - User Name: username-input
// - Email Address: email-input
// - Submit recipe button:  newRecipeBtn

// Recipe Page:
// Card: newRecipe

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
database.ref().on('child_added', function(childSnap) {
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

