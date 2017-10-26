$(function() {
  //form submit
  $('form').submit(function(e) {
    e.preventDefault();

    let color = tinycolor($('input').val());
    let hexcode = color.toHexString();
    let invert = invertColor(hexcode);

    let splitComp = tinycolor(color).splitcomplement();
    splitComp = splitComp.map(function(t) { return t.toHexString(); });

    let triadic = tinycolor("#f00").triad();
    triadic = triadic.map(function(t) { return t.toHexString(); });

    let tetradic = tinycolor("#f00").tetrad();
    tetradic = tetradic.map(function(t) { return t.toHexString(); });

    //change main colors
    $('body').css('background-color', hexcode);
    $('*').css('color', invert);
    $('*').css('border-color', invert);

    //display color name
    if (color.toName()) {
      $('h1').text(color.toName());
    } else {
      $('h1').text('hmm... ¯\\_(ツ)_/¯');
    }
    $('h1').css('text-transform', 'capitalize');

    //change result text
    $('.invert-text').text(invert);
    $('.split-comp-text-one').text(splitComp[1]);
    $('.split-comp-text-two').text(splitComp[2]);
    $('.triadic-text-one').text(triadic[1]);
    $('.triadic-text-two').text(triadic[2]);
    $('.tetradic-text-one').text(tetradic[1]);
    $('.tetradic-text-two').text(tetradic[2]);
    $('.tetradic-text-three').text(tetradic[3]);

    //change result text color
    $('.invert-text').css('color', invert);
    $('.split-comp-text-one').css('color', splitComp[1]);
    $('.split-comp-text-two').css('color', splitComp[2]);
    $('.triadic-text-one').css('color', triadic[1]);
    $('.triadic-text-two').css('color', triadic[2]);
    $('.tetradic-text-one').css('color', tetradic[1]);
    $('.tetradic-text-two').css('color', tetradic[2]);
    $('.tetradic-text-three').css('color', tetradic[3]);

    //change inner circle colors
    $('.inner-circle').css('border', 'none');
    $('.inner-main').css('border', '2px solid');
    $('.inner-invert').css('background-color', invert);
    $('.inner-split-comp-one').css('background-color', splitComp[1]);
    $('.inner-split-comp-two').css('background-color', splitComp[2]);
    $('.inner-triadic-one').css('background-color', triadic[1]);
    $('.inner-triadic-two').css('background-color', triadic[2]);
    $('.inner-tetradic-one').css('background-color', tetradic[1]);
    $('.inner-tetradic-two').css('background-color', tetradic[2]);
    $('.inner-tetradic-three').css('background-color', tetradic[3]);
  });

});
