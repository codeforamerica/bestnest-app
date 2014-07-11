$('.back').click(function() {
  window.history.back();
})

$('.glyphicon-search').click(function() {
  window.location = '/select-address.html';
});

$('.saved-search').click(function() {
  window.location = '/summary-view.html'
});

$('button.save.deactivated').click(function() {
  $(this).toggleClass('deactivated');
});

$('.row#utility-costs').click(function() {
  window.location = '/utility-view.html'
});

$('.row#code-violations').click(function() {
  window.location = '/violation-view.html';
});
