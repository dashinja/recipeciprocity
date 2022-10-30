import utility from './utility'
import { genericRecipeSearchTerms } from './constants'

$(document).ready(function () {

  var config = {
    apiKey: 'AIzaSyDDO32RIhsljwPbk3zu5WSBN2WEmEkKNF8',
    authDomain: 'recipeciprocity.firebaseapp.com',
    databaseURL: 'https://recipeciprocity.firebaseio.com',
    projectId: 'recipeciprocity',
    storageBucket: 'recipeciprocity.appspot.com',
    messagingSenderId: '816681104299'
  }

  firebase.initializeApp(config)
  var database = firebase.database()

  var recLimit = 10

  $('#btn-more').on('click', utility.showMore)

  database
    .ref()
    .limitToLast(recLimit)
    .on('child_added', utility.addChild)

  $('.card-holder').on('click', '.btn-voice', utility.clickCard)

  // Edamam Search (index page)
  $('#schEda').on('click keypress', utility.executeSearch)

  $('input#searchEdamam-input').on('keypress', function (e) {
    if (e.which === 13) {
      $('#schEda').trigger('click')
    }
  })

  $('.schRes').on('click', 'img', function () {
    window.open($(this).attr('data-link'))
  })

  // Owl Carousel (not bootstrap)
  let randomizer = Math.floor(Math.random() * 3 + 1)
  let randomSearchChoice = genericRecipeSearchTerms[randomizer]

  populateCarousel(randomSearchChoice)

  function carouselClick() {
    window.open($(this).attr('data-link'))
  }

  var owl = $('.owl-carousel')
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
  })

  $('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [4000])
  })
  $('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
  })

  $('.owl-carousel').on('click', '.owl-image', carouselClick)
})
