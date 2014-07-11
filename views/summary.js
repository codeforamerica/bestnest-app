var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/summary.html','utf8'))

var SummaryView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
  },
  render: function (homeId) {
    var view = this
    view.el = view.el || document.createElement('div')
    return api.getHome(homeId)
      .then(function (model) {
        var home = model.toJSON()
        var html = template(home)
        $(view.el).html(html)
      })
  }
})

module.exports = SummaryView
