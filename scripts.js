var api_key = '43f9f3c9828f30fa5e2f6f6a7b11b83e';


$(document).ready(function() {

  // initial setup
  // $('form').css('display', 'none');

  // possible selections of types of marathons
  // TODO: decide whether you want to keep or delete
  let typeMarathon = ['Genre', 'Actor', 'Year Released', 'Foreign Top Charts'];
  let $typeMarathonDropdown = $('.firstMenu select');
  $.each(typeMarathon, function() {
    let $option = $('<option></option>');
    $option.val(this);
    $option.text(this);
    $typeMarathonDropdown.append($option);
  })

  //Populate Genres
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=en-US')
  .then(response => {
    return response.json();
  })
  .then(data => {
    var genres = data.genres;
    let $typeGenreDropdown = $('.secondMenu select');
    for(i in data.genres){
      let $option = $('<option></option>');
      $option.val(genres[i].name);
      $option.text(genres[i].name);
      $typeGenreDropdown.append($option);
    }
  })


  // populates the options for user to select
  // TODO: put all the names of the genres
  // TODO: need to fetch this list from endpoint: GET /genre/movie/list
  // https://developers.themoviedb.org/3/genres/get-movie-list
  // TODO: create the dropdown in same way as above
  // let genreOptions = [];

  // when form for initial selection of type of event submits
  // $('.firstMenu').submit()

  // when form gets submitted, you get it in here
  $('.secondMenu').submit(function(event) {
    event.preventDefault(); // DO NOT DELETE
  });
});
