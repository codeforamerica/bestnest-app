var $ = require('jquery')

var Router = require('./router')
var view = require('./view')

$(document).ready(function () {

  options = {
    rootElement:'#outer',
    navElement:'nav',
    contentElement: 'content'
  }

  view.initialize(options)

  var router = new Router()

  router.on('route', function (routeName, params) {
    // assume first route parameter is the homeId
    var homeId = params ? params[0] : null
    console.log('r', routeName, arguments)

    view.show(routeName, homeId)
  })

  router.history.start()
})
