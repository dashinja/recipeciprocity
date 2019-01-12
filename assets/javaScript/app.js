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

  let newRec = $('#newRecipe');
  let recipeCard = $(`
  <div class="card text-center">
  <div class="card-header title">
  <!--Title-->
    <h1 class="display-4">
      ${recTitle}
    </h1>
  </div>
  <div class="card-body">
  <!--Ingredients-->
    <h3 class="card-title">Ingredients: ${recIngred}</h3>
    <!--directions-->
    <p class="card-text">
      Directions: ${recDirec}
    </p>
    <!--Notes-->
    <p class="card-text">
      Directions: ${recNotes}
    </p>
    <!--posted By-->
    <p class="card-text">
      User: ${recUser}
    </p>
    <!--Post Timestamp-->
    <p class="card-text">
      User: ${rec_date}
    </p>
    <a href="#" class="btn btn-primary mt-3 btn-voice" id="readText">Speak Directions</a>
  </div>
  <div class="card-footer text-muted">2 days ago</div>
</div>
</div>
  `);

  newRec.prepend(recipeCard);
});
