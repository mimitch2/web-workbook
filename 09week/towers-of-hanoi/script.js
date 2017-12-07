'use strict';



$(document).ready(function() {
  var $block = null; //switch for grabbing or dropping block
  var $inPlay = 0; // holds the data-block # after picking up a block
  var $from = 1; // holds the data-stack # block came from
  var $clicks = 0; // counts how many clicks per game
  var rating; // for rating the win with emojis
  $('[data-stack]').click(function() {

    $("#announce-game-won").text(""); //clears any text
    if (!$block && $(this).children().length > 0) {
      $from = $(this).data('stack'); //records which stack it comes from
      $inPlay = $(this).children().last().data('block'); //records which block is in hand
      $block = $(this).children().last().detach(); //drops block
      // console.log($from); //debug only
    } else {

      if ($(this).children().length === 0) { //allows drop if empty
        $(this).append($block);
        if ($(this).children().length > 0){//don't run iterate if empty stack is clicked
        iterate();
      }

      } else { //allows drop if existing block is greater than the one in hand
        if ($(this).children().last().data('block') > $inPlay) {
          $(this).append($block);
          iterate();
          // console.log($inPlay); //debug only
        } else { //disallows dropping if existing block is bigger, and returns one in hand to original position
          $("#announce-game-won").text("NOPE!!");
          $(`[data-stack = ${$from}]`).append($block);
          $block = null;
        }
      }
      checkWin(); // check for a win each time
    }

  }); // close click function

  function loop() { // uses the setInterval method to flash winning text
    var flashing = $("#announce-game-won");
    setInterval(function() {
      flashing.toggleClass('blinking');
    }, 300);
  };

  function checkWin() { // run each turn to check for win
    if ($clicks < 17) { // sets up rating based on # of clicks
      rating = "👍";
    } else {
      if ($clicks >= 17 && $clicks <= 20) {
        rating = "🤨";
      } else {
        rating = "🤮";
      }
    }
    if ($('[data-stack=3]').children().length === 4) { //checks the 3rd stack for 4 blocks, if so annoucnes winner
      $("#announce-game-won").text("Winner with " + $clicks + " clicks!! " + rating);
      loop(); //runs the flashing text function
    };
  };

  function iterate() { //iterates click counter, updates click text and resets $block
    $clicks += 1;
    $('.click-counter').text("Clicks = " + $clicks)
    $block = null;
  }

  $('button').click(function() { // reloads page to reset game
    location.reload();
  });

}); //close document ready
