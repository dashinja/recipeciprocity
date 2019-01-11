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
    var recNotes = childSnap.val().Notes

    var newRec
    // Create the new Recipe card
    // newRec = $("<tr>").append(
    //     $("<td>").text(recTitle),
    //     $("<td>").text(recIngred),
    //     $("<td>").text(recDirec),
    //     $("<td>").text(recNotes),
    // );

    $("#newRecipe").append(newRec);
});
