var $ = require('jquery');
var handlebars = require('handlebars');

var url = 'http://gateway.marvel.com/v1/public/characters?ts=1&hash=21bd2e1b96821f4b508e0dd04ba254bd&apikey=809f574f31a7e23a17adc1f6a3631a58';
var results = $.ajax(url).then(start);

function start(data){
  console.log(data);

  displayCharacters(data);
  //other stuff
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
    console.log('button clicked');
  });

  $('.characters').append($characterHtml);
}
