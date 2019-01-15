$(document).ready(function() {
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

  var recLimit = 10;

  function showMore() {
    $('#newRecipe').empty();

    recLimit += 10;

    database
      .ref()
      .limitToLast(recLimit)
      .on('child_added', function(childSnap) {
        var recTitle = childSnap.val().Title;
        var recIngred = childSnap.val().Ingredients;
        var recDirec = childSnap.val().Directions;
        var recNotes = childSnap.val().Notes;
        // timestamp is converted from unix to browser local time
        var rec_date = moment(childSnap.val().SubDate).format('LLL');
        var recUser = childSnap.val().User;
        var recKey = childSnap.key;
        let recNum = childSnap.val().Num;

        //Show notes content or Show N/A
        let conditionalText = function() {
          if (recNotes === '') {
            recNotes = 'N/A';
            return recNotes;
          } else {
            return recNotes;
          }
        };

        let newRec = $('#newRecipe');
        let recipeCard = $(`
    <div class="card card-identity text-center mt-5">
      <div class="card-header title">
        <!--Title-->
          <h1 class="display-4 title-text">
            ${recTitle}
          </h1>
        </div>
        <div class="card-body w-50 mx-auto">
        <!--Ingredients-->
          <h3 class="card-ingredients ingredients font-weight-bold mb-1">Ingredients:</h3>
          <p class="mt-2 mb-3 ingredients-text" id="ingredients-shown">${recIngred}</p>
        <!--Directions-->
        <div class="direction-container">
          <h3 class="card-directions directions font-weight-bold mb-1 mt-4">Directions:</h3>
          <p class="mt-2 mb-3 directions-text" id="directions-shown">${recDirec}</p>
        </div>
        <!--Notes-->
          <h3 class="card-title notes font-weight-bold mb-1 mt-4">Notes:</h3>
          <p class="mt-2 mb-3 notes-text" id="notes-shown">${conditionalText()}</p>
        <!--Username-->
          <h3 class="card-title username font-weight-bold mb-1 mt-4">Posted by:</h3>
          <p class="mt-2 mb-3 username-text" id="username-shown">${recUser}</p>
          <!--Talking Button-->
          <a href="#" class="btn btn-primary mt-0 btn-voice" id="readText" data-num="${recNum}" data-key="${recKey}" data-title="${recTitle}" data-ingredients="${recIngred}" data-directions="${recDirec}" data-notes="${recNotes}" data-username="${recUser}">Speak Directions</a>
        </div>
        <div class="card-footer text-muted">${rec_date}</div>
      </div>
    </div>
    `);
        newRec.prepend(recipeCard);
      });
  }

  $('#btn-more').on('click', showMore);

  database
    .ref()
    .limitToLast(recLimit)
    .on('child_added', function(childSnap) {
      var recTitle = childSnap.val().Title;
      var recIngred = childSnap.val().Ingredients;
      var recDirec = childSnap.val().Directions;
      var recNotes = childSnap.val().Notes;
      // timestamp is converted from unix to browser local time
      var rec_date = moment(childSnap.val().SubDate).format('LLL');
      var recUser = childSnap.val().User;
      var recKey = childSnap.key;
      let recNum = childSnap.val().Num;

      //Show notes content or Show N/A
      let conditionalText = function() {
        if (recNotes === '') {
          recNotes = 'N/A';
          return recNotes;
        } else {
          return recNotes;
        }
      };

      let newRec = $('#newRecipe');
      let recipeCard = $(`
    <div class="card card-identity text-center mt-5">
      <div class="card-header title">
        <!--Title-->
          <h1 class="display-4 title-text">
            ${recTitle}
          </h1>
        </div>
        <div class="card-body w-50 mx-auto">
        <!--Ingredients-->
          <h3 class="card-ingredients ingredients font-weight-bold mb-1">Ingredients:</h3>
          <p class="mt-2 mb-3 ingredients-text" id="ingredients-shown">${recIngred}</p>
        <!--Directions-->
        <div class="direction-container">
          <h3 class="card-directions directions font-weight-bold mb-1 mt-4">Directions:</h3>
          <p class="mt-2 mb-3 directions-text" id="directions-shown">${recDirec}</p>
        </div>
        <!--Notes-->
          <h3 class="card-title notes font-weight-bold mb-1 mt-4">Notes:</h3>
          <p class="mt-2 mb-3 notes-text" id="notes-shown">${conditionalText()}</p>
        <!--Username-->
          <h3 class="card-title username font-weight-bold mb-1 mt-4">Posted by:</h3>
          <p class="mt-2 mb-3 username-text" id="username-shown">${recUser}</p>
          <!--Talking Button-->
          <a href="#" class="btn btn-primary mt-0 btn-voice" id="readText" data-num="${recNum}" data-key="${recKey}" data-title="${recTitle}" data-ingredients="${recIngred}" data-directions="${recDirec}" data-notes="${recNotes}" data-username="${recUser}">Speak Directions</a>
        </div>
        <div class="card-footer text-muted">${rec_date}</div>
      </div>
    </div>
    `);

      newRec.prepend(recipeCard);
    });

  //Responsive Voice Section
  let speak = {
    and: function(text) {
      responsiveVoice.speak(text);
    }
  };

  $('.card-holder').on('click', '.btn-voice', function(event) {
    event.preventDefault();
    let sayTitle = $(this).attr('data-title');
    let sayIngred = $(this).attr('data-ingredients');
    let sayDirec = $(this).attr('data-directions');
    let sayNotes = $(this).attr('data-notes');
    let sayUser = $(this).attr('data-username');

    speak.and(sayTitle);
    speak.and(sayIngred);
    speak.and(sayDirec);

    function conditionalNote() {
      if (sayNotes === 'N/A') {
        speak.and('Nothing further to note! Enjoy!');
        return;
      } else {
        return speak.and(sayNotes);
      }
    }
    conditionalNote();
    speak.and(`Posted for you by ${sayUser}`);
  });

  // Edamam Search (index page)
  $('#schEda').on('click keypress', function(e) {
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
    }).then(function(response) {
      var results = response.hits;

      for (let j = 0; j < results.length; j++) {
        var recDiv = $('<div>');
        recDiv.addClass('col-md m-1');
        var p = $('<span>').text(results[j].recipe.label);
        p.addClass('text-center d-block mx-auto');
        recImage = $('<img>');
        recImage.attr('src', results[j].recipe.image);
        recImage.attr('data-link', results[j].recipe.shareAs);
        recImage.addClass('rounded mx-auto d-block');
        recDiv.append(recImage);
        recDiv.append('<br>');
        recDiv.append(p);
        recDiv.append($('<br><br>'));
        var searchRes = $('.schRes');
        searchRes.addClass('mt-5 mx-auto py-3 border');

        $('.schRes').append(recDiv);
      }
    });
  });

  $('input#searchEdamam-input').on('keypress', function(e) {
    if (e.which === 13) {
      $('#schEda').trigger('click');
    }
  });

  $('.schRes').on('click', 'img', function() {
    window.open($(this).attr('data-link'));
  });

  // Owl Carousel (not bootstrap)

  let genericRecipeSearch = [
    'chicken',
    'asparagus',
    'crepes',
    'churros',
    'tilapia',
    'cholate chip cookies',
    'meatloaf',
    'steak',
    'salad',
    'appetizer'
  ];
  let randomizer = Math.floor(Math.random() * 3 + 1);
  let randomSearchChoice = genericRecipeSearch[randomizer];

  function populateCarousel() {
    var queryURL =
      'https://api.edamam.com/search?q=' +
      randomSearchChoice +
      '&app_id=1049264d&app_key=ec17d36aa8ef8192fe452b8e3fa1ce52&from=0&to=11';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      var results = response.hits;

      function normalizeTextbyWord(text) {
        if (text.length > 25) {
          let normalizer = `${text.substring(0, 20)}`;
          let normalized = normalizer.substring(
            0,
            Math.min(normalizer.length, normalizer.lastIndexOf(' '))
          );
          return `${normalized}...`;
        } else {
          return text;
        }
      }

      for (let i = 0; i < results.length; i++) {
        $(`[data-num=${i}]`).attr('src', results[i].recipe.image);
        $(`[data-num=${i}]`).attr('data-link', results[i].recipe.shareAs);
        $(`[data-num=${i}]`).attr('alt', results[i].recipe.label);
        $(`[data-title=${i}]`)
          .addClass('text-center d-block mx-auto')
          .text(normalizeTextbyWord(results[i].recipe.label));
      }
    });
  }

  populateCarousel();

  function carouselClick() {
    window.open($(this).attr('data-link'));
  }

  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 4000,
    // autoplayHoverPause: true
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        loop: true
      }
    }
  });

  $('.play').on('click', function() {
    owl.trigger('play.owl.autoplay', [4000]);
  });
  $('.stop').on('click', function() {
    owl.trigger('stop.owl.autoplay');
  });

  $('.owl-carousel').on('click', '.owl-image', carouselClick);
});
