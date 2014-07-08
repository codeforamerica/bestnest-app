var $ = require('jquery')

var viewConstructors = {
  index: require('./views/index.js'),
  summary: require('./views/summary.js')
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

function show(viewName) {
  console.log('show', viewName)
  var view = getView(viewName)
  view.render()
  $(root).empty().append(view.el)
}

module.exports.initialize = initialize
module.exports.show = show
