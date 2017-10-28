$(function() {

  //speech recognition
  $('#mic').click(function() {
    let lang = navigator.language || 'en-US'; //grab language from browser or set toenglish
    var speechRec = new p5.SpeechRec(); // speech recognition object (will prompt formic access)
    speechRec.onResult = showResult; // bind callback function to trigger when speechis recognized
    speechRec.onError = showError; // bind callback function to trigger when speechis not recognized
    speechRec.start(); // start listening
    speechRec.rec.lang = lang; //set language

    setTimeout(function() { //show mic is recording after .5 seconds
      $('i').addClass('recording');
    }, 500);

    function showResult() {
      let text = speechRec.resultString.replace(/[^a-z0-9]/gi, ''); //remove special charactors and spaces from speech
      $('input').val(text); //add result to text
      $('i').removeClass('recording'); //remove recording animation
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

    let color = tinycolor($('input').val().replace(/[^a-z0-9]/gi, '')); //remove special charactors and spaces;
    let hexcode = color.toHexString();
    let invert = invertColor(hexcode);

    let comp = tinycolor(color).complement().toHexString();

    let splitComp = tinycolor(color).splitcomplement();
    splitComp = splitComp.map(function(t) { return t.toHexString(); });

    let triadic = tinycolor("#f00").triad();
    triadic = triadic.map(function(t) { return t.toHexString(); });

    let tetradic = tinycolor("#f00").tetrad();
    tetradic = tetradic.map(function(t) { return t.toHexString(); });

    let neutralLight = tinycolor.mix(color, '#fafafa', amount = 50).toHexString();
    let neutralDark = tinycolor.mix(color, '#424242', amount = 50).toHexString();

    //change main colors
    $('body').css('background-color', hexcode);
    $('*').css('color', invert);
    $('*').css('border-color', invert);

    //display color name
    if (color.toName()) {
      $('h1').text(color.toName());
    } else {
      //get color name from color api
      $.ajax({
        type: "GET",
        url: 'http://thecolorapi.com/id?hex='+ hexcode.substring(1),
        async:true,
        dataType : 'jsonp',
        crossDomain:true,
        success: function(data, status, xhr) {
          $('h1').text(data.name.value);
        },
        error: function(xhr, textStatus, errorThrown){
          $('h1').text('SAY A COLOR');
        }
      });
    }
    $('h1').css('text-transform', 'capitalize');

    //change result text
    $('.invert-text').text(invert);
    $('.complementary-text').text(comp);
    $('.split-comp-text-one').text(splitComp[1]);
    $('.split-comp-text-two').text(splitComp[2]);
    $('.triadic-text-one').text(triadic[1]);
    $('.triadic-text-two').text(triadic[2]);
    $('.tetradic-text-one').text(tetradic[1]);
    $('.tetradic-text-two').text(tetradic[2]);
    $('.tetradic-text-three').text(tetradic[3]);
    $('.neutral-light-text').text(neutralLight);
    $('.neutral-dark-text').text(neutralDark);

    //change result text color
    $('.invert-text').css('color', invert);
    $('.complementary-text').css('color', comp);
    $('.split-comp-text-one').css('color', splitComp[1]);
    $('.split-comp-text-two').css('color', splitComp[2]);
    $('.triadic-text-one').css('color', triadic[1]);
    $('.triadic-text-two').css('color', triadic[2]);
    $('.tetradic-text-one').css('color', tetradic[1]);
    $('.tetradic-text-two').css('color', tetradic[2]);
    $('.tetradic-text-three').css('color', tetradic[3]);
    $('.neutral-light-text').css('color', neutralLight);
    $('.neutral-dark-text').css('color', neutralDark);
  });


  //background lighten and darken controls
  $('#lighten').click(function() {
    let newColor = tinycolor($('body').css('background-color')).lighten(10).toHexString();
    $('body').css('background-color', newColor);
    $('h1').text(newColor);
    $('h1').css('text-transform', 'uppercase');
  });
  $('#darken').click(function() {
    let newColor = tinycolor($('body').css('background-color')).darken(10).toHexString();
    $('body').css('background-color', newColor);
    $('h1').text(newColor);
    $('h1').css('text-transform', 'uppercase');
  });


  //copy hexcodes to clipboard
  $('.text-control').children().click(function() {
    console.log($(this).text)
    if ($(this).text() != 'COPIED!')
      $selectedHexcode = $(this).text();
      $this = $(this);
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($selectedHexcode).select();
      document.execCommand("copy");
      $temp.remove();
      $(this).text('COPIED!');
      setTimeout(function(){$($this).text($selectedHexcode);}, 1000);
  })

  //select text on click
  $("input[type='text']").click(function () {
    $(this).select();
  });

});
