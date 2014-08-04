var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/violations.html','utf8'))

var CodeViolationsView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
  },
  render: function (id) {
    var view = this
    view.el = view.el || document.createElement('div')
    return api.getCodeViolations(id)
      .then(function (violations) {
        var html = template(violations)
        $(view.el).html(html)
      })
  }
})

module.exports = CodeViolationsView
