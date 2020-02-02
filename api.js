var api_key = '43f9f3c9828f30fa5e2f6f6a7b11b83e';

function getGenres(){  
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=en-US')
  .then(response => {
    return response.json();
  })
  .then(data => {
    var genres = data.genres;
    var results = [];
    for(i in data.genres){
        results.push(genres[i].name);
        console.log(genres[i].name)
    }
    return results;
  })
  .catch(err => {
    // Do something for an error here
  })
}  
function getGenres(){  
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=en-US')
    .then(response => {
      return response.json();
    })
    .then(data => {
      var genres = data.genres;
      var results = [];
      for(i in data.genres){
          results.push(genres[i].name);
          console.log(genres[i].name)
      }
      return results;
    })
    .catch(err => {
      // Do something for an error here
    })
  }  