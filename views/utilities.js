var AmpersandView = require('ampersand-view')
var fs = require('fs')
var $ = require('jquery')
var bliss = new (require('bliss'))

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/utilities.html','utf8'))

var UtilitiesView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
  },
  render: function(homeId) {
    var view = this
    view.el = view.el || document.createElement('div')

    return api.getEnergyData(homeId)
      .then(function (energy) {
        var html = template(energy)
        $(view.el).html(html)
      })
  }
})

module.exports = UtilitiesView
