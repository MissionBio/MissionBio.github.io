function toggleElement() {
  var btn = $(this);
  if (btn.hasClass('active')) {
    return;
  }
  var prevBtn = btn.parent().find('.active');
  prevBtn.removeClass('active');
  btn.addClass('active');
  var target = btn.data('target');
  var prevTarget = prevBtn.data('target');

  $('#'+prevTarget).addClass('hidden');
  $('#'+target).removeClass('hidden');
}

function collapseElement() {
  var dt = $(this);
  dt.hasClass('active') ? dt.removeClass('active') : dt.addClass('active');
}


$(function() {
  $('.toggle').on('click', toggleElement);

  $('.collapsible dt').on('click', collapseElement);
});
