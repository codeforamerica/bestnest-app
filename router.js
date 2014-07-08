var AmpersandRouter = require('ampersand-router')
var AppRouter = AmpersandRouter.extend({
  routes: {
    "":                       "index",
    "homes/:homeId":          "summary",
    "homes/:homeId/utilites": "utilities",
    "*default": "catch"
  },
  index: function () {
    console.log('index')
  },
  summary: function (homeId) {
    console.log('summary', homeId)
  },
  utilities: function (homeId) {
    console.log('utilities', homeId)
  },
  catch: function() {
    console.log('routed')
  },
  initialize: function () {
    console.log('router init')
  }
})

module.exports = AppRouter
