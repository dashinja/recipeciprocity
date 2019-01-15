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
let recipeNum = 0;

$('.submitResponse#submitSuccess').fadeToggle();

$('#newRecipeBtn').on('click', function(event) {
  event.preventDefault();

  recipeNum += 10;

  var rTitle = $('#title-input')
    .val()
    .trim();
  var ingred = $('#ingredients-input')
    .val()
    .trim();
  var dir = $('#directions-input')
    .val()
    .trim();
  var notes = $('#notes-input')
    .val()
    .trim();
  var user = $('#username-input')
    .val()
    .trim();
  var email = $('#email-input')
    .val()
    .trim();
  var recDate = Date.now().valueOf();

  var newRecipe = {
    Title: rTitle,
    Ingredients: ingred,
    Directions: dir,
    Notes: notes,
    SubDate: recDate,
    User: user,
    Email: email,
    Key: database.ref().key,
    Num: recipeNum
  };

  database.ref().push(newRecipe);

  // Clear all text-boxes
  $('#title-input').val('');
  $('#ingredients-input').val('');
  $('#directions-input').val('');
  $('#notes-input').val('');
  $('#username-input').val('');
  $('#email-input').val('');

  // Confirm User Submission
  $('.submitResponse#submitSuccess').fadeToggle();
});

// Form Validation Activator
$.validate({
  modules: 'toggleDisabled',
  disabledFormFilter: 'form.toggle-disabled',
  showErrorDialogs: false,
  validateOnBlur: true
});
