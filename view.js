var $ = require('jquery')

var viewConstructors = {
  index: require('./views/index'),
  summary: require('./views/summary'),
  violations: require('./views/violations'),
  utilities: require('./views/violations')
}

var viewCache = {
}

var rootElement

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
}

function show(viewName, homeId) {
  console.log('show', viewName)
  var view = getView(viewName)

  view.render(homeId)
  $(rootElement).empty().append(view.el)
}

module.exports.initialize = initialize
module.exports.show = show
