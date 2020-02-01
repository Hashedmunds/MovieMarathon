$(document).ready(function() {
  // initial setup
  // $('form').css('display', 'none');

  // possible selections of types of marathons
  // TODO: decide whether you want to keep or delete
  // let typeMarathon = ['Genre', 'Actor', 'Year Released', 'Foreign Top Charts'];
  // let $typeMarathonDropdown = $('.firstMenu select');
  // $.each(typeMarathon, function() {
  //   let $option = $('<option></option>');
  //   $option.val(this);
  //   $typeMarathonDropdown.append($option);
  //
  // })

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

  // Get the elements with class="column"
  var elements = document.getElementsByClassName("column");

  // Declare a loop variable
  var i;

  // List View
  function listView() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "100%";
    }
  }

  // Grid View
  function gridView() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "50%";
    }
  }
});
