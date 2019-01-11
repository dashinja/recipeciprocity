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
// - Submit recipe button:  newRecipeBtn
// Recipe Page:
// Card: newRecipe 

var config = {
    apiKey: "AIzaSyDDO32RIhsljwPbk3zu5WSBN2WEmEkKNF8",
    authDomain: "recipeciprocity.firebaseapp.com",
    databaseURL: "https://recipeciprocity.firebaseio.com",
    projectId: "recipeciprocity",
    storageBucket: "recipeciprocity.appspot.com",
    messagingSenderId: "816681104299"
};
firebase.initializeApp(config);

// Event listener for search button element
$("#searchBtn").on("click", function () {
    
    var schIngred = $("#searchIngredients").val().trim().toLowerCase();

    // clear the searchbox
    $("#searchIngredients").val("");
    
    // Construct a URL to search edamam for recipes with ingredient searched for
    
    var queryURL = "https://api.edamam.com/search?q=" + schIngred
        + "&app_id=1049264d&app_key=ec17d36aa8ef8192fe452b8e3fa1ce52";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

        });
});


$("#newRecipebtn").on("click", function (event) {
    event.preventDefault();

    var rTitle = $("#title-input").val().trim();
    var ingred = $("#ingredients-input").val().trim();
    // var img = $("#newImage").val().trim();
    var dir = $("#directions-input").val().trim();
    var notes = $("#notes-input").val().trim();
    var recDate = moment().format('LLL');

    // Create local temp object
    var newRecipe = {
        Title: rTitle,
        Ingredients: ingred,
        Directions: dir,
        Notes: notes,
        SubDate: recDate
    };

    // Uploads recipe data to firebase
    database.ref().push(newRecipe);

    // Clear all text-boxes
    $("#title-input").val("");
    $("#ingredients-input").val("");
    // $("#newImage").val("");
    $("#directions-input").val("");
    $("#notes-input").val("");

});

// when a child is added to firebase, retrieve the info
database.ref().on("child_added", function (childSnap) {


    // Convenience variables
    var recTitle = childSnap.val().Title;
    var recIngred = childSnap.val().Ingredients;
    var recDirec = childSnap.val().Directions;
    var recNotes = childSnap.val().Notes;
    var rec_date = childSnap.val().SubDate;
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

