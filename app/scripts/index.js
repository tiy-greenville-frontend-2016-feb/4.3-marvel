var $ = require('jquery');
var handlebars = require('handlebars');

var apiKey = 'ts=1&hash=21bd2e1b96821f4b508e0dd04ba254bd&apikey=809f574f31a7e23a17adc1f6a3631a58';
var url = 'http://gateway.marvel.com/v1/public/characters?' + apiKey;
$.ajax(url).then(start);

function start(data){
  displayCharacters(data);
  //other stuff with data
}

function displayCharacters(data){
  var characters = data.data.results;
  characters.forEach(displayCharacter);
}

function displayCharacter(character){
  var source = $('#character-template').html();
  var template = handlebars.compile(source);
  var $characterHtml = $(template(character));

  $characterHtml.find('.js-display-comics').on('click', function(){
    fetchComics(character);
  });

  $('.characters').append($characterHtml);
}

function fetchComics(character){
  var comicUrl = character.comics.collectionURI + '?' + apiKey;
  $.ajax(comicUrl).then(displayComics);
}

function displayComics(comicResults){
  var $modal = $('.js-modal');
  var source = $('#comic-template').html();
  var template = handlebars.compile(source);

  // Configure a friendly context object
  var context = {
    'comics': comicResults.data.results,
    'count': comicResults.data.count
  }
  
  // Insert comics into modal
  $modal.find('.js-modal-content').html(template(context));

  // Show Modal
  $modal.addClass('is-active');
}
