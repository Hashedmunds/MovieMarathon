var api_key = '43f9f3c9828f30fa5e2f6f6a7b11b83e';

'use strict';
// Abandon all hope ye who enter here
$(document).ready(function() {
  
  var navigating = false,
      curPage = 1,
      pages = $(".section").length,
      $sections = $(".sections"),
      $paginationPage = $(".pagination .page"),
      $paginationTotal = $(".total-pages"),
      $textStuff = $(".section-heading, .additional-text,.content2");
  
  if (pages >= 10) {
    $paginationTotal.text(pages);
  } else {
    $paginationTotal.text("0" + pages);
  }
  
  /*
  Sets random transition-delay for blocks between 0.4 and 1.2 seconds on every call
  */
  function randomDelay() {
    $(".left-part").css("transition-delay", (Math.floor(Math.random() * 9) + 4)/10 + "s");
    for (var i = 1; i <= pages; i++) {
      $(".bg-part:nth-child("+i+")").css("transition-delay", (Math.floor(Math.random() * 9) + 4)/10 + "s");
    }
  }
  
  /* Async hell, with hardcoded numbers.
  On production, 410 number must be .section-heading transform transition time in miliseconds + 10, but i'm sort of tired of this demo :D
  */
  function timeoutNav(t) {
    var time = t || 2000;
    $textStuff.addClass("not-visible");
    setTimeout(function() {
      navigating = false;
      randomDelay();
    }, time);
    setTimeout(function() {
      // cached selector not working because of newely created clone when moving up more then 2 positions
      $(".section-heading, .additional-text, .content2").css({"margin-top": 0 - (parseInt($(".nav-elem.active").attr("data-page")) - 1) * 100 + "vh"}).hide();
    }, 410);
    setTimeout(function() {
      $textStuff.show();
      $textStuff.css("top");
      $textStuff.removeClass("not-visible");
    }, time + 10);
  }
  
  function magicStuff(paramPage) {
    if (paramPage) curPage = paramPage;
    navigating = true;
    var calculatedMargin = 0 - (curPage - 1) * 100;
    $(".bg-part, .left-part").css("margin-top", calculatedMargin +"vh");
    $(".scroll-down").addClass("removed");
    if (parseInt($(".nav-elem.active").attr("data-page")) === 1) {
      $(".scroll-down").removeClass("removed");
    }
  }
  
  function trickyStuff(page) {
    $(".left-part, .bg-part").css({"transition-duration": "0s", "transition-delay": "0s"});
    $(".main").css("top");
    magicStuff(page);
    $(".main").css("top");
    $(".left-part, .bg-part").css("transition-duration", "0.8s");
    randomDelay();
  }
  
  function pagination(pg) {
    $(".nav-elem").removeClass("active");
    $(".nav-" + pg).addClass("active");
    curPage = pg;
    
    if (pages >= 10) {
      $paginationPage.text(pg);
    } else {
      $paginationPage.text("0" + pg);
    }
  }
  
  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage);
      magicStuff();
      timeoutNav();
    }
  }
  
  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
      magicStuff();
      timeoutNav();
    }
  }

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

  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (!navigating) {
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else { 
        navigateDown();
      }
    }
  });

  $('#goBtn').on('click', function(e) {
    e.preventDefault();
    navigateDown();
  });
  
  $(document).on("mousewheel DOMMouseScroll",
                 ".sidebar-hover, .sidebar-real",
                 function(e) {
    e.stopPropagation();
  });
  
  var sidebarScroll = 0,
      $navEl =  $(".nav-elem"),
      $sidebar = $(".sidebar-real"),
      maxScroll = $navEl.length * $navEl.height() - $(window).height();
  
  $(document).on("mousewheel DOMMouseScroll", ".sidebar-real", function(e) {
    if (navigating) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      if (!sidebarScroll) return;
      sidebarScroll += 100;
      if (sidebarScroll > 0) sidebarScroll = 0;
    } else { 
      if (Math.abs(sidebarScroll) === maxScroll) return;
      sidebarScroll -= 100;
      if (Math.abs(sidebarScroll) > maxScroll) sidebarScroll = 0 - maxScroll;
    }
    $sidebar.css("transform", "translateY("+ sidebarScroll +"px)");
  });
  
  $(document).on("click", ".nav-elem:not(.active)", function() {
    if (navigating) return;
    var activePage = parseInt($(".nav-elem.active").attr("data-page"), 10),
        futurePage = $(this).attr("data-page");
    
    pagination(futurePage);
    
    if (Math.abs(activePage - futurePage) > 2) {
      var $fakePage = $(".section-" + futurePage).clone(),
          $currentPage = $(".section-" + activePage),
          fakeNumber = 0;
      // ugly code, do not enter here
      if (activePage < futurePage) {
        // moving down
        $currentPage.after($fakePage);
        fakeNumber = activePage + 1;
        $(".main").css("top");
        randomDelay();
        magicStuff(fakeNumber);
      } else {
        // moving up (real hell)
        $currentPage.before($fakePage);
        fakeNumber = activePage - 1;
        trickyStuff(activePage + 1);
        $(".main").css("top");
        randomDelay();
        $(".main").css("top");
        magicStuff(activePage);
      }
      timeoutNav(2050);
      setTimeout(function() {
        $fakePage.remove();
        trickyStuff(futurePage);
      }, 2000);
    } else {
      magicStuff(futurePage);
      timeoutNav();
    }
  });
  
  $(window).resize(function() {
    maxScroll = $navEl.length * $navEl.height() - $(window).height();
    $sidebar.css("transform", "translateY(0)");
  });
  
});