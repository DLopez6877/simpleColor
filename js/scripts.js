$(function() {

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
