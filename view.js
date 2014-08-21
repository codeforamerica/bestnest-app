var $ = require('jquery')

var viewConstructors = {
  index: require('./views/index'),
  navbar: require('./views/navbar'),
  summary: require('./views/summary'),
  utilities: require('./views/violations'),
  violations: require('./views/violations'),
  reviews: require('./views/reviews'),
  questions: require('./views/questions'),
  leaveReview: require('./views/leaveReview'),
  landlord: require('./views/landlord')
}

var viewCache = {
}

function getView (viewName) {
  if (viewCache[viewName]) {
    return viewCache[viewName]
  }

  viewCache[viewName] = new viewConstructors[viewName]()
  return viewCache[viewName]
}

function initialize (opt) {
  opt = opt || {}
  rootElement = $(opt.rootElement)
  navElement = $(opt.navElement)
  contentElement = $(opt.contentElement)
}

function show(viewName, homeId) {
  console.log('show', viewName)
  var navbar = getView('navbar')
  var view = getView(viewName)

  navbar.render(viewName, homeId)
  view.render(homeId)

  $(navElement).empty().append(navbar.el)
  $(contentElement).empty().append(view.el)
}

module.exports.initialize = initialize
module.exports.show = show
