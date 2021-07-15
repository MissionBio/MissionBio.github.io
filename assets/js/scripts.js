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

function toggleAllFaqs() {
  var btn = $(this);
  var state = btn.data('state');
  if (state == 'expanded') {
    $('#faqs dt').each(function(idx, dt) {
      $(dt).removeClass('active');
    });
    btn.data('state', 'collapsed');
    btn.html('Expand All');
  } else {
    $('#faqs dt').each(function(idx, dt) {
      $(dt).addClass('active');
    });
    btn.data('state', 'expanded');
    btn.html('Collapse All');
  }
}

function collapseElement() {
  var dt = $(this);
  dt.hasClass('active') ? dt.removeClass('active') : dt.addClass('active');
}

//sliding left is really just hiding items so that existing move left
function slideLeft() {
  var parent = $(this).closest('.carousel');
  var items = $.makeArray(parent.find('.item:not(.hidden)'));
  if (items.length == 1) {
    //already at the end
    return;
  }
  var item = $(items.shift());
  item.animate({'margin-left': '-500px', opacity: '0'}, function() {
    item.addClass('hidden').removeClass('active')
    $(items.shift()).addClass('active');
    setIndicator(parent);
  });
}

//sliding right is really just unhiding
function slideRight() {
  var parent = $(this).closest('.carousel');
  var items = $.makeArray(parent.find('.item.hidden'));
  if (items.length == 0) {
    //already at the beginning
    return;
  }
  parent.find('.item.active').removeClass('active');
  var item = $(items.pop());
  item.removeClass('hidden').animate({'margin-left': '0', opacity: '100%'}, function(){ setIndicator(parent);}).addClass('active');
}

function setIndicator(carousel) {
  var indicators = $.makeArray($(`.indicators[data-for='${carousel.attr('id')}'] div`));
  carousel.find('.item').each(function(idx, item){
    var indicator = $(indicators.shift());
    indicator.removeClass('active');
    if ($(item).hasClass('active')) {
      indicator.addClass('active');
    }
  });
}

function configureCarouselIndicators() {
  var root = $('.carousel');

  var items = root.find('.item');
  var qty = items.length;
  var indicators = $(`.indicators[data-for='${root.attr('id')}']`);
  for(var i = 0; i < qty; i++) {
    if (i == 0) {
      indicators.append($('<div class="active"> </div>'));
    } else {
      indicators.append($('<div> </div>'));
    }
  }
  //re-position
  indicators.detach();
  var item = $(items[0]);
  $('body').append($(indicators));console.log(item.offset(), item.height());
  indicators.css({position: 'absolute', top: item.offset().top + item.height()+12, left: item.offset().left});
}

$(function() {
  $('.toggle').on('click', toggleElement);

  $('#expand-all-faqs').on('click', toggleAllFaqs);

  $('.collapsible dt').on('click', collapseElement);

  $('.carousel .buttons .left').on('click', slideRight);

  $('.carousel .buttons .right').on('click', slideLeft);

  configureCarouselIndicators();
});
