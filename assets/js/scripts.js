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
  if (faqsCollpasedCount() > 1) {
    $('#faqs dt').each(function(idx, dt) {
      $(dt).removeClass('active');
    });
  } else {
    $('#faqs dt').each(function(idx, dt) {
      $(dt).addClass('active');
    });
  }
  setToggleAllFaqsText();
}

function collapseElement() {
  var dt = $(this);
  if (dt.hasClass('active')) {
    dt.removeClass('active');
  } else {
    dt.addClass('active');
  }
  setToggleAllFaqsText();
}

function faqsCollpasedCount() {
  return $('.collapsible dt.active').length;
}

function setToggleAllFaqsText() {
  var btn = $('#expand-all-faqs');
  if (faqsCollpasedCount() > 1) {
    btn.html('Collapse All');
  } else {
    btn.html('Expand All');
  }
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
  item.animate({'margin-left': item.width()*-1, opacity: '0%'}, 'slow', 'linear', function() {
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
  item.removeClass('hidden').animate({'margin-left': '0', opacity: '100%'}, 'slow', 'linear', function(){ setIndicator(parent);}).addClass('active');
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
  var root = $('.carousel:visible');
  if (root.length == 0) {
    return;
  }
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
  $('body').append($(indicators));
  indicators.css({position: 'absolute', top: item.offset().top + item.height()+12, left: item.offset().left});
}

$(function() {
  // GA Events: place this *before* the actions so the labels will not change
  var gaAct = 'click';
  var gaCat = 'CTA';
  var gaLabel = 'undefined';
  // Internal analysis tools
  $('#pipeline-tools a').on('click', function() {
    gaAct = 'click';
    gaCat = $(this).parent().prev().prev().text();
    gaLabel = $(this).text();
    gtag('event', gaAct, {
      'event_category': gaCat,
      'event_label': gaLabel
    });
  });
  // Integrations
  $('#integrations a').on('click', function() {
    gaAct = 'click';
    gaCat = 'Integrations';
    gaLabel = $(this).text();
    gtag('event', gaAct, {
      'event_category': gaCat,
      'event_label': gaLabel
    });
  });
  // FAQ
  $('#faqs #expand-all-faqs').on('click', function() {
    gaAct = 'click';
    gaCat = 'FAQ';
    gaLabel = $(this).text();
  });
  $('#faqs .collapsible dt').on('click', function() {
    if($(this).hasClass('active')) {
      gaAct = 'collapse';
    } else {
      gaAct = 'expand';
    }
    gaCat = 'FAQ';
    gaLabel = $(this).find('>div:first-child').text();
    gtag('event', gaAct, {
      'event_category': gaCat,
      'event_label': gaLabel
    });
  });
  
  $('.toggle').on('click', toggleElement);
  $('#expand-all-faqs').on('click', toggleAllFaqs);
  $('.collapsible dt').on('click', collapseElement);
  $('.carousel .buttons .left').on('click', slideRight);
  $('.carousel .buttons .right').on('click', slideLeft);
  configureCarouselIndicators();
});
