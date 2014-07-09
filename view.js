var $ = require('jquery')

var viewConstructors = {
  index: require('./views/index'),
  summary: require('./views/summary'),
  violations: require('./views/violations')
}

var viewCache = {
}

var root

function getView (viewName) {
  if (viewCache[viewName]) {
    return viewCache[viewName]
  }

  viewCache[viewName] = new viewConstructors[viewName]()
  return viewCache[viewName]
}

function initialize (opt) {
  opt = opt || {}
  root = $(opt.root)
}

function show(viewName, homeId) {
  console.log('show', viewName)
  var view = getView(viewName)
  if (view.data && view.data.home) {
    view.data.home.id = homeId
  }
  view.render()
  $(root).empty().append(view.el)
}

module.exports.initialize = initialize
module.exports.show = show
