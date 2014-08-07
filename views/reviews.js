var AmpersandView = require('ampersand-view')
var fs = require('fs')
var bliss = new (require('bliss'))
var $ = require('jquery')

var api = require('../api')

var template = bliss.compile(fs.readFileSync(__dirname +'/../templates/reviews.html','utf8'))

var ReviewsView = AmpersandView.extend({
  initialize: function () {
    this.render = this.render.bind(this)
  },
  render: function () {
    var view = this
    view.el = view.el || document.createElement('div')
    var html = template()
    return $(view.el).html(html)
  }
})

module.exports = ReviewsView
