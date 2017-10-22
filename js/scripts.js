$(function() {
  //speech recognition
  $('#mic').click(function() {
    let lang = navigator.language || 'en-US'; //grab language from browser or set to english
    var speechRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
    speechRec.onResult = showResult; // bind callback function to trigger when speech is recognized
    speechRec.onError = showError; // bind callback function to trigger when speech is not recognized
    speechRec.start(); // start listening
    speechRec.rec.lang = lang; //set language

    setTimeout(function() { //show recording after .9 seconds
      sound.play();
      $('i').addClass('recording');
    }, 900);

    function showResult() {
      let text = speechValidate(speechRec.resultString); //validate speech
      $('input').val(text); //add result to text
      $('i').removeClass('recording'); //remove recording animation
      sound.play();
      $('form').submit(); //submit form
    }

    function showError() {
      $('input').val("Oops.. try that again"); //display error in input field
      $('i').removeClass('recording'); //remove recording animation
    }
  });

  //form submit
  $('form').submit(function(e) {
    e.preventDefault();

    let colorNoHash = $('input').val();
    let hexcode = "#" + $('input').val();
    let complementary = invertColor(colorNoHash);

    //get color name
    $.ajax({
        type: "GET",
        url: 'http://thecolorapi.com/id?hex='+ colorNoHash,
        async:true,
        dataType : 'jsonp',
        crossDomain:true,
        success: function(data, status, xhr) {
          $('span').text(data.name.value);
        }
    });

    //change main colors
    $('body').css('background-color', hexcode);
    $('*').css('color', complementary);
    $('*').css('border-color', complementary);

    //change text
    $('.complementary-text').text(complementary);

    //change result colors
    $('.complementary-text').css('color', complementary);
    $('.inner-complementary').css('background-color', complementary);
  });

});
