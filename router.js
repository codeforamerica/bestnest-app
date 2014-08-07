var AmpersandRouter = require('ampersand-router')
var AppRouter = AmpersandRouter.extend({
  routes: {
    "":                       "index",
    "homes/:homeId":          "summary",
    "homes/:homeId/utilites": "utilities",
    "homes/:homeId/violations": "violations",
    "homes/:homeId/reviews": "reviews",
    "landlords/:landlordId": "landlord"
  }
})

module.exports = AppRouter
